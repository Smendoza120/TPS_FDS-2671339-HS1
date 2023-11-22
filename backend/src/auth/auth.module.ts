import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './services/auth.service';
import { EmailService } from './services/email.service';
import { localStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthController } from './controllers/auth.controller';
import { MsModule } from 'src/ms/ms.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: () => {
        return {
          secret: process.env.API_CONFIG_AUTH_SECRET_JWT,
          signOptions: { expiresIn: process.env.API_CONFIG_AUTH_DURATION_JWT },
        };
      },
    }),
    PassportModule,
    MsModule,
  ],
  providers: [AuthService, localStrategy, JwtStrategy, EmailService],
  controllers: [AuthController],
})
export class AuthModule {}
