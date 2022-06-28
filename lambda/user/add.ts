import * as AWS from 'aws-sdk';

const cognito = new AWS.CognitoIdentityServiceProvider();
const CLIENT_ID=process.env.CLIENT_ID || "";

/**
 * ユーザ登録
 * @param event リクエストデータ
 * @returns レスポンスデータ
 */
export const handler = async (event: any,): Promise<any> => {
  //ボディからユーザID、パスワード、メールアドレスを取得
  const requestBody = JSON.parse(event.body);
  const username = requestBody.username;
  const password = requestBody.password;
  const email = requestBody.email;

  const params = {
    ClientId:CLIENT_ID,
    Username: username,
    Password: password,
    UserAttributes: [
      {
        Name: 'email',
        Value: email,
      },
    ]
  }

  try{
    await cognito.signUp(params).promise();
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
