import * as AWS from 'aws-sdk';

const cognito = new AWS.CognitoIdentityServiceProvider();
const CLIENT_ID=process.env.CLIENT_ID || "";

/**
 * ユーザ確認
 * @param event リクエストデータ
 * @returns レスポンスデータ
 */
export const handler = async (event: any,): Promise<any> => {
  //ボディからユーザ名と確認コードを取得
  const requestBody = JSON.parse(event.body);
  const username = requestBody.username;
  const code = requestBody.code;

  const params = {
    ClientId:CLIENT_ID,
    Username: username,
    ConfirmationCode: code,
  }

  try{
    await cognito.confirmSignUp(params).promise();
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
