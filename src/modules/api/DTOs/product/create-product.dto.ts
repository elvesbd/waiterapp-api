import { ApiProperty } from '@nestjs/swagger';
import { FileDto } from '../shared';

export class CreateProductDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  ingredients?: string[];

  @ApiProperty()
  categoryId: string;

  @ApiProperty()
  file: FileDto;
}
