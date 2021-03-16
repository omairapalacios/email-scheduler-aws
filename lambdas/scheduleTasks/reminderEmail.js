const { Session } = require('inspector');

const AWS = require('aws-sdk');
const Responses = require('../common/API_Responses');
const SES = new AWS.SES();
exports.handler = async event => {
  console.log('event', event);
  const message = `Hola Omaira, esta es una POC usando la programación de tareas automaticas usando AWS Lambdas, Amazon EventBridge (Cloud Watch) y SES 😄
  `;
  const params = {
    Destination: {
      ToAddresses: ['addressee@gmail.com'],
    },
    Message: {
      Body: {
        Text: {
          Data: message,
        },
      },
      Subject: {
        Data: 'remander email',
      },
    },
    Source: 'sender@gmail.com',
  };
  try {
    await SES.sendEmail(params).promise();
    return Responses._200({ message: 'email sent' });
  } catch (error) {
    console.log('error', error);
    return Responses._400({message: 'failed to send email'})
  }
}