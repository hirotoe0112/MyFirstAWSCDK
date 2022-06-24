import * as cdk from 'aws-cdk-lib';
import * as assert from 'aws-cdk-lib/assertions';
import { TodoStack } from '../../lib/todo-stack';
test('dynamodb', () => {
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
  const stack = new TodoStack(app, 'test-dynamodb');
  const template = assert.Template.fromStack(stack);

  /**
   * Test
   */
  template.hasResourceProperties('AWS::DynamoDB::Table', {
    KeySchema: [
      {
        AttributeName: 'userId',
        KeyType: 'HASH'
      },
      {
        AttributeName: 'taskId',
        KeyType: 'RANGE'
      }
    ],
    AttributeDefinitions: [
      {
        AttributeName: 'userId',
        AttributeType: 'S'
      },
      {
        AttributeName: 'taskId',
        AttributeType: 'S'
      }
    ],
    BillingMode: 'PAY_PER_REQUEST'
  });
  template.hasResource('AWS::DynamoDB::Table', {
    UpdateReplacePolicy: 'Delete',
    DeletionPolicy: 'Delete',
  });
})