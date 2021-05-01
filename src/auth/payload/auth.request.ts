import {IsEmail, IsNotEmpty} from "class-validator";

export class AuthRequest {
    @IsEmail()
    public username: string;

    @IsNotEmpty()
    public password: string;
}
