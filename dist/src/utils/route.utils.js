"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useRoutesBaseConfig = exports.joinRoutes = exports.appUseRoutes = exports.mapRoutes = exports.BASE_APP_PATH = void 0;
const jwt_middleware_1 = require("../services/middlewares/jwt.middleware");
const index_1 = __importDefault(require("../config/index"));
const path_1 = __importDefault(require("path"));
exports.BASE_APP_PATH = path_1.default.join(__dirname, "..");
function mapRoutes(appNameList, basePath = exports.BASE_APP_PATH) {
    return Promise.all(appNameList.map((appName) => __awaiter(this, void 0, void 0, function* () {
        var _a;
        const appPath = path_1.default.join(basePath, "app", appName);
        const router = (yield Promise.resolve().then(() => __importStar(require(path_1.default.join(appPath, "router")))));
        if (!router.default && ((_a = Object.keys(router)) === null || _a === void 0 ? void 0 : _a.length) > 1) {
            return Object.values(router);
        }
        return router === null || router === void 0 ? void 0 : router.default;
    })));
}
exports.mapRoutes = mapRoutes;
function appUseRoutes(app) {
    return __awaiter(this, void 0, void 0, function* () {
        const routes = yield mapRoutes(index_1.default.apps);
        routes.forEach(route => {
            if (route instanceof Array && route.length > 0)
                route.forEach((singleRoute) => app.use(singleRoute));
            else
                app.use(route);
        });
        return;
    });
}
exports.appUseRoutes = appUseRoutes;
function joinRoutes(...routes) {
    return routes.join("/");
}
exports.joinRoutes = joinRoutes;
const useRoutesBaseConfig = (routeBasePath) => ({
    globalRoute: routeBasePath,
    globalMiddleware: jwt_middleware_1.AuthMiddleware,
    routesCustomPaths: { destroy: ":id", put: ":id", getOne: ":id" }
});
exports.useRoutesBaseConfig = useRoutesBaseConfig;
