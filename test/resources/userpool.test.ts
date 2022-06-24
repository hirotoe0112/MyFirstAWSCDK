import * as cdk from 'aws-cdk-lib';
import * as assert from 'aws-cdk-lib/assertions';
import { TodoStack } from '../../lib/todo-stack';
test('userpool', () => {
  /**
   * Set up
   */
  const app = new cdk.App(
    {
      context: {
        'variables': {
          'target': 'dev'
        }
      }
    }
  )
  const stack = new TodoStack(app, 'test-userpool');
  const template = assert.Template.fromStack(stack);

  /**
   * Test
   */
  template.hasResourceProperties('AWS::Cognito::UserPool', {
    AdminCreateUserConfig: {
      AllowAdminCreateUserOnly: false
    },
    AutoVerifiedAttributes: [
      'email'
    ],
    Schema: [
      {
        Mutable: true,
        Name: 'email',
        Required: true
      }
    ],
  });
  template.hasResourceProperties('AWS::Cognito::UserPoolDomain', {
    Domain: 'todo-api',
  });
  template.hasResourceProperties('AWS::Cognito::UserPoolClient', {
    ExplicitAuthFlows: [
     'ALLOW_USER_PASSWORD_AUTH',
     'ALLOW_ADMIN_USER_PASSWORD_AUTH',
     'ALLOW_REFRESH_TOKEN_AUTH'
    ],
  })
})