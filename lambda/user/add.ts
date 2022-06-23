import * as AWS from 'aws-sdk';

const cognito = new AWS.CognitoIdentityServiceProvider();
const CLIENT_ID=process.env.CLIENT_ID || "";

export const handler = async (event: any,): Promise<any> => {
  const pathParams = event.pathParameters;
  const requestBody = JSON.parse(event.body);
  const username = pathParams.username;
  const password = requestBody.password;

  const params = {
    ClientId:CLIENT_ID,
    Username: username,
    Password: password,
  }

  try{
    const result = await cognito.signUp(params).promise();
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
