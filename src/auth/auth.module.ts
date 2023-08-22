import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { LoacalAuthGuard } from './guards/local-auth.guard';
import { AuthController } from './auth.controller';
import { HashingService } from './hashing/hashing.service';
import { JwtModule } from '@nestjs/jwt';
import config from 'src/config/config';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { PrismaClient } from '@prisma/client';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: config.jwtSecret,
      signOptions: { expiresIn: config.jwtExpiresIn },
    })
  ],
  providers: [
    HashingService,
    AuthService,
    LocalStrategy,
    LoacalAuthGuard,
    JwtStrategy,
    JwtAuthGuard,
    PrismaClient
  ],
  controllers: [AuthController],
  exports: [HashingService, AuthService]
})
export class AuthModule {}
