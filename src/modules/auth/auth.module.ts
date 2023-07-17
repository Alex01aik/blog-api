import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './guard/jwt.strategy';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthResolver } from './graphql/auth.resolver';
import { User } from '../user/graphql/user.entity';
import { UserService } from '../user/user.service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      useFactory: async () => ({
        secret: process.env.SECRET_KEY,
      }),
    }),
    TypeOrmModule.forFeature([User]),
  ],
  providers: [JwtStrategy, AuthService, UserService, AuthResolver],
  exports: [PassportModule, JwtModule],
})
export class AuthModule {}
