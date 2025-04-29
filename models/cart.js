const Product = require('./Product');

class Cart {
  static #items = [];

  static add(productName) {
    const product = Product.findByName(productName);
    if (!product) {
      throw new Error('Product not found');
    }

    const item = this.#items.find((entry) => entry.product.name === productName);
    if (item) {
      item.quantity += 1;
    } else {
      this.#items.push({ product, quantity: 1 });
    }
  }

  static getItems() {
    return this.#items;
  }

  static getTotalPrice() {
    return this.#items.reduce((total, entry) => {
      return total + entry.product.price * entry.quantity;
    }, 0);
  }

  static getProductsQuantity() {
    return this.#items.reduce((count, entry) => count + entry.quantity, 0);
  }

  static clearCart() {
    this.#items = [];
  }
}

module.exports = Cart;
