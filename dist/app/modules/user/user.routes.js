"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = require("express");
const user_controllers_1 = require("./user.controllers");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = (0, express_1.Router)();
router.get('/get-all-users', (0, auth_1.default)("admin"), user_controllers_1.userControllers.getAllUsers);
router.get("/getMyData", (0, auth_1.default)("admin", "user"), user_controllers_1.userControllers.getMyData);
router.patch("/updateProfile", (0, auth_1.default)("admin", "user"), user_controllers_1.userControllers.updateProfile);
exports.userRoutes = router;
