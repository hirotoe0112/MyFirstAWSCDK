import * as AWS from 'aws-sdk';
import {v4 as uuidv4} from 'uuid';

const db = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME=process.env.TABLE_NAME || "";

type EventBody = {
  userId: string
  title: string
  content: string
}

export const handler = async (event: any,): Promise<any> => {
  const requestBody = JSON.parse(event.body) as EventBody;
  const date = Date.now() / 1000;
  const params = {
    TableName:TABLE_NAME,
    Item:{
      userId:requestBody.userId,
      taskId:uuidv4(),
      title:requestBody.title,
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
