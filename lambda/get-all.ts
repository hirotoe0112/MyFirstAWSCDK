import * as AWS from 'aws-sdk';

const db = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME=process.env.TABLE_NAME || "";

export const handler = async (event: any): Promise<any> => {
  const requestBody = event.pathParameters;
  const userId = requestBody.userId;
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