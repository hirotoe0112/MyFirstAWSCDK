import * as AWS from 'aws-sdk';

const db = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME=process.env.TABLE_NAME || "";

/**
 * タスク削除
 * @param event リクエストデータ
 * @returns レスポンスデータ
 */
export const handler = async (event: any,): Promise<any> => {
  //トークンからsubを取得
  const token = event.headers['Authorization'];
  const sections = token.split('.');
  const payload = JSON.parse(Buffer.from(sections[1], 'base64').toString());
  const userId = payload['sub'];
  //URLパスからタスクIDを取得
  const pathParams = event.pathParameters;
  const taskId = pathParams.taskId;

  const params = {
    TableName:TABLE_NAME,
    Key:{
      userId:userId,
      taskId:taskId
    }
  }

  try{
    await db.delete(params).promise();
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