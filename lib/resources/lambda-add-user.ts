import { Construct } from 'constructs';
import { aws_lambda_nodejs as lambda } from 'aws-cdk-lib';

export class LambdaForAddUser {
  private readonly _scope:Construct;
  private readonly _appClientId:string;

  constructor(scope:Construct, appClientId:string) {
    this._scope = scope;
    this._appClientId = appClientId;
  }

  public create():lambda.NodejsFunction{
    return new lambda.NodejsFunction(this._scope, 'lambda-to-add-user', {
      entry:'lambda/user/add.ts',
      environment:{
        CLIENT_ID:this._appClientId,
      }
    })
  }
}
