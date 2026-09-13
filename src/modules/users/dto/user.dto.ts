import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import {
  IsEmail,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class GetUsersDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  cursor?: string;

  @ApiPropertyOptional({ default: 20 })
  @IsOptional()
  @IsInt()
  @Min(1)
  limit: number = 20;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({ enum: Role })
  @IsOptional()
  @IsEnum(Role)
  role?: Role;
}

export class CreateLecturerDto {
  @ApiProperty({ example: 'Dr Jane Lecturer' })
  @IsString()
  @MinLength(3)
  @MaxLength(150)
  fullName: string;

  @ApiProperty({ example: 'jane.lecturer@unical.edu.ng' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Lecturer123!' })
  @IsString()
  @MinLength(8)
  password: string;
}

export class CreateStudentDto {
  @ApiProperty({ example: 'John Student' })
  @IsString()
  @MinLength(3)
  @MaxLength(150)
  fullName: string;

  @ApiProperty({ example: 'john.student@unical.edu.ng' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Student123!' })
  @IsString()
  @MinLength(8)
  password: string;

  @ApiProperty({ example: 'CS/2021/001' })
  @IsString()
  matricNumber: string;

  @ApiProperty({ example: 'Computer Science' })
  @IsString()
  department: string;

  @ApiPropertyOptional({ example: '1234' })
  @IsOptional()
  @IsString()
  @MinLength(4)
  pin?: string;
}

export class UpdateUserDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MinLength(3)
  fullName?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsEmail()
  email?: string;
}
