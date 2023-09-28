import { ProductRepository } from '@application/domain/repositories';
import { FileStorageService } from '@application/domain/storage';
import { ProductNotFoundException } from '@application/exceptions/product';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DeleteProductUseCase {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly fileStorageService: FileStorageService,
  ) {}

  async execute(id: string, clientId: string): Promise<void> {
    const product = await this.productRepository.getOne(id, clientId);
    if (!product) throw new ProductNotFoundException();

    await this.fileStorageService.remove(product.imageUrl);
    await this.productRepository.delete(product.id);
  }
}
