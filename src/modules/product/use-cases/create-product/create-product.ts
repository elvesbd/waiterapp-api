import { Injectable } from '@nestjs/common';
import { FileDto, RequestDto } from '@product/dto';
import { ProductRepository } from '@product/infra/repository';
import { ProductFileStorageService } from '@product/infra/storage';

@Injectable()
export class CreateProductUseCase {
  constructor(
    private readonly categoryRepository: ProductRepository,
    private readonly productFileStorageService: ProductFileStorageService,
  ) {}

  async execute(input: RequestDto, file: FileDto): Promise<any> {
    return { input, file };
  }
}
