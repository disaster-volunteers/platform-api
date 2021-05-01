import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Disaster} from "./disaster";

@Entity()
export class DisasterType {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public name: string;

    @Column()
    public iconUrl: string;

    @OneToMany(type => Disaster, disaster => disaster.type)
    public disaster: Disaster
}
