import * as AWS from 'aws-sdk';
import {v4 as uuidv4} from 'uuid';

const db = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME=process.env.TABLE_NAME || "";

export const handler = async (event: any,): Promise<any> => {
  const requestBody = JSON.parse(event.body);
  const date = Date.now();
  const params = {
    TableName:TABLE_NAME,
    Item:{
      userId:requestBody.userId,
      taskId:uuidv4(),
      title:requestBody.title,
      content:requestBody.content,
      createDt:date,
      updateDt:date
    }
  }

  try{
    await db.put(params).promise();
    return {
      statusCode: 200,
      body: ''
    };
  }catch(e){
    return {
      statusCode: 500,
      body: JSON.stringify(e)
    };
  }
}