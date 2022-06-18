import { Construct } from 'constructs';
import { aws_lambda_nodejs as lambda } from 'aws-cdk-lib';

export class LambdaForGetTasks {
  private readonly _scope:Construct;
  private readonly _tableName:string;

  constructor(scope:Construct, tableName:string) {
    this._scope = scope;
    this._tableName = tableName;
  }

  public create():lambda.NodejsFunction{
    return new lambda.NodejsFunction(this._scope, 'lambda-get', {
      entry:'lambda/get.ts',
      functionName: 'get-tasks',
      environment:{
        TABLE_NAME:this._tableName
      }
    })
  }
}