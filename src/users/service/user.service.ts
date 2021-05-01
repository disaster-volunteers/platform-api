import {User} from "../entity/user";
import * as bcrypt from "bcrypt";
import {InjectRepository} from "@nestjs/typeorm";
import {UserRepository} from "../repository/user.repository";
import {UserRequest} from "../payload/user.request";
import {UserAlreadyExistsError} from "../error/user-already-exists.error";
import {PasswordsMismatchError} from "../error/passwords-mismatch.error";
import {UserResponse} from "../payload/user.response";
import {Injectable} from "@nestjs/common";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private readonly userRepository: UserRepository,
    ) {

    }

    async register(model: UserRequest): Promise<UserResponse> {
        if (await this.userRepository.findByUsername(model.username)) {
            throw new UserAlreadyExistsError();
        }

        if (model.password !== model.confirm) {
            throw new PasswordsMismatchError();
        }

        model.password = bcrypt.hashSync(model.password, 10);

        const user = await this.userRepository.save(Object.assign(new User(), model));

        await this.userRepository.save(user);

        return new UserResponse(user.username, user.name, user.available);
    }

    async findByUsername(username: string): Promise<User> {
        return this.userRepository.findByUsername(username);
    }
}
