import { Provider, User as UserModel } from '@prisma/client';

export class AuthEntity implements UserModel {
  createdAt: Date;
  email: string;
  hash: string;
  hashedrf: string | null;
  id: string;
  updatedAt: Date;
  provider: Provider;
}
