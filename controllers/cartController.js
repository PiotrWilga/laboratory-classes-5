const Product = require("../models/Product");
const Cart = require("../models/Cart");
const { STATUS_CODE } = require("../constants/statusCode");

exports.addProductToCart = (request, response) => {
  const { name, description, price } = request.body;

  const product = new Product(name, description, parseFloat(price));
  Product.add(product);
  Cart.add(name);

  response.status(STATUS_CODE.FOUND).redirect("/products/new");
};

exports.getProductsCount = (request, response) => {
  const count = Cart.getProductsQuantity();
  response.status(STATUS_CODE.OK).json({ quantity: count });
};
