#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { CdkDemoStack } from '../lib/cdk-demo-stack';
import { DynamoDbStack } from '../lib/dynamodb-stack';
import { LambdaForGetTasksStack } from '../lib/lambda-get-tasks-stack';
import { LambdaForAddTaskStack } from '../lib/lambda-add-task-stack';
import { LambdaForUpdateTaskStack } from '../lib/lambda-update-task-stack';
import { LambdaForDeleteTaskStack } from '../lib/lambda-delete-task-stack';
import { ApiGatewayStack } from '../lib/apigateway-stack';

const app = new cdk.App();
//new CdkDemoStack(app, 'CdkDemoStack', {
  /* If you don't specify 'env', this stack will be environment-agnostic.
   * Account/Region-dependent features and context lookups will not work,
   * but a single synthesized template can be deployed anywhere. */

  /* Uncomment the next line to specialize this stack for the AWS Account
   * and Region that are implied by the current CLI configuration. */
  // env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },

  /* Uncomment the next line if you know exactly what Account and Region you
   * want to deploy the stack to. */
  // env: { account: '123456789012', region: 'us-east-1' },

  /* For more information, see https://docs.aws.amazon.com/cdk/latest/guide/environments.html */
//});
new DynamoDbStack(app, 'todo-dynamodb');
new LambdaForGetTasksStack(app, 'todo-lambda-for-get-tasks');
new LambdaForAddTaskStack(app, 'todo-lambda-for-add-task');
new LambdaForUpdateTaskStack(app, 'todo-lambda-for-update-task');
new LambdaForDeleteTaskStack(app, 'todo-lambda-for-delete-task');
new ApiGatewayStack(app, 'todo-apigateway');