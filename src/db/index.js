import consola from 'consola';
import { connect } from 'mongoose';

import config from '../config/index.js';

export async function connectDB() {
    try {
        await connect(config.MONGO_URI);
        consola.info(`Database connected`);
    } catch (error) {
        consola.error(`Error on connecting to database`, error);
    }
}
