import { Body, Controller, Post, UploadedFile } from '@nestjs/common';
import { ProductApiPath } from '@product/controllers/constants';
import { FileDto, RequestDto, ResponseDto } from '@product/dto';
import { CreateProductUseCase } from '@product/use-cases';

@Controller(ProductApiPath)
export class CreateProductController {
  constructor(private readonly createProductUseCase: CreateProductUseCase) {}

  @Post()
  async handle(
    @Body() requestDto: RequestDto,
    @UploadedFile() file: FileDto,
  ): Promise<ResponseDto> {
    return await this.createProductUseCase.execute(requestDto, file);
  }
}
