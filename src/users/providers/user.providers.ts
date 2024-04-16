import { DataSource } from "typeorm";
import { User } from "../entities/user.entity";
import { DATA_SOURCE } from "src/database/constants/database.constants";
import { USER_REPOSITORY } from "../constants/user.constants";

export const userProviders = [{
    provide: USER_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
    inject: [DATA_SOURCE],
}]