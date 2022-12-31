import { MULTER_DISKSTORAGE_CONFIG, getCloudinaryConfig } from "./src/services/file-upload/file-upload-deps";

import appConfig from "./src/config/index";
import { appUseRoutes } from "./src/utils/route.utils";
import express from "express";
import multer from "multer";
import path from "path";

const app = express();

// GLOBAL MIDDLEWARES
getCloudinaryConfig();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(multer({ storage: MULTER_DISKSTORAGE_CONFIG }).any());

async function main() {
    try {
        await appUseRoutes(app);

        app.listen(appConfig.APP_PORT, () => {
            console.log(`Listening in http://localhost:${appConfig.APP_PORT}`)
        })
    } catch (err) {
        console.error(err)
    }
}

main().catch(console.error)