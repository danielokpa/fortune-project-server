import { Module } from '@nestjs/common';
import { MailModule } from 'src/services/mail/mail.module';
import { TokenModule } from 'src/services/token/token.module';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './auth.service';
// import { CountriesModule } from '../countries/countries.module';
import { UsersModule } from '../users/users.module';
import { PatientsModule } from '../patients/patient.module';
// import { ClientDevicesModule } from '../client-devices/client-devices.module';

@Module({
  imports: [
    TokenModule,
    MailModule,
    // CountriesModule,
    UsersModule,
    PatientsModule,
    // ClientDevicesModule,
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [],
})
export class AuthModule {}
