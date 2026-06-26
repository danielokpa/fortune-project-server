import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { 
  IsEmail, 
  IsNotEmpty, 
  IsOptional, 
  IsString, 
  IsPhoneNumber, 
  IsDate, 
  IsNumber,
  IsUUID,
  ValidateNested,
  Min, 
  IsUrl 
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateCandidateDto {
  @ApiProperty({ 
    description: 'The full name of the candidate', 
    example: 'John Doe' 
  })
  @IsString({ message: 'Full name must be a valid text string' })
  @IsNotEmpty({ message: 'Full name is required and cannot be empty' })
  fullName: string;

  @ApiProperty({ 
    description: 'The primary email address of the candidate', 
    example: 'john.doe@example.com' 
  })
  @IsEmail({}, { message: 'Please provide a valid email address' })
  @IsNotEmpty({ message: 'Email address is required' })
  email: string;

  @ApiProperty({ 
    description: 'The primary contact phone number (include country code)', 
    example: '+2348012345678' 
  })
  @IsPhoneNumber(null, { message: 'Phone number must be valid and include country code' })
  @IsNotEmpty({ message: 'Phone number is required' })
  phone: string;

  @ApiPropertyOptional({ 
    description: 'The WhatsApp contact number if different from primary phone', 
    example: '+2348012345678' 
  })
  @IsOptional()
  @IsPhoneNumber(null, { message: 'WhatsApp number must be a valid phone number' })
  whatsapp?: string;

  @ApiProperty({ 
    description: 'The physical residential address of the candidate', 
    example: '123 Innovation Way, Lagos, Nigeria' 
  })
  @IsString({ message: 'Residential address must be a text string' })
  residentialAddress: string;

  @ApiProperty({ 
    description: 'The gender identity of the candidate', 
    example: 'Male' 
  })
  @IsString({ message: 'Gender must be a text string' })
  gender: string;

  @ApiProperty({ 
    description: 'The date of birth of the candidate', 
    example: '1995-08-15T00:00:00.000Z' 
  })
  @Type(() => Date)
  @IsDate({ message: 'Date of birth must be a valid ISO date format' })
  dateOfBirth: Date;

  @ApiProperty({ 
    description: 'The state or region of origin for the candidate', 
    example: 'Cross River State' 
  })
  @IsString({ message: 'State of origin must be a text string' })
  stateOfOrigin: string;

  @ApiPropertyOptional({ 
    description: 'The current city or state where the candidate resides', 
    example: 'Calabar' 
  })
  @IsOptional()
  @IsString({ message: 'Current location must be a text string' })
  currentLocation: string;

  @ApiProperty({ 
    description: 'The highest educational degree attained by the candidate', 
    example: 'Bachelor of Science in Computer Science' 
  })
  @IsString({ message: 'Highest qualification must be a text string' })
  highestQualification: string;

  @ApiPropertyOptional({ 
    description: 'Total number of years of relevant work experience', 
    example: 3 
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { message: 'Years of experience must be a number' })
  @Min(0, { message: 'Years of experience cannot be a negative value' })
  yearsOfExperience?: number;

  @ApiProperty({
    description: 'Candidate documents'
  })
  @ValidateNested()
  @Type(() => DocumentsDto)
  candidateDocuments: DocumentsDto;

  @ApiProperty({
    description: 'Job candidate is applying for',
  })
  @IsUUID()
  jobId: string;
}

export class DocumentsDto {
  @ApiPropertyOptional({ 
    description: 'Secure cloud URL pointing to the candidate passport photograph', 
    example: 'https://provider.com' 
  })
  @IsOptional()
  @IsUrl({}, { message: 'Photo URL must be a valid secure web link' })
  photoUrl?: string;

  @ApiPropertyOptional({ 
    description: 'Secure cloud URL pointing to the candidate curriculum vitae (CV)', 
    example: 'https://provider.com' 
  })
  @IsOptional()
  @IsUrl({}, { message: 'CV URL must be a valid secure web link' })
  cvUrl?: string;

  @ApiPropertyOptional({ 
    description: 'Secure cloud URL pointing to the candidate driver license document', 
    example: 'https://provider.com' 
  })
  @IsOptional()
  @IsUrl({}, { message: 'Drivers license URL must be a valid secure web link' })
  driversLicenseUrl?: string;

  @ApiPropertyOptional({ 
    description: 'Secure cloud URL pointing to the candidate NYSC discharge or exemption certificate', 
    example: 'https://provider.com' 
  })
  @IsOptional()
  @IsUrl({}, { message: 'NYSC certificate URL must be a valid secure web link' })
  nyscUrl?: string;
}
