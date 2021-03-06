import { UserResponse } from '../../users/payload/user.response';
import { Disaster } from '../entity/disaster';
import { DisasterTypeResponse } from './disaster-type.response';

export class DisasterResponse {
  constructor(
    public id: number = 0,
    public coordinates: string = '',
    public dateStarted: Date = new Date(),
    public type: DisasterTypeResponse = null,
    public resolved: boolean = false,
    public description: string = '',
    public essentials: string = '',
    public finalMessage: string = '',
    public dateResolved: Date = new Date(),
    public volunteers: UserResponse[] = [],
    public outerHelp: number = 0,
  ) {}

  public static fromDisaster(disaster: Disaster) {
    return new DisasterResponse(
      disaster.id,
      disaster.coordinates,
      disaster.dateStarted,
      new DisasterTypeResponse(
        disaster.type.id,
        disaster.type.name,
        disaster.type.iconUrl,
      ),
      disaster.resolved,
      disaster.description,
      disaster.essentials,
      disaster.finalMessage,
      disaster.dateResolved,
      disaster.volunteers
        ? disaster.volunteers.map(
            (v) =>
              new UserResponse(
                v.id,
                v.username,
                v.name,
                v.description,
                v.available,
              ),
          )
        : [],
      disaster.outerHelp,
    );
  }
}
