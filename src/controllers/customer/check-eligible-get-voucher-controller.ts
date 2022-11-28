import { Request, Response } from 'express';
import { errors, responses, utilities } from '../../helpers';
import { customerLogic } from '../../logics';
import { CheckEligebleQuery } from '../../types/customer';


const index = async (req: Request<unknown, unknown, unknown, CheckEligebleQuery>, res : Response) => {
    const { query } = req;

    const result = await customerLogic.checkEliebleCustomer(query.customer_id);
    responses.httpResponse.ok(res, 'Success get eligble customer', result);
};

export default utilities.controllerWrapper(index);
