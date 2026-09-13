import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, Min, MinLength } from 'class-validator';

export class CreateCourseDto {
  @ApiProperty({ example: 'CSC 401' })
  @IsString()
  @MinLength(3)
  courseCode: string;

  @ApiProperty({ example: 'Software Engineering' })
  @IsString()
  @MinLength(3)
  title: string;

  @ApiProperty({ example: 3 })
  @IsInt()
  @Min(1)
  unitLoad: number;
}

export class EnrollStudentDto {
  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsInt()
  studentId?: number;

  @ApiPropertyOptional({ example: 'CS/2021/001' })
  @IsOptional()
  @IsString()
  matricNumber?: string;

  @ApiProperty({ example: '2024/2025' })
  @IsString()
  academicSession: string;
}
