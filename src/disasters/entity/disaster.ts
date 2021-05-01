import {Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {DisasterType} from "./disaster-type";
import {User} from "../../users/entity/user";

@Entity()
export class Disaster {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public coordinates: string;

    @ManyToOne(typeEntity => DisasterType, type => type.disaster)
    public type: DisasterType;

    @Column()
    public resolved: boolean = false;

    @Column()
    public description: string;

    @ManyToMany(type => User, user => user.attendedDisasters)
    public volunteers: User[]
}
