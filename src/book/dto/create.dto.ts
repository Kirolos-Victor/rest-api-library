import { Category } from '../book.schema';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  readonly title: string;
  @IsString()
  @IsOptional() //
  readonly description: string | null;
  @IsEnum(Category)
  readonly category: Category;
}
