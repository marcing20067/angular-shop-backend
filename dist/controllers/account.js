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
exports.getAccount = exports.postPay = void 0;
const user_1 = __importDefault(require("../models/user"));
const stripe = require('stripe')(process.env.STRIPE_KEY);
const postPay = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cart = req.body.cart.items.map((i) => {
            return {
                price_data: {
                    currency: 'pln',
                    product_data: {
                        name: i.name + ' x' + i.quantity,
                    },
                    unit_amount: i.price * 100,
                },
                quantity: i.quantity,
            };
        });
        const session = yield stripe.checkout.sessions.create({
            line_items: cart,
            mode: 'payment',
            success_url: `${process.env.FRONTEND_URL}/cart`,
            cancel_url: `${process.env.FRONTEND_URL}/cart`,
        });
        res.status(201).send({
            url: session.url,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.postPay = postPay;
const getAccount = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.userData) === null || _a === void 0 ? void 0 : _a._id;
    try {
        const user = yield user_1.default.findOne({ _id: userId });
        let stars = '';
        for (let i = 0; i < user.password.length; i++) {
            stars += '*';
        }
        res.send({
            username: user.username,
            password: stars,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.getAccount = getAccount;
