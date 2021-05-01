import {Body, Controller, Post} from "@nestjs/common";

import {User} from "../entity/User";
import {UserService} from "../service/user.service";
import {UserRequest} from "../payload/user.request";
import {UserResponse} from "../payload/user.response";
import {Public} from "../../auth/decorator/auth.decorator";

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
}
