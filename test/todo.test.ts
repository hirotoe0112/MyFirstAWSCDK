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

    expect(template.toJSON()).toMatchSnapshot();
})
test('fine grained assertions', () => {
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
    template.resourceCountIs('AWS::Lambda::Function', 5);
    template.resourceCountIs('AWS::DynamoDB::Table', 1);

//   const app = new cdk.App();
//     // WHEN
//   const stack = new CdkDemo.CdkDemoStack(app, 'MyTestStack');
//     // THEN
//   const template = Template.fromStack(stack);

//   template.hasResourceProperties('AWS::SQS::Queue', {
//     VisibilityTimeout: 300
//   });
});
