import {InjectRepository} from "@nestjs/typeorm";
import {User} from "../../users/entity/user";
import {UserRepository} from "../../users/repository/user.repository";
import {DisasterRepository} from "../repository/disaster.repository";
import {Disaster} from "../entity/disaster";
import {DisasterType} from "../entity/disaster-type";
import {DisasterTypeRepository} from "../repository/disaster-type.repository";
import {DisasterRequest} from "../payload/disaster.request";
import {DisasterResponse} from "../payload/disaster.response";
import {AuthResponse} from "../../auth/payload/auth.response";
import {UserService} from "../../users/service/user.service";
import {EssentialsRequest} from "../payload/essentials.request";
import {FinalMessageRequest} from "../payload/final-message.request";
import {DisasterTypeResponse} from "../payload/disaster-type.response";

export class DisasterService {
    constructor(
        private readonly userService: UserService,
        @InjectRepository(Disaster) private readonly disasterRepository: DisasterRepository,
        @InjectRepository(DisasterType) private readonly disasterTypeRepository: DisasterTypeRepository,
    ) {

    }

    async all(): Promise<DisasterResponse[]> {

        // const data = await this.disasterRepository
            // .createQueryBuilder("disaster")
            // .where("disaster.resolved = :resolvedFrom", {resolvedFrom})
            // .where("disaster.resolved = :resolvedTo", {resolvedTo})
            // .getMany();

        return (await this.disasterRepository.find()).map(d => DisasterResponse.fromDisaster(d)).sort((a, b) => b.dateStarted.getTime() - a.dateStarted.getTime());

    }

    async single(id: number): Promise<DisasterResponse> {
        return DisasterResponse.fromDisaster(await this.disasterRepository.findOne(id));
    }

    async types(): Promise<DisasterTypeResponse[]> {
        return (await this.disasterTypeRepository.find()).map(dt => new DisasterTypeResponse(dt.id, dt.name, dt.iconUrl));
    }

    async create(model: DisasterRequest): Promise<DisasterResponse> {
        const disaster = new Disaster();

        const disasterType = await this.disasterTypeRepository.findOne(model.typeId);

        disaster.coordinates = model.coordinates;
        disaster.description = model.description;
        disaster.dateStarted = new Date();
        disaster.type = disasterType;

        await this.disasterRepository.save(disaster);

        return DisasterResponse.fromDisaster(disaster);
    }

    async volunteer(userModel: AuthResponse, disasterId: number): Promise<DisasterResponse> {
        let disaster = await this.disasterRepository.findOne(disasterId);

        if (userModel) {
            disaster = await this.addVolunteer(userModel, disaster);
        } else {
            disaster = await DisasterService.incrementOuterHelp(disaster);
        }

        await this.disasterRepository.save(disaster);

        return DisasterResponse.fromDisaster(disaster);
    }

    async essentials(disasterId: number, essentialsModel: EssentialsRequest): Promise<DisasterResponse> {
        const disaster = await this.disasterRepository.findOne(disasterId);

        disaster.essentials = essentialsModel.essentials;

        await this.disasterRepository.save(disaster);

        return DisasterResponse.fromDisaster(disaster);
    }

    async resolve(disasterId: number, finalMessageModel: FinalMessageRequest): Promise<DisasterResponse> {
        const disaster = await this.disasterRepository.findOne(disasterId);

        disaster.resolved = true;
        disaster.dateResolved = new Date();
        disaster.finalMessage = finalMessageModel.message;

        await this.disasterRepository.save(disaster);

        return DisasterResponse.fromDisaster(disaster);
    }

    static incrementOuterHelp(disaster: Disaster): Disaster {
        disaster.outerHelp++;

        return disaster;
    }

    async addVolunteer(userModel: AuthResponse, disaster: Disaster) {
        const user = await this.userService.findByUsername(userModel.username);

        if (!disaster.volunteers) {
            disaster.volunteers = [];
        }

        disaster.volunteers.push(user);

        return disaster;
    }
}
