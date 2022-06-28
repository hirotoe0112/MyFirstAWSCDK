import * as AWS from 'aws-sdk';
import {v4 as uuidv4} from 'uuid';

const db = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME=process.env.TABLE_NAME || "";

/**
 * タスク新規登録
 * @param event リクエストデータ
 * @returns レスポンスデータ
 */
export const handler = async (event: any,): Promise<any> => {
  //トークンからsubを取得
  const token = event.headers['Authorization'];
  const sections = token.split('.');
  const payload = JSON.parse(Buffer.from(sections[1], 'base64').toString());
  const userId = payload['sub'];
  //ボディからタイトルと内容を取得
  const requestBody = JSON.parse(event.body);
  const title = requestBody.title;
  const content = requestBody.content;
  //登録日時と更新日時を現在日時とする
  const date = Date.now();

  const params = {
    TableName:TABLE_NAME,
    Item:{
      userId:userId,
      taskId:uuidv4(),
      title:title,
      content:content,
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
