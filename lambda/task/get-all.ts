import * as AWS from 'aws-sdk';
import { Buffer } from 'buffer';

const db = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME=process.env.TABLE_NAME || "";

export const handler = async (event: any,): Promise<any> => {
  const token = event.headers['Authorization'];
  const sections = token.split('.');
  const payload = JSON.parse(Buffer.from(sections[1], 'base64').toString());
  const userId = payload['cognito:username'];

  const params = {
    TableName:TABLE_NAME,
    KeyConditionExpression: 'userId = :userId',
    ExpressionAttributeValues:{
      ':userId':userId
    }
  }

  try{
    const data = await db.query(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };
  }catch(e){
    return {
      statusCode: 500,
      body: JSON.stringify(e)
    };
  }
}