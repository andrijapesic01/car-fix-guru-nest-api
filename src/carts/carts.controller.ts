import { Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CartsService } from './carts.service';
import { Cart, CartItem } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';

@Controller('carts')
@ApiTags('carts')
export class CartsController {
  constructor(private cartsService: CartsService) {}

  @Post('createCart/:userId')
  public async createOrUpdateCart(@Param('userId') userId: string) : Promise<Cart> {
    return this.cartsService.createOrUpdateCart(userId);
  }

  @Get(':cartId')
  public async getCart(@Param('cartId') cartId: string) {
    return this.cartsService.getAllItems(cartId);
  }

  @Post('addItem/:cartId/:partId/:quantity')
  public async addItemToCart(@Param('cartId') cartId: string, @Param('partId') partId: string, 
    @Param('quantity', ParseIntPipe) quantity: number) : Promise<CartItem> {

      return this.cartsService.addItemToCart(cartId, partId, quantity);
  }

  @Put('updateItem/:cartItemId/:quantity')
  public async updateCartItemQuantity(@Param('cartItemId') cartItemId: string, @Param('quantity', ParseIntPipe) 
  newQuantity: number) : Promise<CartItem> {
    
    return this.cartsService.updateCartItemQuantity(cartItemId, newQuantity);
  }

  @Delete('removeItem/:cartItemId')
  public async removeCartItem(@Param('cartItemId') cartItemId: string): Promise<void> {
    const cartItem = await this.cartsService.removeCartItem(cartItemId);
    if (cartItem == null) {
      throw new NotFoundException('Cart item not found');
    }
  }

  @Delete('clearCart/:cartId')
  public async clearCart(@Param('cartId') cartId: string) : Promise<Cart> {
    return this.cartsService.clearCart(cartId);
  }

}
