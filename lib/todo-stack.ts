import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { DynamoDb } from './resources/dynamodb';
import { LambdaForGetTasks } from './resources/lambda-get-tasks';
import { LambdaForAddTask } from './resources/lambda-add-task';
import { LambdaForUpdateTask } from './resources/lambda-update-task';
import { LambdaForDeleteTask } from './resources/lambda-delete-task';
import { ApiGateway } from './resources/apigateway';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class TodoStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    /**
     * Create DynamoDb Resource
     */
    const dynamoDb = new DynamoDb(this);
    const table = dynamoDb.create();

    /**
     * Create Lambda Resources
     */
    const lambdaForGetTasks = new LambdaForGetTasks(this, table.tableName);
    const getFunction = lambdaForGetTasks.create();
    const lambdaForAddTask = new LambdaForAddTask(this, table.tableName);
    const addFunction = lambdaForAddTask.create();
    const lambdaForUpdateTask = new LambdaForUpdateTask(this, table.tableName);
    const updateFunction = lambdaForUpdateTask.create();
    const lambdaForDeleteTask = new LambdaForDeleteTask(this, table.tableName);
    const deleteFunction = lambdaForDeleteTask.create();

    /**
     * Grant Lambda Permissions
     */
    table.grantReadData(getFunction);
    table.grantWriteData(addFunction);
    table.grantWriteData(updateFunction);
    table.grantWriteData(deleteFunction);

    /**
     * Create API Gateway Resource
     */
    const apiGateway = new ApiGateway(this, getFunction, addFunction, updateFunction, deleteFunction);
    apiGateway.create();

  }
}
