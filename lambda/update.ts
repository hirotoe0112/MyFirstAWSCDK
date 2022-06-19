import * as AWS from 'aws-sdk';

const db = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME=process.env.TABLE_NAME || "";

export const handler = async (event: any,): Promise<any> => {
  const pathParams = event.pathParameters;
  const requestBody = JSON.parse(event.body);
  const userId = pathParams.userId;
  const taskId = pathParams.taskId;
  const date = Date.now();

  const params = {
    TableName:TABLE_NAME,
    Key:{
      userId:userId,
      taskId:taskId
    },
    UpdateExpression:'set updateDt = :updateDt',
    ExpressionAttributeValues:{
      ':updateDt':date,
    },
  }

  const keyList = Object.keys(requestBody);
  keyList.forEach((key) => {
    params.UpdateExpression += `, ${key} = :${key}`;
    params.ExpressionAttributeValues[`:${key}`] = requestBody[key];
  })

  try{
    await db.update(params).promise();
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