import { env, logger } from '../../config';
import { Client } from 'pg';


export class PostgreSQL {
    postgresqlClient: Client;

    async connect() {
        try {
            const postgresqlClient = new Client(env.postgresql);
            await postgresqlClient.connect();
            logger.info({ message: 'Connected to PostgreSQL', label: 'PostgreSQL' });
        } catch (error) {
            logger.error({ message: error, label: 'PostgreSQL' });
        }
    }
}

export const postgresql = new PostgreSQL();