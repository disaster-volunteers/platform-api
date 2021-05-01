import {PassportStrategy} from "@nestjs/passport";
import {ExtractJwt, Strategy} from "passport-jwt";
import {Injectable} from "@nestjs/common";
import {AuthService} from "./auth.service";
import {AuthResponse} from "../payload/auth.response";

@Injectable()
export class JWTAuthStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'rijkomrusnagaad@!@!@',
        });
    }

    async validate(payload: AuthResponse): Promise<AuthResponse> {
        return payload;
    }
}
