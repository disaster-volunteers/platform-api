import {EntityRepository, Repository} from "typeorm";
import {Disaster} from "../entity/disaster";

@EntityRepository(Disaster)
export class DisasterRepository extends Repository<Disaster> {

}
