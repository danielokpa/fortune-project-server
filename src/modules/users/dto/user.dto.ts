import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  IsPhoneNumber,
  Max,
  Min,
  IsInt,
  isUUID,
  IsUrl,
} from 'class-validator';
import { Type, Transform } from 'class-transformer';
import { UserType } from 'src/enums';

export class DashboardDto {
  @IsString()
  deviceFCMToken: string;

  @IsString()
  @IsOptional()
  name?: string;
}

export class UpdateImageUrlDto {
  @IsString()
  // @IsUrl()
  imageUrl: string;
}

export class UpdateUserDto {
  @ApiPropertyOptional()
  @IsString()
  firstName?: string;
  
  @ApiPropertyOptional()
  @IsString()
  lastName?: string;

  @ApiPropertyOptional()
  @IsPhoneNumber()
  phoneNo?: string
}

export class GetUsersDto {
  @ApiPropertyOptional({
    description: 'Cursor for pagination',
  })
  @IsOptional()
  cursor?: string;

  @ApiPropertyOptional({
    description: 'Number of records to fetch',
    default: 20,
  })
  @Type(() => Number)
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(100)
  limit = 20;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  search?: string;
}