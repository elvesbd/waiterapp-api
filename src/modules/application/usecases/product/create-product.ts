import { Injectable } from '@nestjs/common';
import { CreateProductDto, OutputDto } from '@api/DTOs/product';
import { FileDto } from '@api/DTOs/shared';
import { ProductRepository } from '@application/domain/repositories';
import { FileStorageService } from '@application/domain/storage';
import { Product } from '@application/domain/entities';

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
  ): Promise<OutputDto> {
    const path = await this.fileStorageService.upload({
      clientId,
      originalname: input.name,
      buffer: file.buffer,
      width: 390,
      height: 200,
    });
    const imageUrl = await this.fileStorageService.getUrl(path);

    const product = new Product({
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
