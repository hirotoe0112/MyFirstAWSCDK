import * as AWS from 'aws-sdk';

const db = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME=process.env.TABLE_NAME || "";

export const handler = async (event: any,): Promise<any> => {
  const pathParams = event.pathParameters;
  const userId = pathParams.userId;
  const taskId = pathParams.taskId;

  const params = {
    TableName:TABLE_NAME,
    Key:{
      userId:userId,
      taskId:taskId
    }
  }

  try{
    const data = await db.get(params).promise();
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