import { ComunicatorBase, EmailComunicatorOptions } from "../ComunicatorBase";
import nodemailer, { Transport, TransportOptions, Transporter } from "nodemailer";

import APP_CONFIG from "../../../config";
import fs from "fs";
import { safeErrLog } from "../../../utils/log.utils";

export default class EmailService implements ComunicatorBase {
    private emailConn: Transporter;

    constructor() {
        this.emailConn = this.getEmailSenderConnection();
    }

    getEmailSenderConnection = (): Transporter => {
        const emailConnection = nodemailer.createTransport(APP_CONFIG.EMAIL_SENDING_CONFIG as TransportOptions);
        return emailConnection;
    };

    send = async ({ body, to, htmlTemplatePath, rawHtml, subject  }: EmailComunicatorOptions) => {
        try {
            const html = htmlTemplatePath
                ? fs.readFileSync(htmlTemplatePath, "utf-8")
                : rawHtml ;

            return await this.emailConn.sendMail({
                from: APP_CONFIG.EMAIL_SENDING_CONFIG.auth.user,
                to,
                subject,
                text: body,
                html,
            });
        } catch (error) {
            safeErrLog(error);
        }
    }

}