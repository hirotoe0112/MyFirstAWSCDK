import { RemovalPolicy, Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as dynamoDb from 'aws-cdk-lib/aws-dynamodb';
import { AttributeType } from 'aws-cdk-lib/aws-dynamodb';

export class DynamoDbStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    new dynamoDb.Table(this, 'todo', {
      tableName:"todo",
      partitionKey:{
        name:'userId',
        type:AttributeType.STRING,
      },
      sortKey:{
        name:'uuid',
        type:AttributeType.STRING,
      },
      removalPolicy:RemovalPolicy.DESTROY,
      billingMode:dynamoDb.BillingMode.PAY_PER_REQUEST,
    })

    /*
    const secondaryIndex: dynamoDb.SecondaryIndexProps = {
      nonKeyAttributes:['deadline'],
      projectionType:dynamoDb.ProjectionType.ALL,
    }
    */
  }
}
