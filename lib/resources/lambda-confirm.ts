import { Construct } from 'constructs';
import { aws_lambda_nodejs as lambda } from 'aws-cdk-lib';

/**
 * ユーザ確認用Lambda関数リソースクラス
 */
export class LambdaForConfirm {
  private readonly _scope:Construct;
  private readonly _appClientId:string;

  constructor(scope:Construct, appClientId:string) {
    this._scope = scope;
    this._appClientId = appClientId;
  }

  public create():lambda.NodejsFunction{
    return new lambda.NodejsFunction(this._scope, 'lambda-to-confirm', {
      entry:'lambda/user/confirm.ts',
      environment:{
        CLIENT_ID:this._appClientId,
      }
    })
  }
}
