import * as AWS from 'aws-sdk';

const db = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME=process.env.TABLE_NAME || "";

export const handler = async (event: any): Promise<any> => {
  const requestBody = event;

  return { 
    statusCode: 200,
    headers: {
      'Content-Type':'application/json'
    },
    body: JSON.stringify(requestBody)
  };
}