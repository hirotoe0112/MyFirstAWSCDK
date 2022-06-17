import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigw from 'aws-cdk-lib/aws-apigateway';

export class ApiGatewayStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    //アカウントとリージョン取得
    const account = Stack.of(this).account;
    const region = Stack.of(this).region;

    //import lambda
    const getFunction = lambda.Function.fromFunctionArn(
      this,
      'function-get-tasks',
      `arn:aws:lambda:${region}:${account}:function:get-tasks`,
    )
    const addFunction = lambda.Function.fromFunctionArn(
      this,
      'function-add-task',
      `arn:aws:lambda:${region}:${account}:function:add-task`,
    );
    const updateFunction = lambda.Function.fromFunctionArn(
      this,
      'UpdateTaskFunction',
      `arn:aws:lambda:${region}:${account}:function:update-task`,
    )
    const deleteFunction = lambda.Function.fromFunctionArn(
      this,
      'DeleteTaskFunction',
      `arn:aws:lambda:${region}:${account}:function:delete-task`,
    )

    /**
     * API Gateway
     */
    const api = new apigw.RestApi(this, 'api-for-todo', {
      restApiName: 'todo-app',
      deployOptions:{
        stageName:"prod",
      },
    });
    const tasks = api.root.addResource('tasks');
    tasks.addMethod('GET', new apigw.LambdaIntegration(getFunction));
    const task = api.root.addResource('task');
    task.addMethod('POST', new apigw.LambdaIntegration(addFunction));
    task.addMethod('PUT', new apigw.LambdaIntegration(updateFunction));
    task.addMethod('DELETE', new apigw.LambdaIntegration(deleteFunction));

    //★Pending★
    //パーミッション
    //なぜかないとApiGatewayが動作しない
    const principal = 'apigateway.amazonaws.com';
    const action = 'lambda:InvokeFunction';
    new lambda.CfnPermission(this, 'get-permission', {
      principal:principal,
      action:action,
      functionName:getFunction.functionName,
      sourceArn:api.arnForExecuteApi(
        'GET',
        '/tasks',
        api.deploymentStage.stageName,
      )
    })
    new lambda.CfnPermission(this, 'add-permission', {
      principal:principal,
      action:action,
      functionName:addFunction.functionName,
      sourceArn:api.arnForExecuteApi(
        'POST',
        '/task',
        api.deploymentStage.stageName,
      )
    })
    new lambda.CfnPermission(this, 'update-permission', {
      principal:principal,
      action:action,
      functionName:updateFunction.functionName,
      sourceArn:api.arnForExecuteApi(
        'PUT',
        '/task',
        api.deploymentStage.stageName,
      )
    })
    new lambda.CfnPermission(this, 'delete-permission', {
      principal:principal,
      action:action,
      functionName:deleteFunction.functionName,
      sourceArn:api.arnForExecuteApi(
        'DELETE',
        '/task',
        api.deploymentStage.stageName,
      )
    })

    //validator
    const requestValidator = new apigw.RequestValidator(this, 'todo-validator', {
      restApi: api,
      requestValidatorName: 'requestValidatorName',
      validateRequestBody: true,
      validateRequestParameters: true
    });
  }
}
