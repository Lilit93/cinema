"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_server_1 = __importDefault(require("../controllers/controller_server"));
const serverController = new controller_server_1.default();
const serverRouter = (0, express_1.Router)();
serverRouter.get('/api/server', serverController.getAll);
exports.default = serverRouter;
//# sourceMappingURL=servers.js.map