import * as AWS from 'aws-sdk';

const db = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME=process.env.TABLE_NAME || "";

interface Obj{
  [prop:string]:any,
}

/**
 * タスク更新
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
  const date = Date.now();
  //ボディに含まれている要素を取得
  const requestBody = JSON.parse(event.body);
  const keyList = Object.keys(requestBody);
  const attributes:Obj = {};

  //更新日時は確実に更新する
  const params = {
    TableName:TABLE_NAME,
    Key:{
      userId:userId,
      taskId:taskId
    },
    UpdateExpression:'set updateDt = :updateDt',
    ExpressionAttributeValues:attributes,
  }
  attributes[':updateDt'] = date;
  //更新日時以外の更新項目を設定する
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