import {IsNotEmpty} from "class-validator";

export class DisasterRequest {
    @IsNotEmpty()
    public coordinates: string;

    @IsNotEmpty()
    public typeId: number;

    public description: string;
}
