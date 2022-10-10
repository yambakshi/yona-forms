import { Request, Response } from 'express';
import { insertForm } from '../../services';
import { logger } from '../../../config';


export async function createForm(req: Request, res: Response) {
    try {
        logger.info({ message: "Received 'createForm' request", label: 'createForm' });
        const output = await insertForm(req.body);
        res.send(output);
    } catch (error: any) {
        logger.error({ message: error.message, label: 'createForm' });
        res.status(500).send({ success: false, message: error.message });
    }
}