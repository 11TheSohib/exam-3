import consola from 'consola';
import { createClient } from 'redis';

import config from '../config/index.js';

const redisClinent = createClient({
    socket: {
        host: config.REDIS.HOST,
        port: config.REDIS.PORT,
    },
    password: config.REDIS.PASSWORD,
});

redisClinent.on(`error`, (err) =>
    consola.error(`Error on connecting to redis`, err)
);

await redisClinent.connect();

export default redisClinent;
