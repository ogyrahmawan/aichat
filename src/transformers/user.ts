import { IncomingHttpHeaders } from 'http';
import { UserType } from '../data/entity/user';

const transform = (each: UserType) => {
    const result = {
        id: each._id,
        username: each.username,
        role_id: each.role_id,
        role_name: each.role_name
    };

    return result;
};

const transformMany = (array: UserType[]) => array.map((each : UserType) => transform(each));

export { transform, transformMany };
