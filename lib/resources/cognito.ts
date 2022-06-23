import { Construct } from 'constructs';
import * as cognito from 'aws-cdk-lib/aws-cognito';
import { RemovalPolicy } from 'aws-cdk-lib';

export class Cognito {
  private readonly _scope:Construct;

  constructor(scope:Construct) {
    this._scope = scope;
  }

  public create():cognito.UserPool{
    const userpool = new cognito.UserPool(this._scope, 'user-pool-for-todo', {
      selfSignUpEnabled: true,
      standardAttributes: {
        email: {required: true, mutable: true}
      },
      removalPolicy: RemovalPolicy.DESTROY,
    });

    userpool.addDomain('domain', {
      cognitoDomain: {
        domainPrefix: 'todo-api',
      }
    })

    userpool.addClient('client', {
      authFlows:{
        adminUserPassword:true,
        userPassword:true,
      }
    });

    return userpool;
  }
}
