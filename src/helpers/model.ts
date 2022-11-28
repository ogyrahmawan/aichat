// The guts of a model that uses Knexjs to store and retrieve data from a
// database using the provided `knex` instance. Custom functionality can be
// composed on top of this set of common guts.
//
// The idea is that these are the most-used types of functions that most/all
// "models" will want to have. They can be overriden/modified/extended if
// needed by composing a new object out of the one returned by this function ;)
 import { Knex } from 'knex';

export default ({
    knex = {} as Knex,
    name = 'name',
    tableName = 'tablename',
    selectableProps = [] as string[],
    timeout = 5000,
}) => {
    const create = (trx: Knex.Transaction | null = null, properties?: any) => {
        const props = properties;

        delete props.id; // not allowed to set `id`

        const query = knex.insert(props).into(tableName);
        if (trx) {
            query.transacting(trx);
        }

        query.timeout(timeout);
        return query;
    };

    const findAll = (trx: Knex.Transaction | null = null, props = null) => {
        const query = knex.select(props || selectableProps).from(tableName);
        if (trx) {
            query.transacting(trx);
        }

        query.timeout(timeout);
        return query;
    };

    const find = (
        trx: Knex.Transaction | null = null,
        filters = {},
        props: (string | Knex.Raw)[]| null = null,
    ) => {
        const query = knex
            .select(props || selectableProps)
            .from(tableName)
            .where(filters);
        if (trx) {
            query.transacting(trx);
        }

        query.timeout(timeout);
        return query;
    };

    // Same as `find` but only returns the first match if >1 are found.
    const findOne = (
        trx: Knex.Transaction | null = null,
        filters: any,
        props: (string | Knex.Raw)[] | null = null,
    ) => find(trx, filters, props).then((results: any) => {
        if (!Array.isArray(results)) return results;
        return results[0];
    });

    const findById = (trx: Knex.Transaction | null = null, id?: any) => (trx || knex)
        .select(selectableProps)
        .from(tableName)
        .where({ id })
        .timeout(timeout)
        .then((results: any) => {
            if (!Array.isArray(results)) return results;
            return results[0];
        });

    const update = (
        trx: Knex.Transaction | null = null,
        id: any,
        properties: any,
    ) => {
        const props = properties;

        delete props.id; // not allowed to set `id`

        const query = knex.update(props).from(tableName).where({ id });
        if (trx) {
            query.transacting(trx);
        }

        query.timeout(timeout);
        return query;
    };

    const updateWhere = (
        trx: Knex.Transaction | null = null,
        filters: any,
        properties: any,
    ) => {
        const props = properties;

        delete props.id; // not allowed to set `id`

        const query = knex.update(props).from(tableName).where(filters);
        if (trx) {
            query.transacting(trx);
        }

        query.timeout(timeout);
        return query;
    };

    const destroy = (
        trx: Knex.Transaction | null = null,
        id = false,
        filters:any = { id: null },
    ) => {
        const query = knex.del().from(tableName);
        if (id) {
            query.where({ id });
        } else {
            query.where(filters);
        }
        if (trx) {
            query.transacting(trx);
        }

        query.timeout(timeout);
        return query;
    };

    const query = () => knex.from(tableName).timeout(timeout);

    const upsert = (trx: any, data?: any) => {
        const q = trx || knex;
        if (trx) {
            q.transacting(trx);
        }
        const firstData = data[0] ? data[0] : data;
        return q
            .raw(
                `${knex(tableName)
                    .insert(data)
                    .toQuery()} ON DUPLICATE KEY UPDATE ${Object.getOwnPropertyNames(
                    firstData,
                )
                    .map(field => `${field}=VALUES(${field})`)
                    .join(', ')}`,
            )
            .then((dbRes: object) => Object.values(dbRes)[0].insertId)
            .catch((err: any) => {
                throw err;
            });
    };

    const count = (trx: Knex.Transaction | null = null, props?: any) => {
        const q = knex(tableName).count(props || '*');
        if (trx) {
            q.transacting(trx);
        }

        q.timeout(timeout);
        return q;
    };

    return {
        name,
        tableName,
        selectableProps,
        timeout,
        create,
        findAll,
        find,
        findOne,
        findById,
        update,
        destroy,
        query,
        upsert,
        updateWhere,
        count,
    };
};
