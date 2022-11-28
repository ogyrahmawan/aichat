import { Router } from 'express';
import { customerController } from '../controllers';

export default (routes: Router) => {
    routes.get(
        '/check-eligible', customerController.checkEligableGetVoucherController,
    );

    routes.put(
        '/check-uploaded-photo/:id', customerController.checkUploadedPhotoController,
    );
};
