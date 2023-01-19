"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const route_utils_1 = require("../route.utils");
const defaultMiddleware = (_, __, next) => next();
class BRouter {
    static crudRouter(basePath, controller) {
        var _a, _b, _c, _d, _e;
        const router = (0, express_1.Router)();
        const controllerConfig = controller.controllerConfig.routesCustomPaths;
        const middlewares = controller.controllerConfig.routesMiddlewares;
        router.get((controllerConfig === null || controllerConfig === void 0 ? void 0 : controllerConfig.get) ? (0, route_utils_1.joinRoutes)(basePath, controllerConfig === null || controllerConfig === void 0 ? void 0 : controllerConfig.get) : basePath, ((_a = controller === null || controller === void 0 ? void 0 : controller.controllerConfig) === null || _a === void 0 ? void 0 : _a.globalMiddleware) || defaultMiddleware, (middlewares === null || middlewares === void 0 ? void 0 : middlewares.get) || defaultMiddleware, controller.get);
        router.get((controllerConfig === null || controllerConfig === void 0 ? void 0 : controllerConfig.getOne) ? (0, route_utils_1.joinRoutes)(basePath, controllerConfig === null || controllerConfig === void 0 ? void 0 : controllerConfig.getOne) : basePath, ((_b = controller === null || controller === void 0 ? void 0 : controller.controllerConfig) === null || _b === void 0 ? void 0 : _b.globalMiddleware) || defaultMiddleware, (middlewares === null || middlewares === void 0 ? void 0 : middlewares.getOne) || defaultMiddleware, controller.getOne);
        router.post((controllerConfig === null || controllerConfig === void 0 ? void 0 : controllerConfig.post) ? (0, route_utils_1.joinRoutes)(basePath, controllerConfig === null || controllerConfig === void 0 ? void 0 : controllerConfig.post) : basePath, ((_c = controller === null || controller === void 0 ? void 0 : controller.controllerConfig) === null || _c === void 0 ? void 0 : _c.globalMiddleware) || defaultMiddleware, (middlewares === null || middlewares === void 0 ? void 0 : middlewares.post) || defaultMiddleware, controller.post);
        router.put((controllerConfig === null || controllerConfig === void 0 ? void 0 : controllerConfig.put) ? (0, route_utils_1.joinRoutes)(basePath, controllerConfig === null || controllerConfig === void 0 ? void 0 : controllerConfig.put) : basePath, ((_d = controller === null || controller === void 0 ? void 0 : controller.controllerConfig) === null || _d === void 0 ? void 0 : _d.globalMiddleware) || defaultMiddleware, (middlewares === null || middlewares === void 0 ? void 0 : middlewares.put) || defaultMiddleware, controller.put);
        router.delete((controllerConfig === null || controllerConfig === void 0 ? void 0 : controllerConfig.destroy) ? (0, route_utils_1.joinRoutes)(basePath, controllerConfig === null || controllerConfig === void 0 ? void 0 : controllerConfig.destroy) : basePath, ((_e = controller === null || controller === void 0 ? void 0 : controller.controllerConfig) === null || _e === void 0 ? void 0 : _e.globalMiddleware) || defaultMiddleware, (middlewares === null || middlewares === void 0 ? void 0 : middlewares.destroy) || defaultMiddleware, controller.destroy);
        return router;
    }
}
exports.default = BRouter;
