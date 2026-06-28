import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEmail,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';

import { Type } from 'class-transformer';


export class AssessmentListItemDto {
  @ApiProperty()
  slug: string;

  @ApiProperty()
  title: string;
}

export class AssessmentOptionDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  optionText: string;
}

export class AssessmentQuestionDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  question: string;

  @ApiProperty()
  weight: number;

  @ApiProperty({
    type: [AssessmentOptionDto],
  })
  options: AssessmentOptionDto[];
}

export class RolePlayQuestionDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  prompt: string;
}

export class AssessmentDetailsDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  slug: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  durationMinutes: number;

  @ApiProperty()
  passingScore: number;

  @ApiProperty({
    type: [AssessmentQuestionDto],
  })
  questions: AssessmentQuestionDto[];

  @ApiProperty({
    type: [RolePlayQuestionDto],
  })
  rolePlay: RolePlayQuestionDto[];
}

// export class SubmitAssessmentDto {
//   candidate: CandidateDto;

//   documents: DocumentsDto;

//   assessmentSlug: string;

//   mcqAnswers: McqAnswerDto[];

//   rolePlayAnswers: RolePlayAnswerDto[];
// }

export class CandidateDto {
  @IsString()
  fullName: string;

  @IsEmail()
  email: string;

  @IsString()
  phone: string;

  @IsOptional()
  @IsString()
  whatsapp?: string;

  @IsOptional()
  @IsString()
  residentialAddress?: string;

  @IsOptional()
  @IsString()
  gender?: string;

  @IsOptional()
  @IsString()
  stateOfOrigin?: string;

  @IsOptional()
  @IsString()
  currentLocation?: string;

  @IsOptional()
  @IsString()
  highestQualification?: string;

  @IsOptional()
  yearsOfExperience?: number;
}

export class DocumentsDto {
  @IsOptional()
  @IsString()
  photoUrl?: string;

  @IsOptional()
  @IsString()
  cvUrl?: string;

  @IsOptional()
  @IsString()
  driversLicenseUrl?: string;

  @IsOptional()
  @IsString()
  nyscUrl?: string;
}

export class McqAnswerDto {
  @IsUUID()
  questionId: string;

  @IsUUID()
  selectedOptionId: string;
}

export class RolePlayAnswerDto {
  @IsUUID()
  questionId: string;

  @IsString()
  answer: string;
}

export class SubmitAssessmentDto {
  // @ValidateNested()
  // @Type(() => CandidateDto)
  // candidate: CandidateDto;

  @ValidateNested()
  @Type(() => DocumentsDto)
  documents: DocumentsDto;

  @IsUUID()
  attemptId: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => McqAnswerDto)
  mcqAnswers: McqAnswerDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RolePlayAnswerDto)
  rolePlayAnswers: RolePlayAnswerDto[];
}

export class AssessmentQuestionResponseDto {
  id: string;

  order: number;

  category: string;

  question: string;

  weight: number;

  options: {
    id: string;

    text: string;
  }[];
}

export class RolePlayQuestionResponseDto {
  id: string;

  order: number;

  prompt: string;
}

export class AssessmentQuestionsResponseDto {
  assessmentId: string;

  title: string;

  durationMinutes: number;

  passingScore: number;

  totalQuestions: number;

  totalMarks: number;

  questions: AssessmentQuestionResponseDto[];
}

export class RolePlayQuestionsResponseDto {
  assessmentId: string;

  title: string;

  minimumCharacters: number;

  totalQuestions: number;

  questions: RolePlayQuestionResponseDto[];
}