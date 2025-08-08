import { compare, hash } from 'bcrypt';

class Crypto {
    async encrypt(data) {
        return hash(data, 7);
    }

    async decrypt(data, encrypedData) {
        return compare(data, encrypedData);
    }
}

export default new Crypto();
