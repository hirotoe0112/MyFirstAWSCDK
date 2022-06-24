import { Construct } from 'constructs';
import * as apigw from 'aws-cdk-lib/aws-apigateway';

export class Authorizer {
  private readonly _scope:Construct;
  private readonly _restApiId:string;
  private readonly _userPoolArn:string;

  constructor(scope:Construct, restApiId:string, userPoolArn:string) {
    this._scope = scope;
    this._restApiId = restApiId;
    this._userPoolArn = userPoolArn;
  }

  public create():apigw.CfnAuthorizer{
    return new apigw.CfnAuthorizer(this._scope, 'cfnAuthorizer', {
      restApiId: this._restApiId,
      name: 'api-Authorizer',
      type: 'COGNITO_USER_POOLS',
      identitySource: 'method.request.header.Authorization',
      providerArns: [
        this._userPoolArn,
      ]
    });

  }
}
