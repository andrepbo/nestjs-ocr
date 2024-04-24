import { DataSource } from "typeorm";
import { DATA_SOURCE } from "src/database/constants/database.constants";
import { USER_REPOSITORY } from "../../users/constants/user.constants";
import { UserSchema } from "../schemas/user.schema";

export const userProviders = [{
    provide: USER_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(UserSchema),
    inject: [DATA_SOURCE],
}]