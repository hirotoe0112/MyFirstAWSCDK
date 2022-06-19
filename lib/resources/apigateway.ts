import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigw from 'aws-cdk-lib/aws-apigateway';

export class ApiGateway {
  private readonly _scope:Construct;
  private readonly _target:string;
  private readonly _getAllFunction: lambda.Function;
  private readonly _getSingleFunction: lambda.Function;
  private readonly _addFunction: lambda.Function;
  private readonly _updateFunction: lambda.Function;
  private readonly _deleteFunction: lambda.Function;

  constructor(scope:Construct, target:string, getAllFunction: lambda.Function, getSingleFunction: lambda.Function, addFunction: lambda.Function, updateFunction: lambda.Function, deleteFunction: lambda.Function) {
    this._scope = scope;
    this._target = target;
    this._getAllFunction = getAllFunction;
    this._getSingleFunction = getSingleFunction;
    this._addFunction = addFunction;
    this._updateFunction = updateFunction;
    this._deleteFunction = deleteFunction;
  }

  public create():apigw.RestApi{
    const api = new apigw.RestApi(this._scope, 'api-for-todo', {
      deployOptions:{
        stageName:this._target,
      },
    });
    const tasksRoot = api.root.addResource('tasks');
    const tasksUser = tasksRoot.addResource('{userId}');
    tasksUser.addMethod('GET', new apigw.LambdaIntegration(this._getAllFunction));
    const taskSingle = tasksUser.addResource('{taskId}');
    taskSingle.addMethod('GET', new apigw.LambdaIntegration(this._getSingleFunction));
    const task = api.root.addResource('task');
    task.addMethod('POST', new apigw.LambdaIntegration(this._addFunction));
    task.addMethod('PUT', new apigw.LambdaIntegration(this._updateFunction));
    task.addMethod('DELETE', new apigw.LambdaIntegration(this._deleteFunction));

    return api;
  }
}
