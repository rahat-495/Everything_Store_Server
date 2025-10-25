"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartRoutes = void 0;
const express_1 = require("express");
const cart_controllers_1 = require("./cart.controllers");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const cart_validations_1 = require("./cart.validations");
const router = (0, express_1.Router)();
router.get('/', (0, auth_1.default)("user"), cart_controllers_1.cartControllers.getMyAllCarts);
router.get('/:id', (0, auth_1.default)("user"), cart_controllers_1.cartControllers.getSingleCart);
router.delete('/:id', (0, auth_1.default)("user"), cart_controllers_1.cartControllers.deleteAddToCart);
router.post('/add-to-cart', (0, auth_1.default)("user"), (0, validateRequest_1.default)(cart_validations_1.cartValidations.createSartValidationSchema), cart_controllers_1.cartControllers.addToCart);
router.patch('/update/add-to-cart/:id', (0, auth_1.default)("user"), (0, validateRequest_1.default)(cart_validations_1.cartValidations.updateSartValidationSchema), cart_controllers_1.cartControllers.updateAddToCart);
exports.cartRoutes = router;
