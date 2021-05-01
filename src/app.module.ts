import {Module} from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {UsersModule} from './users/users.module';
import {User} from "./users/entity/user";
import { AuthModule } from './auth/auth.module';
import {Connection} from "typeorm";
import {DisastersModule} from "./disasters/disasters.module";
import {DisasterType} from "./disasters/entity/disaster-type";
import {Disaster} from "./disasters/entity/disaster";

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: '',
            database: 'disaster-volunteers',
            entities: [
                User,
                Disaster,
                DisasterType
            ],
            synchronize: true,
        }),
        UsersModule,
        AuthModule,
        DisastersModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
    constructor(private readonly connection: Connection) {
    }
}
