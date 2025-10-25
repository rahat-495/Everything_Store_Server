"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewRoutes = void 0;
const express_1 = require("express");
const review_controllers_1 = require("./review.controllers");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = (0, express_1.Router)();
router.post('/create-review', (0, auth_1.default)("user"), review_controllers_1.reviewControllers.createReview);
router.get('/get-all-reviews', (0, auth_1.default)("admin"), review_controllers_1.reviewControllers.getAllReviews);
router.get('/get-my-reviews', (0, auth_1.default)("user"), review_controllers_1.reviewControllers.getMyAllReviews);
router.get('/get-my-review/:id', (0, auth_1.default)("user"), review_controllers_1.reviewControllers.getMySingleReview);
router.get('/get-order-review/:id', (0, auth_1.default)("user"), review_controllers_1.reviewControllers.getMyOrderReview);
router.patch('/update-my-review/:id', (0, auth_1.default)("user"), review_controllers_1.reviewControllers.updateMyReview);
exports.reviewRoutes = router;
