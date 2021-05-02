import {User} from "../entity/user";

export class UserResponse {
    constructor(
        public id: number = 0,
        public username: string = '',
        public name: string = '',
        public decription: string = '',
        public available: boolean = false,

    ) {
    }

    public static fromUser(user: User) {
        return new UserResponse(
            user.id,
            user.username,
            user.name,
            user.description,
            user.available
        )
    }

}
