import {ForbiddenException, Injectable} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import {PrismaService} from "../prisma/prisma.service";
import * as bcrypt from 'bcrypt';
import {JwtService} from "@nestjs/jwt";
import {Tokens} from "./types/tokens.type";
import { v4 as uuidv4 } from 'uuid';
import * as argon from 'argon2';

@Injectable()
export class AuthService {
  constructor(private readonly prismaservice:PrismaService,private Jwtservice:JwtService) {
  }
  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  }
  async getToken(UserId:string,email:string):Promise<Tokens>{
      const [at,rt]=await Promise.all([
          this.Jwtservice.signAsync(
              {
                  sub:UserId,
                  email:email,
              },
              {
                  secret:'AT_SECRET',
                  expiresIn: '1h'
              },
              ),
          this.Jwtservice.signAsync(
              {
                  sub:UserId,
                  email:email,
              },
              {
                  secret:'RT_SECRET', expiresIn: '5d'
              },),

      ])
    return {
        access_token: at,
        refresh_token: rt
    }
}
  async updateRtHash(userId: string, rt: string): Promise<void> {
        const hash = await argon.hash(rt);
        await this.prismaservice.user.update({
            where: {
                id: userId,
            },
            data: {
                hashedrf: hash,
            },
        });
    }
  async signupLocal(dto: CreateAuthDto):Promise<Tokens> {
    const hash = await argon.hash(dto.hash);
      try {
          const newUser = await this.prismaservice.user.create({
              data: {
                  id: uuidv4(),
                  email: dto.email,
                  hash,
              },
          });
          const tokens = await this.getToken(newUser.id, newUser.email);
          await  this.updateRtHash(newUser.id,tokens.refresh_token);
          return tokens;
      } catch (error) {
          console.error('Error creating user:', error);
          throw new Error('Failed to create user.');
      }
  }
  async signinLocal(dto:CreateAuthDto):Promise<Tokens> {
      const user=await this.prismaservice.user.findUnique({
          where: {
              email:dto.email
          },
      })
      if(!user) throw new ForbiddenException("email error")
      const passwordcompar=await argon.verify(user.hash,dto.hash);
      if(!passwordcompar) throw new ForbiddenException("password is not valid");

      const tokens=await this.getToken(user.id,user.email);
      await this.updateRtHash(user.id,tokens.refresh_token);
      return tokens;
  }
  async logout(userId:string):Promise<boolean> {
      await this.prismaservice.user.updateMany({
          where: {
              id:userId,
              hashedrf:{
                  not:null,
              }
          },
          data:{
              hashedrf:null,
          },
      });
      return true;
  }
  async refrshToken(userId:string,rt :string):Promise<Tokens> {
      const user = await this.prismaservice.user.findUnique({
          where: {
              id: userId,
          },
      });
      if (!user || !user.hashedrf) throw new ForbiddenException('Access Denied');

      const rtMatches = await argon.verify(user.hashedrf, rt);
      if (!rtMatches) throw new ForbiddenException('Access Denied');

      const tokens = await this.getToken(user.id, user.email);
      await this.updateRtHash(user.id, tokens.refresh_token);

      return tokens;
  }
}
