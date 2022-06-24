import { Construct } from 'constructs';
import * as apigw from 'aws-cdk-lib/aws-apigateway';

export class ApiGateway {
  private readonly _scope:Construct;
  private readonly _target:string;

  constructor(scope:Construct, target:string) {
    this._scope = scope;
    this._target = target;
  }

  public create():apigw.RestApi{
    return new apigw.RestApi(this._scope, 'apigateway', {
      deployOptions:{
        stageName:this._target,
      },
    });
  }
}
