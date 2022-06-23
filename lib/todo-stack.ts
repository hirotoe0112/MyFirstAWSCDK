import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { UserPool } from './resources/userpool';
import { DynamoDb } from './resources/dynamodb';
import { LambdaForAddUser } from './resources/lambda-add-user';
import { LambdaForAuth } from './resources/lambda-auth';
import { LambdaForGetAllTasks } from './resources/lambda-get-all-tasks';
import { LambdaForGetSingleTask } from './resources/lambda-get-single-task';
import { LambdaForAddTask } from './resources/lambda-add-task';
import { LambdaForUpdateTask } from './resources/lambda-update-task';
import { LambdaForDeleteTask } from './resources/lambda-delete-task';
import { ApiGateway } from './resources/apigateway';
import { Authorizer } from './resources/authorizer';
import * as apigw from 'aws-cdk-lib/aws-apigateway';
import { JsonSchemaType, AuthorizationType } from 'aws-cdk-lib/aws-apigateway';

export class TodoStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    /**
     * Get environment variable from cdk.json
     */
    const env = scope.node.tryGetContext('variables');

    /**
     * Create DynamoDb Resource
     */
    const dynamoDb = new DynamoDb(this);
    const table = dynamoDb.create();

    /**
     * Create Lambda Resources(task)
     */
    const lambdaForGetAllTasks = new LambdaForGetAllTasks(this, table.tableName);
    const getAllFunction = lambdaForGetAllTasks.create();
    const lambdaForGetSingleTask = new LambdaForGetSingleTask(this, table.tableName);
    const getSingleFunction = lambdaForGetSingleTask.create();
    const lambdaForAddTask = new LambdaForAddTask(this, table.tableName);
    const addFunction = lambdaForAddTask.create();
    const lambdaForUpdateTask = new LambdaForUpdateTask(this, table.tableName);
    const updateFunction = lambdaForUpdateTask.create();
    const lambdaForDeleteTask = new LambdaForDeleteTask(this, table.tableName);
    const deleteFunction = lambdaForDeleteTask.create();

    /**
     * Grant Lambda Permissions
     */
    table.grantReadData(getAllFunction);
    table.grantReadData(getSingleFunction);
    table.grantWriteData(addFunction);
    table.grantWriteData(updateFunction);
    table.grantWriteData(deleteFunction);

    /**
     * Create API Gateway Resource
     */
    const apiGateway = new ApiGateway(this, env.target);
    const api = apiGateway.create();

    /**
     * Create Cognito Resource
     */
    const userPool = new UserPool(this);
    const [pool, client] = userPool.create();

    /**
     * Create Authorizer
     */
    const authorizer = new Authorizer(this, api.restApiId, pool.userPoolArn);
    const auth = authorizer.create();

    /**
     * Setting API Gateway(task)
     */
    const tasksRoot = api.root.addResource('tasks');
    const tasksUser = tasksRoot.addResource('{userId}');
    //Get Tasks
    tasksUser.addMethod('GET', new apigw.LambdaIntegration(getAllFunction), {
      authorizationType: AuthorizationType.COGNITO,
      authorizer:{
        authorizerId: auth.ref,
      }
    });
    //Add Task
    const postTaskModel = new apigw.Model(this, 'post-validator-task', {
      restApi: api,
      contentType: 'application/json',
      description: 'To validate the request body',
      schema:{
        type:JsonSchemaType.OBJECT,
        required:[
          'title',
          'content'
        ]
      }
    })
    tasksUser.addMethod('POST', new apigw.LambdaIntegration(addFunction), {
      requestValidator: new apigw.RequestValidator(this, 'body-validator-task', {
        restApi:api,
        validateRequestBody:true,
      }),
      requestModels:{
        'application/json': postTaskModel,
      },
      authorizationType: AuthorizationType.COGNITO,
      authorizer:{
        authorizerId: auth.ref,
      }
    });
    const taskSingle = tasksUser.addResource('{taskId}');
    //Get Task
    taskSingle.addMethod('GET', new apigw.LambdaIntegration(getSingleFunction), {
      authorizationType: AuthorizationType.COGNITO,
      authorizer:{
        authorizerId: auth.ref,
      }
    });
    //Update Task
    taskSingle.addMethod('PATCH', new apigw.LambdaIntegration(updateFunction), {
      authorizationType: AuthorizationType.COGNITO,
      authorizer:{
        authorizerId: auth.ref,
      }
    });
    //Delete Task
    taskSingle.addMethod('DELETE', new apigw.LambdaIntegration(deleteFunction), {
      authorizationType: AuthorizationType.COGNITO,
      authorizer:{
        authorizerId: auth.ref,
      }
    });

    /**
     * Create Lambda Resources(user)
     */
    const lambdaForAddUser = new LambdaForAddUser(this, client.userPoolClientId);
    const addUserFunction = lambdaForAddUser.create();
    const lambdaForAuth = new LambdaForAuth(this, client.userPoolClientId);
    const authFunction = lambdaForAuth.create();

    /**
     * Setting API Gateway(user)
     */
    //Add User
    const usersRoot = api.root.addResource('users');
    const postUserModel = new apigw.Model(this, 'post-validator-user', {
      restApi: api,
      contentType: 'application/json',
      description: 'To validate the request body',
      schema:{
        type:JsonSchemaType.OBJECT,
        required:[
          'username',
          'password',
          'email',
        ]
      }
    })
    usersRoot.addMethod('POST', new apigw.LambdaIntegration(addUserFunction), {
      requestValidator: new apigw.RequestValidator(this, 'body-validator-user', {
        restApi:api,
        validateRequestBody:true,
      }),
      requestModels:{
        'application/json': postUserModel,
      }
    });
    //Auth User
    const authRoot = api.root.addResource('auth');
    const postAuthModel = new apigw.Model(this, 'post-validator-auth', {
      restApi: api,
      contentType: 'application/json',
      description: 'To validate the request body',
      schema:{
        type:JsonSchemaType.OBJECT,
        required:[
          'username',
          'password',
        ]
      }
    })
    authRoot.addMethod('POST', new apigw.LambdaIntegration(authFunction), {
      requestValidator: new apigw.RequestValidator(this, 'body-validator-auth', {
        restApi:api,
        validateRequestBody:true,
      }),
      requestModels:{
        'application/json': postAuthModel,
      }
    });
  }
}
