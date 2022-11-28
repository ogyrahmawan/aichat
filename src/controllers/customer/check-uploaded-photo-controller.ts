import { Response } from 'express';
import { errors, responses, utilities } from '../../helpers';
import { customerLogic } from '../../logics';
import { UploadPhotoReqBodyType } from '../../types/customer';
import { TypedCustomeRequest, TypedParamsWithId } from '../../types/other';

const index = async (req: TypedCustomeRequest<UploadPhotoReqBodyType, TypedParamsWithId>, res : Response) => {
    const { params, body } = req

    if (!body.image) throw new errors.internalError.InCompleteKeyError('image is required');
    if (!utilities.isString(body.image)) throw new errors.internalError.InvalidTypeError('image must be string');

    if (!(Number(params.id))) throw new errors.internalError.InCompleteKeyError('id in params is required and must be a number');
    
    const result = await customerLogic.checkUploadPhoto(body, +params.id);
    responses.httpResponse.ok(res, 'Success checking uploaded photo', result);
};

export default utilities.controllerWrapper(index);
