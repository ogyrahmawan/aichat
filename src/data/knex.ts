/**
 * Created by WebStorm.
 * User: darmawanefendi
 * Date: 2019-06-17
 * Time: 15:23
 */

import knex from 'knex';

const knexConfig = require('../../knexfile');

const environment = process.env.NODE_ENV || 'development';

export default knex(knexConfig[environment]);
