import { Controller, Get } from '@nestjs/common';
import { CategoryOutputDto } from '@category/dto';
import { GetAllCategoriesUseCase } from '@category/use-cases';
import { CategoryApiPath } from '@category/controllers/constants';

@Controller(CategoryApiPath)
export class GetAllCategoriesController {
  constructor(
    private readonly findCategoriesUseCase: GetAllCategoriesUseCase,
  ) {}

  @Get()
  async handle(): Promise<CategoryOutputDto[] | []> {
    return await this.findCategoriesUseCase.execute();
  }
}
