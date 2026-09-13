import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsObject, IsOptional, IsString, Min } from 'class-validator';

export class OpenSessionDto {
  @ApiProperty()
  @IsInt()
  @Min(1)
  courseId: number;

  @ApiPropertyOptional({ description: 'QR lifetime in seconds', default: 120 })
  @IsOptional()
  @IsInt()
  @Min(30)
  ttlSeconds?: number;
}

export class MarkPinDto {
  @ApiProperty()
  @IsString()
  qrToken: string;

  @ApiProperty({ example: '1234' })
  @IsString()
  pin: string;
}

export class QrTokenDto {
  @ApiProperty()
  @IsString()
  qrToken: string;
}

export class WebAuthnVerifyDto {
  @ApiProperty()
  @IsString()
  qrToken: string;

  @ApiProperty({ description: 'WebAuthn credential response JSON' })
  @IsObject()
  credential: Record<string, unknown>;
}
