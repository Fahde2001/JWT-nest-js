import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import {JwtPayload} from '../types/jwtPayload.type';
import { ExtractJwt, Strategy } from 'passport-jwt';


@Injectable()
export class AtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: "AT_SECRET",
        });
    }

    validate(payload: JwtPayload) {
        console.log('Received payload:', payload);
        return payload;
    }
}
