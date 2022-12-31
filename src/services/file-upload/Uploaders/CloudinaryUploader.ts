import UploaderBase, { FileUploadBase } from "../UploaderBase";

import APP_CONFIG from "../../../config";
import cloudinary from "cloudinary";
import { removeFileSyncSafe } from "../../../utils/file.utils";

interface CloudinaryFileUpload extends FileUploadBase {
    uploadOptions?: cloudinary.UploadApiOptions;
}

export class CloudinaryUploader extends UploaderBase {

    uploadFile = async (file: CloudinaryFileUpload) => {
        const uploadedFile = await cloudinary.v2.uploader.upload(file?.path, {
            ...file.uploadOptions, 
            folder: APP_CONFIG.CLOUDINARY_CONFIG.main_folder
        });
        removeFileSyncSafe(file.path)
        return uploadedFile
    };

    removeFile = async (public_id: string, resource_type?: string) => {
        return await cloudinary.v2.uploader.destroy(public_id, { resource_type });
    }

}