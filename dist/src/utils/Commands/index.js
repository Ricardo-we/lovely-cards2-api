"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const string_utils_1 = require("../string.utils");
const file_utils_1 = require("../file.utils");
const index_1 = __importDefault(require("../../config/index"));
const log_utils_1 = require("../log.utils");
const chalk_1 = __importDefault(require("chalk"));
const cli_spinners_1 = __importDefault(require("cli-spinners"));
const controller_template_1 = __importDefault(require("./appTemplate/controller.template"));
const model_template_1 = __importDefault(require("./appTemplate/model.template"));
const router_template_1 = __importDefault(require("./appTemplate/router.template"));
const fs_1 = require("fs");
const ora_1 = __importDefault(require("ora"));
const path_1 = __importDefault(require("path"));
function createApp(appName) {
    const appRootDir = path_1.default.join(index_1.default.APP_ROOT, "app");
    if (!(0, fs_1.existsSync)(appRootDir))
        (0, file_utils_1.mkdirSyncSafe)(appRootDir);
    const newAppDir = path_1.default.join(appRootDir, appName);
    const controllerTemplate = (0, controller_template_1.default)((0, string_utils_1.dashedToPascalCase)(appName));
    const modelTemplate = (0, model_template_1.default)(appName, (0, string_utils_1.dashedToPascalCase)(appName));
    const routerTemplate = (0, router_template_1.default)(appName);
    (0, file_utils_1.mkdirSyncSafe)(newAppDir);
    (0, file_utils_1.writeFileSyncSafe)(path_1.default.join(newAppDir, "model.ts"), modelTemplate);
    (0, file_utils_1.writeFileSyncSafe)(path_1.default.join(newAppDir, "controller.ts"), controllerTemplate);
    (0, file_utils_1.writeFileSyncSafe)(path_1.default.join(newAppDir, "router.ts"), routerTemplate);
    return true;
}
function main() {
    if (process.argv.length < 3)
        return console.log("Parameteres required");
    const action = process.argv[2];
    if (action === "createapp") {
        const spinner = (0, ora_1.default)(cli_spinners_1.default.dots).start(chalk_1.default.blue("Creating project"));
        const appName = process.argv[3];
        createApp(appName);
        (0, log_utils_1.blueLog)("Successfully created " + appName + "!");
        spinner.stop();
    }
}
main();
