const config = require('../config.json');
const { Telegram } = require('telegraf');
const tg = new Telegram(config.bot_token);
const nodemailer = require('nodemailer'); 
// Importing models
const userData = require('./userData');

module.exports = {
    async addUser(id) {
                const existingUserData = await userData.findOne({ user_id: id });
        
                if (!existingUserData) {
                    await userData.create({
                        user_id: id,
                        smtp: 'none',
                        port: 0,
                        user: 'none',
                        pass: 'none',
                        email: 'none',
                        to: 'none',
                        subject: 'none',
                        content: 'none'
                    });
                } else {
                    return;
                }
    },
    async setSMTP(ctx, id) {
        const messageText = ctx.message.text;
        const args = messageText.split(' ').slice(1);
        const argsString = args.join(' ');

        if(argsString === '') {
            tg.sendMessage(id, 'Your SMTP cannot be a empty character/null');
            return;
        };

        const existingUserData = await userData.findOne({ user_id: id });

        if (!existingUserData) {
                    await userData.create({
                        user_id: id,
                        smtp: 'none',
                        port: 0,
                        user: 'none',
                        pass: 'none',
                        email: 'none',
                        to: 'none',
                        subject: 'none',
                        content: 'none'
                    });
                    tg.sendMessage(id, 'You are not included in database! Making a warm place for you :3');
                } else {
                    await userData.findOneAndUpdate({ user_id: id, smtp: argsString });
                    tg.sendMessage(id, `Succesfully set your SMTP server: ${argsString}`)
                }
    },
    async setPORT(ctx, id) {
        const messageText = ctx.message.text;
        const args = messageText.split(" ").slice(1);
        const argsString = args.join(" ");

        const parsed = parseInt(argsString);

        if (isNaN(parsed)) {
          tg.sendMessage(id, "Port must be a number!");
          return;
        };

        const existingUserData = await userData.findOne({ user_id: id });

        if (!existingUserData) {
                    await userData.create({
                        user_id: id,
                        smtp: 'none',
                        port: 0,
                        user: 'none',
                        pass: 'none',
                        email: 'none',
                        to: 'none',
                        subject: 'none',
                        content: 'none'
                    });
                    tg.sendMessage(id, 'You are not included in database! Making a warm place for you :3');
                } else {
                    await userData.findOneAndUpdate({ user_id: id, port: parsed});
                    tg.sendMessage(id, `Succesfully set your PORT: ${parsed}`)
                }
    },
    async setUSER(ctx, id) {
        const messageText = ctx.message.text;
        const args = messageText.split(' ').slice(1);
        const argsString = args.join(' ');

        if(argsString === '') {
            tg.sendMessage(id, 'Your SMTP User cannot be a empty character/null');
            return;
        };

        const existingUserData = await userData.findOne({ user_id: id });

        if (!existingUserData) {
                    await userData.create({
                        user_id: id,
                        smtp: 'none',
                        port: 0,
                        user: 'none',
                        pass: 'none',
                        email: 'none',
                        to: 'none',
                        subject: 'none',
                        content: 'none'
                    });
                    tg.sendMessage(id, 'You are not included in database! Making a warm place for you :3');
                } else {
                    await userData.findOneAndUpdate({ user_id: id, user: argsString });
                    tg.sendMessage(id, `Succesfully set your SMTP's USER: ${argsString}`)
                }
    },
    async setPASS(ctx, id) {
        const messageText = ctx.message.text;
        const args = messageText.split(' ').slice(1);
        const argsString = args.join(' ');

        if(argsString === '') {
            tg.sendMessage(id, 'Your SMTP Password cannot be a empty character/null');
            return;
        };

        const existingUserData = await userData.findOne({ user_id: id });

        if (!existingUserData) {
                    await userData.create({
                        user_id: id,
                        smtp: 'none',
                        port: 0,
                        user: 'none',
                        pass: 'none',
                        email: 'none',
                        to: 'none',
                        subject: 'none',
                        content: 'none'
                    });
                    tg.sendMessage(id, 'You are not included in database! Making a warm place for you :3');
                } else {
                    await userData.findOneAndUpdate({ user_id: id, pass: argsString });
                    tg.sendMessage(id, `Succesfully set your SMTP's PASSWORD: ${argsString}`)
                }
    },
    async setEMAIL(ctx, id) {
        const messageText = ctx.message.text;
        const args = messageText.split(' ').slice(1);
        const argsString = args.join(' ');

        if(argsString === '') {
            tg.sendMessage(id, 'Your SMTP Email cannot be a empty character/null');
            return;
        };

        const existingUserData = await userData.findOne({ user_id: id });

        if (!existingUserData) {
                    await userData.create({
                        user_id: id,
                        smtp: 'none',
                        port: 0,
                        user: 'none',
                        pass: 'none',
                        email: 'none',
                        to: 'none',
                        subject: 'none',
                        content: 'none'
                    });
                    tg.sendMessage(id, 'You are not included in database! Making a warm place for you :3');
                } else {
                    await userData.findOneAndUpdate({ user_id: id, email: argsString });
                    tg.sendMessage(id, `Succesfully set your SMTP's EMAIL: ${argsString}`)
                }
    },
    async getUserInfo(id) {
        tg.sendMessage(id, 'Getting information about you...');

        const existingUserData = await userData.findOne({ user_id: id });
        if (!existingUserData) {
                    await userData.create({
                        user_id: id,
                        smtp: 'none',
                        port: 0,
                        user: 'none',
                        pass: 'none',
                        email: 'none',
                        to: 'none',
                        subject: 'none',
                        content: 'none'
                    });
                    tg.sendMessage(id, 'You are not included in database! Making a warm place for you :3');
                } else {
                    const userinfo = await userData.findOne({ user_id: id });
                    tg.sendMessage(id, `Your ID: ${id}\nYour SMTP Server: ${userinfo.smtp}\nYour SMTP's Port: ${userinfo.port}\nYour SMTP's User: ${userinfo.user}\nYour SMTP's Password: ${userinfo.pass}`)
                }
    },
    async sendMSG(id) {
        const existingUserData = await userData.findOne({ user_id: id });
        if (!existingUserData) {
                    await userData.create({
                        user_id: id,
                        smtp: 'none',
                        port: 0,
                        user: 'none',
                        pass: 'none',
                        email: 'none',
                        to: 'none',
                        subject: 'none',
                        content: 'none'
                    });
                    await tg.sendMessage(id, 'You are not included in database! Making a warm place for you :3');
                    tg.sendMessage(id, 'Now you should link your SMTP Server with bot\n/setsmtp\n/setport\n/setuser\n/setpass')
                } else if(existingUserData) {
                    try {

                    const userinfo = await userData.findOne({ user_id: id });
                    if(userinfo.smtp === 'none') {
                        tg.sendMessage(id, 'Your SMTP is not linked properly!\nSet your SMTP Host: /setsmtp (e.g mail.google.com)')
                    } else if(userinfo.port === 0) {
                        tg.sendMessage(id, 'Your SMTP is not linked properly!\nSet your SMTP Port: /setport (e.g default smtp port: 465)')
                    } else if(userinfo.user === 'none') {
                        tg.sendMessage(id, 'Your SMTP is not linked properly!\nSet your SMTP User: /setuser (e.g john.doe or john.doe@gmail.com)')
                    } else if(userinfo.pass === 'none') {
                        tg.sendMessage(id, 'Your SMTP is not linked properly!\nSet your SMTP Password: /setpass (e.g password123)')
                    } else if(userinfo.email === 'none') {
                        tg.sendMessage(id, 'Your SMTP is not linked properly!\nSet your SMTP Email: /setemail (e.g john.doe@gmail.com)')   
                    } else if(userinfo.to === 'none') {
                        tg.sendMessage(id, "You didn't set any user/email, where you want to send message!")
                    } else if(userinfo.subject === 'none') {
                        tg.sendMessage(id, "You didn't set any subject for email!")
                    } else if(userinfo.content === 'none') {
                        tg.sendMessage(id, "You didn't set text/content for email!")
                    } else {
                        let transporter = nodemailer.createTransport({
                        host: userinfo.smtp,
                        port: userinfo.port,
                        secure: true,
                        auth: {
                          user: userinfo.user,
                          pass: userinfo.pass
                        },
                      });

                      tg.sendMessage(id,
                        `Sending email to: ${userinfo.to}\n\nWith subject: ${userinfo.subject}\n\nWith text: ${userinfo.content}\n\n\nFROM: ${userinfo.email}`
                        )

                      await transporter.sendMail({
                        from: `"MailBot" <${userinfo.email}>`,
                        to: userinfo.to,
                        subject: userinfo.subject,
                        text: userinfo.content,
                      });
                    }
                } catch(error) {
                    tg.sendMessage(id, `Error Code: ${error.code || error}\nError Response: ${error.response || error}`)
                }

                }
    }
}