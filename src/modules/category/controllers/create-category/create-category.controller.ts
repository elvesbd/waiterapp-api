import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ResponseDto, FileDto } from '@category/dto';
import { CreateCategoryUseCase } from '@category/use-cases';
import { CategoryApiPath } from '@category/controllers/constants';
import { FileInterceptor } from '@nestjs/platform-express';
@Controller(CategoryApiPath)
export class CreateCategoryController {
  constructor(private readonly createCategoryUseCase: CreateCategoryUseCase) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async handle(
    @Body('name') name: string,
    @UploadedFile() file: FileDto,
  ): Promise<ResponseDto> {
    return await this.createCategoryUseCase.execute(name, file);
  }
}
