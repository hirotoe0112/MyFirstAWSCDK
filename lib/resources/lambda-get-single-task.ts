import { Construct } from 'constructs';
import { aws_lambda_nodejs as lambda } from 'aws-cdk-lib';

/**
 * タスク1件取得用Lambda関数リソースクラス
 */
export class LambdaForGetSingleTask {
  private readonly _scope:Construct;
  private readonly _tableName:string;

  constructor(scope:Construct, tableName:string) {
    this._scope = scope;
    this._tableName = tableName;
  }

  public create():lambda.NodejsFunction{
    return new lambda.NodejsFunction(this._scope, 'lambda-to-get-single-task', {
      entry:'lambda/task/get-single.ts',
      environment:{
        TABLE_NAME:this._tableName
      }
    })
  }
}