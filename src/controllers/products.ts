import { NextFunction, Request, Response } from 'express';
import { CustomError } from '../helpers/custom-error';
import Product from '../models/product';

export const postProduct = async (
  req: Request<{}, Product, Omit<Product, 'imageUrl'>, {}>,
  res: Response<Product>,
  next: NextFunction
) => {
  try {
    if (!req.file) {
      const error: CustomError = new Error();
      error.errorMessage = 'No file included.';
      error.statusCode = 400;
      throw error;
    }

    const { name, price, maxQuantity, featured, category, creator } = req.body;
    const c = 'creator';
    const imageUrl = 'http://localhost:3000/' + req.file.filename;
    const product = new Product({
      name,
      price,
      maxQuantity,
      featured,
      creator: c,
      imageUrl,
      category,
    });
    const createdProduct = await product.save();
    res.send(createdProduct);
  } catch (err) {
    next(err);
  }
};

export const getProducts = async (
  req: Request<
    {},
    { length: number; products: Product[] },
    {
      page?: number;
      itemsPerPage?: number;
      name?: string;
      featured?: 'true' | 'false';
    }
  >,
  res: Response<{ length: number; products: Product[] }>,
  next: NextFunction
) => {
  try {
    const creator = 'creator';
    let filter = {
      name: {
        $regex: new RegExp(`${req.query.name || ''}`, 'i'),
      },
      featured: req.query.featured === 'true' ? true : false,
      creator: creator,
    };

    const length = await Product.find(filter).countDocuments();
    let products: Product[];
    const { itemsPerPage, page } = req.query;
    if (itemsPerPage && page) {
      products = await Product.find(filter)
        .limit(+itemsPerPage)
        .skip(+itemsPerPage * +page);
    } else {
      products = await Product.find(filter);
    }

    res.send({ length, products });
  } catch (error) {
    next(error);
  }
};

export const getProduct = async (
  req: Request<{ id: string }>,
  res: Response<Product>,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const creator = 'creator';
    const product = await Product.findOne({ _id: id, creator });
    if (product) {
      res.send(product);
      return;
    }

    const error: CustomError = new Error();
    error.errorMessage = "Product doesn't exists.";
    error.statusCode = 400;
    throw error;
  } catch (err) {
    next(err);
  }
};
