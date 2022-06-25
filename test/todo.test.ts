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
  template.hasResourceProperties('AWS::ApiGateway::RequestValidator', {});
});
