import { Construct } from 'constructs';
import * as cognito from 'aws-cdk-lib/aws-cognito';
import { RemovalPolicy } from 'aws-cdk-lib';

/**
 * Cognito UserPoolリソースクラス
 */
export class UserPool {
  private readonly _scope:Construct;

  constructor(scope:Construct) {
    this._scope = scope;
  }

  public create():[cognito.UserPool, cognito.UserPoolClient]{
    const userpool = new cognito.UserPool(this._scope, 'user-pool', {
      selfSignUpEnabled: true,
      autoVerify: {
        email: true,
      },
      standardAttributes: {
        email: {
          required: true,
          mutable: true,
        },
      },
      removalPolicy: RemovalPolicy.DESTROY,
    });

    userpool.addDomain('domain', {
      cognitoDomain: {
        domainPrefix: 'todo-api',
      }
    })

    const client = userpool.addClient('user-pool-client', {
      authFlows:{
        adminUserPassword:true,
        userPassword:true,
      }
    });

    return [userpool, client];
  }
}
