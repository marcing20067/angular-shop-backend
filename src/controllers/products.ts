import { Request, Response } from 'express';
import Product from '../models/product';

export const postProduct = async (req: Request, res: Response) => {};

export const getProducts = async (
  req: Request<
    {},
    Product[],
    { page: number; itemsPerPage: number },
    { name?: string; featured?: 'true' | 'false' }
  >,
  res: Response<Product[]>
) => {
  try {
    const creator = 'dsadasd';
    const filter = {
      name: req.query.name,
      featured: req.query.featured === 'true' ? true : false,
      creator: creator,
    };

    const products = await Product.find(filter)
      .limit(req.body.itemsPerPage)
      .skip(req.body.itemsPerPage * req.body.page);

    if (products) {
      res.send(products);
      return;
    }
    throw new Error("Product doesn't exists");
  } catch {}
};

export const getProduct = async (
  req: Request<{ id: string }>,
  res: Response<Product>
) => {
  const { id } = req.params;
  try {
    const creator = 'dsadasd';
    const product = await Product.findOne({ _id: id, creator });
    if (product) {
      res.send(product);
      return;
    }
    throw new Error("Product doesn't exists");
  } catch {}
};
