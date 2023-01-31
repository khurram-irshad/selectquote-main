import fs from 'fs';
import mimemessage from 'mimemessage';

class EmailService {
    async send(model: any) {
        const mailContent = mimemessage.factory({contentType: 'multipart/mixed',body: []});
        mailContent.header('From', model.fromEmail);
        mailContent.header('To', model.toEmail);
        mailContent.header('Subject', model.subject);
        const alternateEntity = mimemessage.factory({
            contentType: 'multipart/alternate',
            body: []
        });
        const htmlEntity = mimemessage.factory({
            contentType: 'text/html;charset=utf-8',
            body: model.body
        })
        alternateEntity.body.push(htmlEntity);

        mailContent.body.push(alternateEntity);
        if(model.attachment){
            const attachment = await fs.readFileSync(model.attachment);
            const attachmentEntity = mimemessage.factory({
                contentType: 'multipart/mixed',
                contentTransferEncoding: 'base64',
                body: attachment.toString('base64').replace(/([^**\0**]{76})/g, "$1\n")
            });
            attachmentEntity.header('Content-Disposition', `attachment ;filename="${model.attachment.split("/").slice(-1)[0]}"`);
            mailContent.body.push(attachmentEntity)
        }

        var AWS = require('aws-sdk');       
        AWS.config.update({
            region: 'us-west-2'
        });
        AWS.config.getCredentials(function (error) {
            if (error) console.log(error.stack);
        });
        const ses = new AWS.SES({ apiVersion: "2010-12-01" })
        return ses.sendRawEmail({
            RawMessage: { Data: mailContent.toString() }
        }, (err) => console.log(err))
    }
}

export const emailService = new EmailService();
