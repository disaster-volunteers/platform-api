import {IsEmail, IsNotEmpty} from "class-validator";

export class UserRequest {

    @IsEmail()
    public username: string;

    @IsNotEmpty()
    public name: string;

    @IsNotEmpty()
    public password: string;

    @IsNotEmpty()
    public confirm: string;
}
