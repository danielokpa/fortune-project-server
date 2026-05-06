import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsString, MaxLength, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { CivilServantInstallmentVerificationStatus } from 'src/enums/civil-servant-installment-verification-status.enum';

export class CreateCivilServantInstallmentUserInfoDto {
  @ApiProperty({ example: 'Jane Doe' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  fullName: string;

  @ApiProperty({
    description: 'ID card document URL or storage key',
    example: 'https://cdn.example.com/docs/id-card.pdf',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(1024)
  idCard: string;

  @ApiProperty({
    description: 'Pay slip document URL or storage key',
    example: 'https://cdn.example.com/docs/payslip.pdf',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(1024)
  paySlip: string;

  @ApiProperty({ example: 450000.5 })
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  salary: number;
}

export class UpdateCivilServantInstallmentUserInfoDto extends PartialType(
  CreateCivilServantInstallmentUserInfoDto,
) {}

export class UpdateCivilServantInstallmentStatusDto {
  @ApiProperty({
    enum: CivilServantInstallmentVerificationStatus,
    example: CivilServantInstallmentVerificationStatus.VERIFIED,
  })
  @IsEnum(CivilServantInstallmentVerificationStatus)
  status: CivilServantInstallmentVerificationStatus;
}
