import {Body, Controller, Get, Param, Patch, Post} from "@nestjs/common";
import {UserService} from "../service/user.service";
import {UserRequest} from "../payload/user.request";
import {UserResponse} from "../payload/user.response";
import {AuthPrincipal, Public} from "../../auth/decorator/auth.decorator";
import {AuthResponse} from "../../auth/payload/auth.response";
import {ProfileRequest} from "../payload/profile.request";

@Controller("/users")
export class UserController {
    constructor(
        private readonly userService: UserService,
    ) {
    }

    @Post()
    @Public()
    async register(@Body() userModel: UserRequest): Promise<UserResponse> {
        return this.userService.register(userModel);
    }

    @Get("/:id")
    @Public()
    async profile(@Param("id") id: number): Promise<UserResponse> {
        return this.userService.profile(id);
    }

    @Patch("/me")
    async edit(@AuthPrincipal() principlal: AuthResponse, model: ProfileRequest): Promise<UserResponse> {
        return this.userService.edit(principlal, model);
    }

    @Patch("/me/availability")
    async availability(@AuthPrincipal() principlal: AuthResponse): Promise<UserResponse> {
        return this.userService.availability(principlal);
    }
}
