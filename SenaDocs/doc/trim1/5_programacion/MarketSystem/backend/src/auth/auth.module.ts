import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { UsersModule } from '../users/users.module';
import { OwnerModule } from '../owner/owner.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';
import config from 'src/config';
import { LocalStrategy } from './strategys/local.strategy';
import { JwtStrategy } from './strategys/jwt.strategy';

@Module({
  imports: [
    UsersModule,
    OwnerModule,
    JwtModule.registerAsync({
      inject: [config.KEY],
      // imports: [ConfigModule],
      useFactory: async (configService: ConfigType<typeof config>) => {
        return {
          secret: configService.auth.jwtSecret,
          signOptions: {
            expiresIn: '1d',
          },
        };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
