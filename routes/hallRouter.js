"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_halls_1 = __importDefault(require("../controllers/controller_halls"));
const hallsController = new controller_halls_1.default();
const hallRouter = (0, express_1.Router)();
hallRouter.post('/addHall', hallsController.addHall);
exports.default = hallRouter;
//# sourceMappingURL=hallRouter.js.map