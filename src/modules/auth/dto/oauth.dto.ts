import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsOptional,
  IsString,
  IsUUID,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

/** Google OAuth sign-up body (same profile fields as existing social sign-up). */
export class GoogleOAuthSignUpDto {
  @ApiProperty({
    description: 'Google ID token (JWT) from Sign-In',
  })
  @IsString()
  @MinLength(20)
  idToken: string;

  @ApiProperty({ description: 'Must match the email on the Google token' })
  @IsEmail()
  @MaxLength(320)
  email: string;

  @ApiProperty({
    description: 'Phone number (local part); normalized with country',
  })
  @IsString()
  @MaxLength(15)
  phoneNo: string;

  @IsString()
  @MaxLength(6)
  otpPhone: string;

  @ApiProperty({ description: 'Country UUID' })
  @IsUUID()
  country: string;

  @ApiProperty({ description: 'Full name' })
  @IsString()
  @MinLength(4)
  @MaxLength(150)
  @Matches(/^[A-Za-z _'-]+$/, {
    message:
      'Only letters, spaces, underscores, apostrophes, and hyphens are allowed in fullName field',
  })
  fullName: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @MaxLength(10)
  referalCode?: string;
}

/** Apple OAuth sign-up body. Email may be omitted when it only appears on the Apple token. */
export class AppleOAuthSignUpDto {
  @ApiProperty({ description: 'Apple identity token (JWT)' })
  @IsString()
  @MinLength(20)
  identityToken: string;

  @ApiProperty({
    required: false,
    description:
      'Optional when email is present on the token (Apple may omit email after first authorization)',
  })
  @IsOptional()
  @IsEmail()
  @MaxLength(320)
  email?: string;

  @ApiProperty({
    description: 'Phone number (local part); normalized with country',
  })
  @IsString()
  @MaxLength(15)
  phoneNo: string;

  @IsString()
  @MaxLength(6)
  otpPhone: string;

  @ApiProperty({ description: 'Country UUID' })
  @IsUUID()
  country: string;

  @ApiProperty({ description: 'Full name' })
  @IsString()
  @MinLength(4)
  @MaxLength(150)
  @Matches(/^[A-Za-z _'-]+$/, {
    message:
      'Only letters, spaces, underscores, apostrophes, and hyphens are allowed in fullName field',
  })
  fullName: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @MaxLength(10)
  referalCode?: string;
}

/** Google OAuth sign-in: authenticate with a valid Google ID token (JWKS-verified). */
export class GoogleOAuthLoginDto {
  @ApiProperty({
    description: 'Google ID token (JWT) from Sign-In',
  })
  @IsString()
  @MinLength(20)
  idToken: string;
}

/** Apple OAuth sign-in: authenticate with a valid Apple identity token (JWKS-verified). */
export class AppleOAuthLoginDto {
  @ApiProperty({ description: 'Apple identity token (JWT)' })
  @IsString()
  @MinLength(20)
  identityToken: string;

  @ApiProperty({
    required: false,
    description:
      'Optional when email is present on the token (Apple may omit email after first authorization)',
  })
  @IsOptional()
  @IsEmail()
  @MaxLength(320)
  email?: string;
}
