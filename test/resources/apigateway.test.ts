import * as cdk from 'aws-cdk-lib';
import * as assert from 'aws-cdk-lib/assertions';
import { TodoStack } from '../../lib/todo-stack';
test('apigateway dev', () => {
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
  const stack = new TodoStack(app, 'test-apigateway-dev');
  const template = assert.Template.fromStack(stack);

  /**
   * Test
   */
  template.resourceCountIs('AWS::ApiGateway::Stage', 1);
  template.hasResourceProperties('AWS::ApiGateway::Stage', {
    StageName: 'dev',
  })
})

test('apigateway prod', () => {
  /**
   * Set up
   */
  const app = new cdk.App(
    {
      context: {
        'variables': {
          'target': 'prod'
        }
      }
    }
  )
  const stack = new TodoStack(app, 'test-apigateway-prod');
  const template = assert.Template.fromStack(stack);

  /**
   * Test
   */
  template.resourceCountIs('AWS::ApiGateway::Stage', 1);
  template.hasResourceProperties('AWS::ApiGateway::Stage', {
    StageName: 'prod',
  })
})