"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRoutes = void 0;
const express_1 = require("express");
const products_controllers_1 = require("./products.controllers");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const products_validations_1 = require("./products.validations");
const router = (0, express_1.Router)();
router.get('/', products_controllers_1.productControllers.getAllProducts);
router.get('/:id', products_controllers_1.productControllers.getSingleProduct);
router.delete('/:id', (0, auth_1.default)("admin"), products_controllers_1.productControllers.deleteProduct);
router.post('/create-product', (0, auth_1.default)("admin"), (0, validateRequest_1.default)(products_validations_1.productValidations.createProductValidationSchema), products_controllers_1.productControllers.createProduct);
router.patch('/update-product/:id', (0, auth_1.default)("admin"), (0, validateRequest_1.default)(products_validations_1.productValidations.updateProductValidationSchema), products_controllers_1.productControllers.updateProduct);
exports.productRoutes = router;
