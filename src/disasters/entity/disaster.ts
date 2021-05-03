import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DisasterType } from './disaster-type';
import { User } from '../../users/entity/user';

@Entity()
export class Disaster {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public dateStarted: Date;

  @Column()
  public coordinates: string;

  @ManyToOne(() => DisasterType, (type) => type.disaster, {
    eager: true,
  })
  public type: DisasterType;

  @Column({ nullable: false, default: false })
  public resolved: boolean;

  @Column()
  public description: string;

  @Column({ nullable: true })
  public essentials: string;

  @Column({ nullable: true })
  public finalMessage: string;

  @Column({ nullable: true })
  public dateResolved: Date;

  @Column({ nullable: false, default: 0 })
  public outerHelp: number;

  @ManyToMany((type) => User, (user) => user.attendedDisasters, { eager: true })
  public volunteers: User[];
}
