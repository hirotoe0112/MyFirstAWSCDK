import { Construct } from 'constructs';
import { Stack, StackProps, aws_lambda_nodejs as lambda } from 'aws-cdk-lib';

export class LambdaForUpdateTaskStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    new lambda.NodejsFunction(this, 'todo', {
      entry:'lambda/update.ts',
      functionName: 'update-task'
    })
  }
}
