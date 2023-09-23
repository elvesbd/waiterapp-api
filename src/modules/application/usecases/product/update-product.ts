import { Injectable } from '@nestjs/common';
import { Input } from '@application/usecases/types/product';
import { ProductRepository } from '@application/domain/repositories';
import { ProductNotFoundException } from '@application/exceptions/product';
import { FileStorageService } from '@application/domain/storage';

@Injectable()
export class UpdateProductUseCase {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly fileStorageService: FileStorageService,
  ) {}

  async execute(id: string, input: Input): Promise<void> {
    const { clientId, file, name } = input;

    const product = await this.productRepository.getOne(id, clientId);
    if (!product) throw new ProductNotFoundException();

    if (!file) {
      const updatedProduct = {
        ...product,
        ...input,
      };
      await this.productRepository.update(id, updatedProduct);
      return;
    }

    const path = await this.fileStorageService.upload({
      clientId,
      originalname: name,
      buffer: file.buffer,
      width: 390,
      height: 200,
    });
    const imageUrl = await this.fileStorageService.getUrl(path);

    const updatedProduct = {
      ...product,
      imageUrl,
      ...input,
    };
    await this.productRepository.update(id, updatedProduct);
  }
}
