import { Injectable, NotFoundException } from '@nestjs/common';
import { Cart, CartItem, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class CartsService {

    public async createOrUpdateCart(userId: string) : Promise<Cart> {
        let cart = await this.getCartByUser(userId);
    
        if (!cart) {
          cart = await this.createCart(userId);
        }
    
        return cart;
    }
    
    public async getCartByUser(userId: string) : Promise<Cart | null> {
        return prisma.cart.findFirst({
            where: { userId },
            include: { cartItems: true },
        });
    }
    
    public async createCart(userId: string) : Promise<Cart> {
        return prisma.cart.create({
            data: {
                userId,
            },
        });
    }
    
    public async addItemToCart(cartId: string, partId: string, quantity: number) : Promise<CartItem> {
        return prisma.cartItem.create({
            data: {
                cart: { connect: { id: cartId } },
                partId,
                quantity,
            },
        });
    }
    
    public async updateCartItemQuantity(cartItemId: string, newQuantity: number) : Promise<CartItem> {
        return prisma.cartItem.update({
            where: { id: cartItemId },
            data: { quantity: newQuantity },
        });
    }
    
    public async removeCartItem(cartItemId: string) : Promise<void> {
        await prisma.cartItem.delete({ where: { id: cartItemId } });
    }

    public async clearCart(cartId: string) : Promise<Cart> {
        const cart = await prisma.cart.findUnique({
            where: { id: cartId },
            include: { cartItems: true },
        });
      
        if (!cart) {
            throw new NotFoundException('Cart not found');
        }
      
        await Promise.all(cart.cartItems.map(async (cartItem) => {
            await prisma.cartItem.delete({ where: { id: cartItem.id } });
        }));
        return cart;
    }

    public async getAllItems(cartId: string) : Promise <Cart | null> {
        return await prisma.cart.findUnique({ 
            where: { id: cartId },
            include: { cartItems: true }
        });
    }

}
