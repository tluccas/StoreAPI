import models from "../../database/migrations/index.js";
const { Cart, CartItem, Product } = models;

//Criar lógica para limpar carrinho após criar o pedido referente aos intens
class CartService {
  constructor() {}

  async findByUserId(userId) {
    const cart = await Cart.findOne({
      where: { userId },
      include: [
        {
          model: CartItem,
          as: "items",
          include: [Product],
        },
      ],
    });

    return cart;
  }

  async create(userId) {
    try {
      const [cart] = await Cart.findOrCreate({
        where: { userId },
        defaults: { userId },
      });
      return cart;
    } catch (error) {
      console.error("Erro ao criar carrinho:", error);
      throw new Error("Não foi possível criar o carrinho.");
    }
  }

  async addItem(userId, productId, quantity) {
    try {
      const cart = await this.create(userId);
      const product = await Product.findByPk(productId);

      if (!product) {
        throw new Error("Produto não encontrado.");
      }

      if (product.stock < quantity) {
        throw new Error("Estoque insuficiente.");
      }

      const [item, created] = await CartItem.findOrCreate({
        where: { cartId: cart.id, productId: productId },
        defaults: { quantity: quantity },
      });

      if (!created) {
        await item.update({ quantity: item.quantity + quantity });
      }

      product.stock -= quantity;
      await product.save();

      return this.findByUserId(userId);
    } catch (error) {
      console.error("Erro ao adicionar item ao carrinho:", error);
      throw error;
    }
  }

  async removeItem(userId, productId, quantity) {
    try {
      const cart = await this.findByUserId(userId);
      if (!cart) {
        throw new Error("Carrinho não encontrado.");
      }

      const item = cart.items.find((i) => i.productId === productId);
      if (!item) {
        throw new Error("Item não encontrado no carrinho.");
      }

      const product = await Product.findByPk(productId);

      if (quantity && quantity < item.quantity) {
        item.quantity -= quantity;
        await item.save();
        product.stock += quantity;
      } else {
        await item.destroy();
        product.stock += item.quantity;
      }

      await product.save();

      return this.findByUserId(userId);
    } catch (error) {
      console.error("Erro ao remover item do carrinho:", error);
      throw error;
    }
  }

  async delete(userId) {
    try {
      const cart = await this.findByUserId(userId);
      if (cart) {
        for (const item of cart.items) {
          const product = await Product.findByPk(item.productId);
          product.stock += item.quantity;
          await product.save();
        }
        await CartItem.destroy({ where: { cartId: cart.id } });
        await cart.destroy();
      }
      return true;
    } catch (error) {
      console.error("Erro ao remover carrinho:", error);
      throw new Error("Não foi possível remover o carrinho.");
    }
  }
}

export default CartService;
