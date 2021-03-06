import {EntityRepository, Repository} from "typeorm";
import {User} from "../entity/user";

@EntityRepository(User)
export class UserRepository extends Repository<User> {

    async findByUsername(username: string): Promise<User> {
        return this.findOne({username});
    }
}
