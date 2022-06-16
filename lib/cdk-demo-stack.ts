import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as sns from 'aws-cdk-lib/aws-sns';
import * as sub from 'aws-cdk-lib/aws-sns-subscriptions';
import * as apigw from 'aws-cdk-lib/aws-apigateway';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class CdkDemoStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    /**
     * SNS
     */
    const topic = new sns.Topic(this, 'topic-email', {
      topicName: 'test-email-topic',
    });
    //topic.addSubscription(new sub.EmailSubscription('your email address'));

    /**
     * API Gateway
     */
    const api = new apigw.RestApi(this, 'api-for-sns');
    const tasks = api.root.addResource('tasks');
    tasks.addMethod('GET');
    const task = api.root.addResource('task');
    task.addMethod('POST');
    task.addMethod('PUT');
    task.addMethod('DELETE');

    //validator
    const requestValidator = new apigw.RequestValidator(this, 'api-validator', {
      restApi: api,
      requestValidatorName: 'requestValidatorName',
      validateRequestBody: true,
      validateRequestParameters: true
    });
    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'CdkDemoQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
  }
}
