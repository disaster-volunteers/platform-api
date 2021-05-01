import {IsNotEmpty} from "class-validator";

export class EssentialsRequest {
    @IsNotEmpty()
    public essentials: string;
}
