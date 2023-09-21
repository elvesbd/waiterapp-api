import { Controller, Get } from '@nestjs/common';
import { ResponseDto } from '@product/dto';
import { ProductApiPath } from '@product/controllers/constants';
import { GetAllProductsUseCase } from '@product/use-cases';

@Controller(ProductApiPath)
export class GetAllProductsController {
  constructor(private readonly getAllProductsUseCase: GetAllProductsUseCase) {}

  @Get()
  async handle(): Promise<ResponseDto[] | []> {
    return await this.getAllProductsUseCase.execute();
  }
}
