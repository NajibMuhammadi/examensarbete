import {Schema, models, model} from "mongoose";

const ProductModels = new Schema({
    title: {type : String, required: true},
    description : {type : String, required: true},
    propertytype : {type : String, required: true},
    price : {type : Number, required: true},
    photo:{type : String, required: true},
    location: {type : String, required: true},
});

const Product = models.Product || model("Product", ProductModels);

export default Product;
