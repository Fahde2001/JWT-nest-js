import {Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, UseGuards, Req} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import {Tokens} from "./types/tokens.type";
import {AuthGuard} from "@nestjs/passport";
import {GetCurrentUserId, Public} from "../common/decorators";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}


  @Public()
  @Post('local/signup')
  @HttpCode(HttpStatus.CREATED)
  signupLocal(@Body() dto: CreateAuthDto): Promise<Tokens> {
    return this.authService.signupLocal(dto);
  }

  @Public()
  @Post('local/signin')
  @HttpCode(HttpStatus.OK)
  signinLocal(@Body() dto: CreateAuthDto): Promise<Tokens> {
    return this.authService.signinLocal(dto);
  }




  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(@GetCurrentUserId() UserId: string): Promise<boolean> {
    return this.authService.logout(UserId);
  }
/*
  @Public()
  @UseGuards(RtGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  refreshTokens(
      @GetCurrentUserId() userId: number,
      @GetCurrentUser('refreshToken') refreshToken: string,
  ): Promise<Tokens> {
    return this.authService.refreshTokens(userId, refreshToken);
  }
  }*/


}
