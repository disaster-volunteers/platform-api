import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "../users/entity/user";
import {UserRepository} from "../users/repository/user.repository";
import {UserService} from "../users/service/user.service";
import {UserController} from "../users/controller/user.controller";
import {Disaster} from "./entity/disaster";
import {DisasterRepository} from "./repository/disaster.repository";
import {DisasterType} from "./entity/disaster-type";
import {DisasterTypeRepository} from "./repository/disaster-type.repository";
import {DisasterService} from "./service/disaster.service";
import {DisasterController} from "./controller/disaster.controller";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Disaster, DisasterRepository,
            DisasterType, DisasterTypeRepository,
            User, UserRepository
        ])
    ],
    providers: [DisasterService, UserService],
    controllers: [DisasterController],
})
export class DisastersModule {}
