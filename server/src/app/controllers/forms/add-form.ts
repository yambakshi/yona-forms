import { Request, Response } from 'express';
import { insertForm } from '../../services';
import { logger } from '../../../config';


export async function addForm(req: Request, res: Response) {
    try {
        logger.info({ message: "Received 'addForm' request", label: 'addForm' });
        const output = await insertForm(req.body);
        res.send(output);
    } catch (error: any) {
        logger.error({ message: error.message, label: 'addForm' });
        res.status(500).send({ success: false, message: error.message });
    }
}