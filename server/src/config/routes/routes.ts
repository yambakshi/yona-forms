import { Router } from "express";
import { getForms, addForm } from '../../app/controllers';


export const router = Router();

// Forms

router.route('/forms')
    .get(getForms)
    .put(addForm);