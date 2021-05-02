import {Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import {Disaster} from "../../disasters/entity/disaster";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public username: string;

    @Column()
    public password: string;

    @Column()
    public name: string;

    @Column()
    public description: string;

    @Column()
    public available: boolean = false;

    @Column()
    public isAdmin: boolean = false;

    @ManyToMany(type => Disaster, disaster => disaster.volunteers)
    @JoinTable({name: "volunteers_disasters"})
    public attendedDisasters: Disaster[]
}
