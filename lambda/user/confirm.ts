import * as AWS from 'aws-sdk';

const cognito = new AWS.CognitoIdentityServiceProvider();
const CLIENT_ID=process.env.CLIENT_ID || "";

export const handler = async (event: any,): Promise<any> => {
  const requestBody = JSON.parse(event.body);
  const username = requestBody.username;
  const code = requestBody.code;

  const params = {
    ClientId:CLIENT_ID,
    Username: username,
    ConfirmationCode: code,
  }

  try{
    const result = await cognito.confirmSignUp(params).promise();
    console.log(result);
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
