"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BRouter_1 = __importDefault(require("../../utils/Base/BRouter"));
const controller_1 = __importDefault(require("./controller"));
const routeBasePath = "/helpers";
const controller = new controller_1.default({ globalRoute: "" });
const router = BRouter_1.default.crudRouter(routeBasePath, controller);
exports.default = router;
