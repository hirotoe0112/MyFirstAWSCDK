import * as cdk from 'aws-cdk-lib';
import * as assert from 'aws-cdk-lib/assertions';
import { Template } from 'aws-cdk-lib/assertions';
import { TodoStack } from '../lib/todo-stack';
// import * as cdk from 'aws-cdk-lib';
// import { Template } from 'aws-cdk-lib/assertions';
// import * as CdkDemo from '../lib/cdk-demo-stack';

// example test. To run these tests, uncomment this file along with the
// example resource in lib/cdk-demo-stack.ts
test('Snapshot test', () => {
    /**
     * Set up
     */
    const app = new cdk.App(
        {
            context:{
                "variables":{
                    "target":"dev"
                }
            }
        }
    )
    const todoStack = new TodoStack(app, 'test-todo');
    const template = Template.fromStack(todoStack);

    /**
     * Test
     */
    //expect(template.toJSON()).toMatchSnapshot();
})

test('Fine-grained assertions', () => {
    /**
     * Set up
     */
    const app = new cdk.App(
        {
            context:{
                "variables":{
                    "target":"dev"
                }
            }
        }
    )
    const todoStack = new TodoStack(app, 'test-todo');
    const template = Template.fromStack(todoStack);

    /**
     * Test
     */
    template.resourceCountIs('AWS::Lambda::Function', 8);
    template.resourceCountIs('AWS::DynamoDB::Table', 1);

    template.hasResource('AWS::ApiGateway::RestApi', {});
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

//   const app = new cdk.App();
//     // WHEN
//   const stack = new CdkDemo.CdkDemoStack(app, 'MyTestStack');
//     // THEN
//   const template = Template.fromStack(stack);

//   template.hasResourceProperties('AWS::SQS::Queue', {
//     VisibilityTimeout: 300
//   });
});
