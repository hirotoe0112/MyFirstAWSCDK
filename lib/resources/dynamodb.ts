import { RemovalPolicy } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as dynamoDb from 'aws-cdk-lib/aws-dynamodb';
import { AttributeType } from 'aws-cdk-lib/aws-dynamodb';

export class DynamoDb {
  private readonly _scope:Construct;

  constructor(scope:Construct) {
    this._scope = scope;
  };

  public create():dynamoDb.Table{
    return new dynamoDb.Table(this._scope, 'dynamoDb', {
      partitionKey:{
        name:'userId',
        type:AttributeType.STRING,
      },
      sortKey:{
        name:'taskId',
        type:AttributeType.STRING,
      },
      removalPolicy:RemovalPolicy.DESTROY,
      billingMode:dynamoDb.BillingMode.PAY_PER_REQUEST,
    })
  }
}
