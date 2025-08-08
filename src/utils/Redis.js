import redisClinent from '../db/redis-client.js';

class Redis {
    async setData(key, value, time = 300) {
        return redisClinent.set(key, value, {
            EX: time,
        });
    }

    async getData(key) {
        return redisClinent.get(key);
    }

    async deleteData(key) {
        return redisClinent.del(key);
    }
}

export default new Redis();
