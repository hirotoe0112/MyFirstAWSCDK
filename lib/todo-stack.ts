import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { DynamoDb } from './resources/dynamodb';
import { LambdaForGetAllTasks } from './resources/lambda-get-all-tasks';
import { LambdaForGetSingleTask } from './resources/lambda-get-single-task';
import { LambdaForAddTask } from './resources/lambda-add-task';
import { LambdaForUpdateTask } from './resources/lambda-update-task';
import { LambdaForDeleteTask } from './resources/lambda-delete-task';
import { ApiGateway } from './resources/apigateway';

export class TodoStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    /**
     * Get environment variable from CDK.json
     */
    const env = scope.node.tryGetContext('variables');

    /**
     * Create DynamoDb Resource
     */
    const dynamoDb = new DynamoDb(this);
    const table = dynamoDb.create();

    /**
     * Create Lambda Resources
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
    const apiGateway = new ApiGateway(this, env.target, getAllFunction, getSingleFunction, addFunction, updateFunction, deleteFunction);
    apiGateway.create();

  }
}