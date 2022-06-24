import * as cdk from 'aws-cdk-lib';
import * as assert from 'aws-cdk-lib/assertions';
import { TodoStack } from '../../lib/todo-stack';
test('authorizer', () => {
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
  const stack = new TodoStack(app, 'test-authorizer');
  const template = assert.Template.fromStack(stack);

  //RestAPIのIDを取得
  const restApi = template.findResources('AWS::ApiGateway::RestApi');
  const restApiList = Object.keys(restApi);
  const restApiId = restApiList[0];

  //UserPoolのIDを取得
  const userPool = template.findResources('AWS::Cognito::UserPool');
  const userPoolList = Object.keys(userPool);
  const userPoolId = userPoolList[0];

  /**
   * Test
   */
  template.hasResourceProperties('AWS::ApiGateway::Authorizer', {
    RestApiId: {
      Ref: restApiId,
    },
    Name: 'api-Authorizer',
    Type: 'COGNITO_USER_POOLS',
    IdentitySource: 'method.request.header.Authorization',
    ProviderARNs: [
      {
        'Fn::GetAtt': [
          userPoolId,
          "Arn"
        ]
      }
    ],
  })
})