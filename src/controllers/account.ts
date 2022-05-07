import { NextFunction, Request, Response } from 'express';
import { Cart } from '../models/cart';
const stripe = require('stripe')(process.env.STRIPE_KEY);
export const getAccount = () => {};

export const postResetPassword = () => {
};

export const postPay = async (
  req: Request<{}, {}, { cart: Cart }>,
  res: Response,
  next: NextFunction
) => {
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
    console.log('=== cart ===');
    console.log(cart);

    const session = await stripe.checkout.sessions.create({
      line_items: cart,
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/cart`,
    });
    res.status(201).send({
      url: session.url,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
