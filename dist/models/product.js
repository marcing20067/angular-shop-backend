"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const productSchema = new Schema({
    name: { required: true, minlength: 5, type: String },
    price: { required: true, type: Number },
    imageUrl: { required: true, type: String },
    maxQuantity: { required: true, type: Number },
    featured: { required: true, type: Boolean },
    creator: { required: true, type: String },
    category: { required: true, type: String }
});
const Product = mongoose_1.default.model('Product', productSchema);
exports.default = Product;
