import { NextFunction, Request, Response } from 'express';
import { Cart } from '../models/cart';
import User from '../models/user';
const stripe = require('stripe')(process.env.STRIPE_KEY);

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

    const session = await stripe.checkout.sessions.create({
      line_items: cart,
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL}/cart`,
      cancel_url: `${process.env.FRONTEND_URL}/cart`,
    });
    res.status(201).send({
      url: session.url,
    });
  } catch (err) {
    next(err);
  }
};

export const getAccount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.userData?._id;
  try {
    const user = await User.findOne({ _id: userId });
    let stars = '';
    for (let i = 0; i < user!.password.length; i++) {
      stars += '*';
    }

    res.send({
      username: user!.username,
      password: stars,
    });
  } catch (err) {
    next(err);
  }
};
