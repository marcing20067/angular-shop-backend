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
const postProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.file) {
            throw new Error('No file included.');
        }
        const { name, price, maxQuantity, featured, category, creator } = req.body;
        const c = 'da21d12d12';
        const imageUrl = 'http://localhost:3000/' + req.file.filename;
        const product = new product_1.default({
            name,
            price,
            maxQuantity,
            featured,
            creator: c,
            imageUrl,
            category
        });
        const createdProduct = yield product.save();
        res.send(createdProduct);
    }
    catch (err) {
        console.log(err);
    }
});
exports.postProduct = postProduct;
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const creator = 'dsadasd';
        const filter = {
            name: req.query.name,
            featured: req.query.featured === 'true' ? true : false,
            creator: creator,
        };
        const products = yield product_1.default.find(filter)
            .limit(req.body.itemsPerPage)
            .skip(req.body.itemsPerPage * req.body.page);
        if (products) {
            res.send(products);
            return;
        }
        throw new Error("Product doesn't exists");
    }
    catch (_a) { }
});
exports.getProducts = getProducts;
const getProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const creator = 'dsadasd';
        const product = yield product_1.default.findOne({ _id: id, creator });
        if (product) {
            res.send(product);
            return;
        }
        throw new Error("Product doesn't exists");
    }
    catch (_b) { }
});
exports.getProduct = getProduct;
