import {Body, Controller, Post} from "@nestjs/common";
import {UserRequest} from "../../users/payload/user.request";
import {AuthResponse} from "../payload/auth.response";
import {UserService} from "../../users/service/user.service";
import {AuthService} from "../service/auth.service";
import {AuthRequest} from "../payload/auth.request";
import {TokenResponse} from "../payload/token.response";
import {Public} from "../decorator/auth.decorator";

@Controller("/auth")
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ) {

    }

    @Post()
    @Public()
    async login(@Body() authModel: AuthRequest): Promise<TokenResponse> {
        return this.authService.login(authModel);
    }
}
