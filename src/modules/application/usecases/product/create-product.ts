import { Injectable } from '@nestjs/common';
import { CreateProductDto } from '@api/DTOs/product';
import { FileDto } from '@api/DTOs/shared';
import { ProductRepository } from '@application/domain/repositories';
import { FileStorageService } from '@application/domain/storage';
import { Product } from '@application/domain/entities';
import { ProductOutput } from '@application/usecases/types/product';

@Injectable()
export class CreateProductUseCase {
  constructor(
    private readonly categoryRepository: ProductRepository,
    private readonly fileStorageService: FileStorageService,
  ) {}

  async execute(
    clientId: string,
    input: CreateProductDto,
    file: FileDto,
  ): Promise<ProductOutput> {
    const path = await this.fileStorageService.upload({
      clientId,
      originalname: file.originalname,
      buffer: file.buffer,
      width: 390,
      height: 200,
    });
    const imageUrl = await this.fileStorageService.getUrl(path);

    const product = Product.create({
      name: input.name,
      description: input.description,
      price: input.price,
      ingredients: input.ingredients,
      categoryId: input.categoryId,
      clientId,
      imageUrl,
    });
    await this.categoryRepository.save(product);
    return product;
  }
}
