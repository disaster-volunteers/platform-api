import {EntityRepository, Repository} from "typeorm";
import {Disaster} from "../entity/disaster";
import {DisasterType} from "../entity/disaster-type";

@EntityRepository(DisasterType)
export class DisasterTypeRepository extends Repository<DisasterType> {

}
