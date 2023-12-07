import {OmitType} from "@nestjs/mapped-types";
import {AuthEntity} from "../entities/auth.entity";

export class CreateAuthDto extends OmitType(AuthEntity,['id','createdAt','hashedrf','updatedAt']){}
