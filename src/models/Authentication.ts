import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { UserItem } from './../db/models/Users';

export type TokenItem = Omit<UserItem, 'password' | 'createdAt' | 'updatedAt'>;

export class Authentication {
  private secret: string;
  private expiresIn: string;

  constructor(secret?: string, expiresIn?: string) {
    this.secret = secret || process.env.JWT_SECRET || '12345678';
    this.expiresIn = expiresIn || process.env.JWT_EXPIRES_IN || '1m';
  }

  public passwordHash(password: string) {
    return bcrypt.hash(password, 10);
  }

  public passwordCompare(password: string | Buffer, encryptedPassword: string) {
    return bcrypt.compare(password, encryptedPassword)
  }

  public generateToken(payload: TokenItem, secret?: string) {
    return jwt.sign(
      payload,
      secret || this.secret,
      { expiresIn: this.expiresIn }
    )
  }

  public validateToken(token: string, secret?: string) {
    try {
      return jwt.verify(token, secret || this.secret);
    } catch (error) {
      return false;
    }
  }
}
