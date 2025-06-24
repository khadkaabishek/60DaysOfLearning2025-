import mongoose, { Document, Schema } from "mongoose";
export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
}
const ProductSchema: Schema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      required: true, 
    },
  },
  {
    timestamps: true, 
  }
);


const Product = mongoose.model<IProduct>("Product", ProductSchema);
export default Product;

