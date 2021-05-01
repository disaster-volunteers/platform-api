import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "../users/entity/user";
import {UserRepository} from "../users/repository/user.repository";
import {UserService} from "../users/service/user.service";
import {AuthService} from "./service/auth.service";
import {AuthController} from "./controller/auth.controller";
import {JwtModule} from "@nestjs/jwt";
import {UsersModule} from "../users/users.module";

@Module({
    imports: [
        JwtModule.register({
            secret: 'rijkomrusnagaad@!@!@',
            signOptions: {expiresIn: '168h'},
        }),
        TypeOrmModule.forFeature([
            User, UserRepository
        ])
    ],
    providers: [UserService, AuthService, JwtModule],
    controllers: [AuthController]
})
export class AuthModule {}
