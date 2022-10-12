import { env, logger } from '../../config';
import { Client } from 'pg';


class PostgreSQL {
    client: Client;

    async connect() {
        try {
            this.client = new Client(env.postgresql);
            await this.client.connect();
            logger.info({ message: 'Connected to PostgreSQL', label: 'PostgreSQL' });

            
        } catch (error) {
            logger.error({ message: error, label: 'PostgreSQL' });
        }
    }

    async query(query: string) {
        return this.client.query(query);
    }
}

export const postgresql = new PostgreSQL();