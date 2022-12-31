
export interface FileUploadBase {
    filename?: string;
    path: string;
    fileType?: string;
    
}

export default abstract class UploaderBase {
    abstract uploadFile(file: FileUploadBase | any): any;
    abstract removeFile(fileIdentifier: any): any;
}