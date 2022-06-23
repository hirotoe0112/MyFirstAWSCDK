import * as AWS from 'aws-sdk';

const cognito = new AWS.CognitoIdentityServiceProvider();
const CLIENT_ID=process.env.CLIENT_ID || "";

export const handler = async (event: any,): Promise<any> => {
  const requestBody = JSON.parse(event.body);
  const username = requestBody.username;
  const password = requestBody.password;

  const params = {
    AuthFlow: 'USER_PASSWORD_AUTH',
    ClientId:CLIENT_ID,
    AuthParameters: {
      'USERNAME': username,
      'PASSWORD': password,
    },
  }

  try{
    const result = await cognito.initiateAuth(params).promise();
    console.log(result);
    return {
      statusCode: 200,
      body: JSON.stringify({
        IdToken: result.AuthenticationResult?.IdToken,
      })
    };
  }catch(e){
    return {
      statusCode: 500,
      body: JSON.stringify(e)
    };
  }
}
