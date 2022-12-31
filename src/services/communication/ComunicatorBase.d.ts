export interface ComunicatorBaseOptions {
    to: string;
    body?: string;
}

export interface EmailComunicatorOptions extends ComunicatorBaseOptions {
    subject: string;
    rawHtml?: string, 
    htmlTemplatePath?: string
}

export interface ComunicatorBase {
    sendMultiple?: (options: ComunicatorBaseOptions | any) => any;
    send: (options: ComunicatorBaseOptions | any) => any;
}