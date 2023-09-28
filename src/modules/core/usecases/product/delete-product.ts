import { Injectable } from '@nestjs/common';
import { FileStorageService } from '@core/domain/storage';
import { ProductRepository } from '@core/domain/repositories';
import { ProductNotFoundException } from '@core/exceptions/product';

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
