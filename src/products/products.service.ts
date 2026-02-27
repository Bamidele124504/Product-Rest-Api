import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { NotFoundException } from '@nestjs/common';

type Product = {
  id: number;
  name: string;
  price: number;
  createdAt: Date;
};

@Injectable()
export class ProductsService {
 
  private products: Product[] = [];

  private nextId = 1;
  
  create(productData: { name: string; price: number }): Product {

    const newProduct: Product = {
      id: this.nextId++,
      name: productData.name,
      price: productData.price,
      createdAt: new Date(),
    };
  
    this.products.push(newProduct);
  
    return newProduct;
  }

  findAll(): Product[] {
    return this.products;
  }

  findOne(id: number): Product {
    const product = this.products.find(p => p.id === id);

  if (!product) {
    throw new NotFoundException('Product not found');
  }

  return product;
  }

  
  update(id: number, productData: { name?: string; price?: number }): Product {

    const product = this.findOne(id);
  
    if (productData.name !== undefined) {
      product.name = productData.name;
    }
  
    if (productData.price !== undefined) {
      product.price = productData.price;
    }
  
    return product;
  }

  remove(id: number): void {

    const index = this.products.findIndex(p => p.id === id);
  
    if (index === -1) {
      throw new NotFoundException('Product not found');
    }
  
    this.products.splice(index, 1);
  }
}
