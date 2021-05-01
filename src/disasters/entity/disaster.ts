import {Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {DisasterType} from "./disaster-type";
import {User} from "../../users/entity/user";

@Entity()
export class Disaster {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public dateStarted: Date;

    @Column()
    public coordinates: string;

    @ManyToOne(typeEntity => DisasterType, type => type.disaster, {eager: true})
    public type: DisasterType;

    @Column()
    public resolved: boolean = false;

    @Column()
    public description: string;

    @Column()
    public essentials: string;

    @Column()
    public finalMessage: string;

    @Column()
    public dateResolved: Date;

    @Column()
    public outerHelp: number = 0;

    @ManyToMany(type => User, user => user.attendedDisasters, {eager: true})
    public volunteers: User[]
}
