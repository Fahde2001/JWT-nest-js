import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import {AtGuard} from "./common/guards";
import {APP_GUARD} from "@nestjs/core";
import {ConfigModule} from "@nestjs/config";

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }),PrismaModule, AuthModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
  ],
})
export class AppModule {}
