import * as AWS from 'aws-sdk';

const cognito = new AWS.CognitoIdentityServiceProvider();
const CLIENT_ID=process.env.CLIENT_ID || "";

export const handler = async (event: any,): Promise<any> => {
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
