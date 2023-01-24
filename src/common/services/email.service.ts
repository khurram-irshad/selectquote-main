
class EmailService {
    async send(model: any) {
        // Load the AWS SDK for Node.js
        var AWS = require('aws-sdk');
        // Set the region 
        AWS.config.update({ region: 'REGION' });
        var params = {
            Destination: { /* required */
                ToAddresses: [
                    model.toEmail,
                ]
            },
            Message: { /* required */
                Body: { /* required */
                    Html: {
                        Charset: "UTF-8",
                        Data: "HTML_FORMAT_BODY"
                    },
                    Text: {
                        Charset: "UTF-8",
                        Data: "TEXT_FORMAT_BODY"
                    }
                },
                Subject: {
                    Charset: 'UTF-8',
                    Data: model.subject
                }
            },
            Source: model.fromEmail, /* required */
        };
        return new AWS.SES({ apiVersion: '2010-12-01' }).sendEmail(params).promise();


    }
}

export const emailService = new EmailService();