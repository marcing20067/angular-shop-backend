"use strict";
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
exports.getProduct = exports.getProducts = exports.postProduct = void 0;
const product_1 = __importDefault(require("../models/product"));
const postProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.file) {
            const error = new Error();
            error.errorMessage = 'No file included.';
            error.statusCode = 400;
            throw error;
        }
        const { name, price, maxQuantity, featured, category, creator } = req.body;
        const c = 'creator';
        const imageUrl = 'http://localhost:3000/' + req.file.filename;
        const product = new product_1.default({
            name,
            price,
            maxQuantity,
            featured,
            creator: c,
            imageUrl,
            category,
        });
        const createdProduct = yield product.save();
        res.send(createdProduct);
    }
    catch (err) {
        next(err);
    }
});
exports.postProduct = postProduct;
const getProducts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const creator = 'creator';
        let filter = {
            name: {
                $regex: new RegExp(`${req.query.name || ''}`, 'i'),
            },
            featured: req.query.featured === 'true' ? true : false,
            creator: creator,
        };
        const length = yield product_1.default.find(filter).countDocuments();
        let products;
        const { itemsPerPage, page } = req.query;
        if (itemsPerPage && page) {
            products = yield product_1.default.find(filter)
                .limit(+itemsPerPage)
                .skip(+itemsPerPage * +page);
        }
        else {
            products = yield product_1.default.find(filter);
        }
        res.send({ length, products });
    }
    catch (error) {
        next(error);
    }
});
exports.getProducts = getProducts;
const getProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const creator = 'creator';
        const product = yield product_1.default.findOne({ _id: id, creator });
        if (product) {
            res.send(product);
            return;
        }
        const error = new Error();
        error.errorMessage = "Product doesn't exists.";
        error.statusCode = 400;
        throw error;
    }
    catch (err) {
        console.log(err);
        next(err);
    }
});
exports.getProduct = getProduct;
