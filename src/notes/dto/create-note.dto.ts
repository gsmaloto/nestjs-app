import { Type } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsBoolean,
  IsOptional,
  MinLength,
  MaxLength,
  IsMongoId,
  IsDate,
} from 'class-validator';

export class CreateNoteDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(50)
  title: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  content: string;

  @IsBoolean()
  @IsOptional()
  isArchived: boolean;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  reminder: Date;

  @IsString()
  @IsNotEmpty()
  @IsMongoId()
  createdBy: string;
}
