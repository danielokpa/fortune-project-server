import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
} from '@nestjs/common';
import type { Request } from 'express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResponseUtil } from 'src/utils/response.utils';
import {
  AppleOAuthLoginDto,
  AppleOAuthSignUpDto,
  GoogleOAuthLoginDto,
  GoogleOAuthSignUpDto,
} from '../dto/oauth.dto';
import { OAuthService } from '../services/oauth.service';

@ApiTags('Auth — OAuth')
@Controller('auth/oauth')
export class OAuthController {
  constructor(private readonly oauthService: OAuthService) {}

  // @Post('signup/google')
  // @HttpCode(HttpStatus.CREATED)
  // @ApiOperation({
  //   summary: 'Sign up with Google',
  //   description:
  //     'Verifies the Google ID token server-side, completes phone OTP verification, creates a USER with loginType GOOGLE, and stores a hash of the provider token in the password field (same pattern as existing social sign-up). Requires GOOGLE_OAUTH_CLIENT_ID.',
  // })
  // @ApiResponse({ status: HttpStatus.CREATED })
  // async signUpGoogle(@Body() input: GoogleOAuthSignUpDto) {
  //   const data = await this.oauthService.signUpWithGoogle(input);
  //   return ResponseUtil.handleResponse(
  //     data,
  //     'User created successfully',
  //     HttpStatus.CREATED,
  //   );
  // }

  // @Post('signup/apple')
  // @HttpCode(HttpStatus.CREATED)
  // @ApiOperation({
  //   summary: 'Sign up with Apple',
  //   description:
  //     'Verifies the Apple identity token server-side, completes phone OTP verification, creates a USER with loginType APPLE, and stores a hash of the provider token in the password field. Requires APPLE_OAUTH_CLIENT_ID (Apple Services ID).',
  // })
  // @ApiResponse({ status: HttpStatus.CREATED })
  // async signUpApple(@Body() input: AppleOAuthSignUpDto) {
  //   const data = await this.oauthService.signUpWithApple(input);
  //   return ResponseUtil.handleResponse(
  //     data,
  //     'User created successfully',
  //     HttpStatus.CREATED,
  //   );
  // }

  // @Post('login/google')
  // @HttpCode(HttpStatus.OK)
  // @ApiOperation({
  //   summary: 'Sign in with Google',
  //   description:
  //     'Verifies the Google ID token (JWKS), loads the user by email (loginType GOOGLE), applies the same new-device flow as `login-social` when `x-client-device-token` is sent, and returns an app JWT.',
  // })
  // @ApiResponse({ status: HttpStatus.OK })
  // async loginGoogle(
  //   @Body() input: GoogleOAuthLoginDto,
  //   @Req() req: Request,
  // ) {
  //   const data = await this.oauthService.loginWithGoogle(input, req);
  //   return ResponseUtil.handleResponse(
  //     data,
  //     'Login Successful',
  //     HttpStatus.OK,
  //   );
  // }

  // @Post('login/apple')
  // @HttpCode(HttpStatus.OK)
  // @ApiOperation({
  //   summary: 'Sign in with Apple',
  //   description:
  //     'Verifies the Apple identity token (JWKS), loads the user by email (loginType APPLE), optional `email` when Apple omits it on the token; same new-device behavior as other social login.',
  // })
  // @ApiResponse({ status: HttpStatus.OK })
  // async loginApple(
  //   @Body() input: AppleOAuthLoginDto,
  //   @Req() req: Request,
  // ) {
  //   const data = await this.oauthService.loginWithApple(input, req);
  //   return ResponseUtil.handleResponse(
  //     data,
  //     'Login Successful',
  //     HttpStatus.OK,
  //   );
  // }
}
