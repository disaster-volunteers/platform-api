import {IsNotEmpty} from "class-validator";

export class FinalMessageRequest {
    @IsNotEmpty()
    public message: string;
}
