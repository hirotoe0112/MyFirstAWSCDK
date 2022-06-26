import * as cdk from 'aws-cdk-lib';
import * as assert from 'aws-cdk-lib/assertions';
import { Template } from 'aws-cdk-lib/assertions';
import { TodoStack } from '../lib/todo-stack';
// import * as cdk from 'aws-cdk-lib';
// import { Template } from 'aws-cdk-lib/assertions';
// import * as CdkDemo from '../lib/cdk-demo-stack';

// example test. To run these tests, uncomment this file along with the
// example resource in lib/cdk-demo-stack.ts
test('Resources counts', () => {
  /**
   * Set up
   */
  const app = new cdk.App(
    {
      context: {
        "variables": {
          "target": "dev"
        }
      }
    }
  )
  const todoStack = new TodoStack(app, 'test-todo');
  const template = Template.fromStack(todoStack);

  /**
   * Test
   */
  template.resourceCountIs('AWS::DynamoDB::Table', 1);
  template.resourceCountIs('AWS::Lambda::Function', 8);
  template.resourceCountIs('AWS::ApiGateway::RestApi', 1);
  template.resourceCountIs('AWS::Cognito::UserPool', 1);
  template.resourceCountIs('AWS::Cognito::UserPoolClient', 1);
  template.resourceCountIs('AWS::ApiGateway::Authorizer', 1);
  template.resourceCountIs('AWS::ApiGateway::Model', 4);
  template.resourceCountIs('AWS::ApiGateway::RequestValidator', 4);
})

test('apigateway settings', () => {
  /**
   * Set up
   */
  const app = new cdk.App(
    {
      context: {
        "variables": {
          "target": "dev"
        }
      }
    }
  )
  const todoStack = new TodoStack(app, 'test-todo');
  const template = Template.fromStack(todoStack);

  /**
   * Test
   */
  template.hasResourceProperties('AWS::ApiGateway::Resource', {
    PathPart: 'tasks',
  });
  template.hasResourceProperties('AWS::ApiGateway::Resource', {
    PathPart: '{taskId}',
  });
  template.hasResourceProperties('AWS::ApiGateway::Resource', {
    PathPart: 'users',
  });
  template.hasResourceProperties('AWS::ApiGateway::Resource', {
    PathPart: 'auth',
  });
  template.hasResourceProperties('AWS::ApiGateway::Resource', {
    PathPart: 'confirm',
  });

  //RestAPIのIDを取得
  const restApi = template.findResources('AWS::ApiGateway::RestApi');
  const restApiList = Object.keys(restApi);
  const restApiId = restApiList[0];

  template.hasResourceProperties('AWS::ApiGateway::RequestValidator', {
    RestApiId: {
      Ref: restApiId
    },
    ValidateRequestBody: true
  });

  //titleとcontentが必須であるモデルの存在
  template.hasResourceProperties('AWS::ApiGateway::Model', {
    ContentType: 'application/json',
    Schema: {
      type: 'object',
      required: [
        'title',
        'content',
      ],
    }
  });
  //usernameとpasswordとemailが必須であるモデルの存在
  template.hasResourceProperties('AWS::ApiGateway::Model', {
    ContentType: 'application/json',
    Schema: {
      type: 'object',
      required: [
        'username',
        'password',
        'email',
      ],
    }
  });
  //usernameとpasswordが必須であるモデルの存在
  template.hasResourceProperties('AWS::ApiGateway::Model', {
    ContentType: 'application/json',
    Schema: {
      type: 'object',
      required: [
        'username',
        'password',
      ],
    }
  });
  //usernameとcodeが必須であるモデルの存在
  template.hasResourceProperties('AWS::ApiGateway::Model', {
    ContentType: 'application/json',
    Schema: {
      type: 'object',
      required: [
        'username',
        'code',
      ],
    }
  });
});

test('lambda settings', () => {
  /**
   * Set up
   */
  const app = new cdk.App(
    {
      context: {
        "variables": {
          "target": "dev"
        }
      }
    }
  )
  const todoStack = new TodoStack(app, 'test-todo');
  const template = Template.fromStack(todoStack);

  /**
   * Test
   */
  //Lambda Function一覧を取得
  const functions = template.findResources('AWS::Lambda::Function');

  //全てのLambda FunctionがAPI Gatewayに紐づいているか
  Object.keys(functions).forEach((key) => {
    template.hasResourceProperties('AWS::ApiGateway::Method', {
      Integration: {
        Uri: {
          'Fn::Join': [
            '',
            [
              'arn:',
              {
                Ref: 'AWS::Partition'
              },
              ':apigateway:',
              {
                Ref: 'AWS::Region'
              },
              ':lambda:path/2015-03-31/functions/',
              {
                'Fn::GetAtt': [
                  key,
                  'Arn'
                ]
              },
              '/invocations'
            ]
          ]
        }
      }
    })
  })
});