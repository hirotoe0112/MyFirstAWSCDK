import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigw from 'aws-cdk-lib/aws-apigateway';

export class ApiGateway {
  private readonly _scope:Construct;
  private readonly _getFunction: lambda.Function;
  private readonly _addFunction: lambda.Function;
  private readonly _updateFunction: lambda.Function;
  private readonly _deleteFunction: lambda.Function;

  constructor(scope:Construct, getFunction: lambda.Function, addFunction: lambda.Function, updateFunction: lambda.Function, deleteFunction: lambda.Function) {
    this._scope = scope;
    this._getFunction = getFunction;
    this._addFunction = addFunction;
    this._updateFunction = updateFunction;
    this._deleteFunction = deleteFunction;
  }

  public create():apigw.RestApi{
    const api = new apigw.RestApi(this._scope, 'api-for-todo', {
      restApiName: 'todo-app',
      deployOptions:{
        stageName:"prod",
      },
    });
    const tasks = api.root.addResource('tasks');
    tasks.addMethod('GET', new apigw.LambdaIntegration(this._getFunction));
    const task = api.root.addResource('task');
    task.addMethod('POST', new apigw.LambdaIntegration(this._addFunction));
    task.addMethod('PUT', new apigw.LambdaIntegration(this._updateFunction));
    task.addMethod('DELETE', new apigw.LambdaIntegration(this._deleteFunction));

    return api;
  }
}
