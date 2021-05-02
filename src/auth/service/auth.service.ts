import {Injectable, UnauthorizedException} from "@nestjs/common";
import {UserService} from "../../users/service/user.service";
import * as bcrypt from "bcrypt";
import {AuthRequest} from "../payload/auth.request";
import {JwtService} from "@nestjs/jwt";
import {AuthResponse} from "../payload/auth.response";
import {TokenResponse} from "../payload/token.response";

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) {
    }

    async validateUser(username: string, password: string): Promise<AuthResponse> {
        const user = await this.userService.findByUsername(username);
        if (user && bcrypt.compareSync(password, user.password)) {
            return new AuthResponse(user.id, user.username, user.name);
        }

        return null;
    }

    async login(userModel: AuthRequest) {
        const user = await this.validateUser(userModel.username, userModel.password);
        if (user === null) {
            throw new UnauthorizedException();
        }

        return new TokenResponse(
            this.jwtService.sign({
                id: user.id,
                username: user.username,
                name: user.name
            })
        );
    }
}
