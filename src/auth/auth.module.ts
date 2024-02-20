import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from '../prisma/prisma.service';
import { AtStrategy, RtStrategy } from './Strategies';
import { JwtModule } from '@nestjs/jwt';
import { GoogleStrategy } from './Strategies/google.strategy';

@Module({
  imports: [JwtModule.register({})],
  controllers: [AuthController],
  providers: [
    AuthService,
    PrismaService,
    AtStrategy,
    RtStrategy,
    GoogleStrategy,
  ],
})
export class AuthModule {}
