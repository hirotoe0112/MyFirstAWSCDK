import * as cdk from 'aws-cdk-lib';
import * as assert from 'aws-cdk-lib/assertions';
import { TodoStack } from '../../lib/todo-stack';
test('lambda', () => {
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
  const stack = new TodoStack(app, 'test-lambda');
  const template = assert.Template.fromStack(stack);

  //DynamoDBのIDを取得
  const table = template.findResources('AWS::DynamoDB::Table');
  const tableList = Object.keys(table);
  const tableId = tableList[0];

  /**
   * Test
   */
  template.hasResourceProperties('AWS::Lambda::Function', {
    Environment: {
      Variables: {
        TABLE_NAME: {
          Ref: tableId
        },
      }
    },
    Handler: 'index.handler',
  });
})