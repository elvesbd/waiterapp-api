import { Injectable } from '@nestjs/common';
import { RequestDto } from '@api/DTOs/product';
import { FileDto } from '@api/DTOs/shared';
import { ProductRepository } from '@application/domain/repositories';

@Injectable()
export class CreateProductUseCase {
  constructor(private readonly categoryRepository: ProductRepository) {}

  async execute(input: RequestDto, file: FileDto): Promise<any> {
    return { input, file };
  }
}
