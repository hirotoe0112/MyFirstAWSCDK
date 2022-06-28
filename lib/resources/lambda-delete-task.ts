import { Construct } from 'constructs';
import { aws_lambda_nodejs as lambda } from 'aws-cdk-lib';

/**
 * タスク削除用Lambda関数リソースクラス
 */
export class LambdaForDeleteTask {
  private readonly _scope:Construct;
  private readonly _tableName:string;

  constructor(scope:Construct, tableName:string) {
    this._scope = scope;
    this._tableName = tableName;
  }

  public create():lambda.NodejsFunction{
    return new lambda.NodejsFunction(this._scope, 'lambda-to-delete-task', {
      entry:'lambda/task/delete.ts',
      environment:{
        TABLE_NAME:this._tableName
      }
    })
  }
}