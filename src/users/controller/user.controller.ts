import {Body, Controller, Post} from "@nestjs/common";

import {User} from "../entity/User";
import {UserService} from "../service/user.service";
import {UserRequest} from "../payload/user.request";
import {UserResponse} from "../payload/user.response";

@Controller("/users")
export class UserController {
    constructor(
        private readonly userService: UserService,
    ) {
    }

    @Post()
    async register(@Body() userModel: UserRequest): Promise<UserResponse> {
        return this.userService.register(userModel);
    }
}
