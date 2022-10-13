import { Request, Response } from 'express';
import { queryAllForms } from '../../services';
import { logger } from '../../../config';


export async function getForms(req: Request, res: Response) {
    try {
        logger.info({ message: "Received 'getForms' request", label: 'getForms' });
        const output = await queryAllForms();
        res.send(output);
    } catch (error: any) {
        logger.error({ message: error.message, label: 'getForms' });
        res.status(500).send({ success: false, message: error.message });
    }
}