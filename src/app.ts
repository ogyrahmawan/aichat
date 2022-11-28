import 'dotenv/config';
import express from 'express';
import cors from 'cors'
import cron from 'node-cron';
import { errors, parser, responses } from './helpers';
import routes from './routes';
import { cronUpdateStockToExpired } from './logics/voucher';
import initMigration from './data/migrations';
import initSeeder from './data/seeds';

const app = express();

app.use(cors());
app.use(parser.jsonParser);
app.use(parser.urlencodedExtendedParser);


app.use('/v1/api/dashboard', routes);

// migrate 
const migrateAndSeed = async () => {
    await initMigration()
    await initSeeder()
}

migrateAndSeed()

// cron for update voucher reservation to expired
cron.schedule('*/1 * * * *', async () => {
    console.log('running cron update voucher reservation to expired');
    try {
        const totalVoucherReservation = await cronUpdateStockToExpired(100);
        console.log(`${totalVoucherReservation} voucher is expired`);
    } catch (error) {
        console.log(error);
    }
});

// Catch 404 and forward to error handler
app.use((_req, _res, next) => {
    next(
        errors.httpError.notFound(
            new errors.internalError.ResourceNotFoundError('URL'),
        ),
    );
});

app.use(
    (
        err: any,
        _req: express.Request,
        res: express.Response,
        _next: express.NextFunction,
    ) => {
        const appErrors = [];
        const data = err.errors || err;

        if (Array.isArray(data)) {
            for (let i = 0; i < data.length; i += 1) {
                appErrors.push(data[i].data);
            }
        } else {
            appErrors.push(data.data || data);
        }

        let { originalError } = err;

        if (appErrors[0] instanceof Error) {
            [originalError] = appErrors;
            appErrors.shift();
            const overidedError = new errors.internalError.UnknownError().data;
            appErrors.push(overidedError);
        }
        console.log(appErrors)

        responses.httpResponse.errorHandler(res, err.status || 500, {
            errors: appErrors,
            meta: { 'request-id': res.locals.requestId },
        });
    },
);

export default app;
