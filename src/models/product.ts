import mongoose from 'mongoose';
const { Schema } = mongoose;

interface Product {
  _id?: string;
  name: string;
  price: number;
  imageUrl: string;
  featured: boolean;
  category: string;
}

const productSchema = new Schema<Product>({
  name: { required: true, minlength: 5, type: String },
  price: { required: true, type: Number },
  imageUrl: { required: true, type: String },
  featured: { required: true, type: Boolean },
  category: { required: true, type: String }
});

const Product = mongoose.model('Product', productSchema);
export default Product;
