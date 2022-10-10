import { Router } from "express";
import {
    getForms, createForm, updateForm, deleteForms
} from '../../app/controllers';


export const router = Router();

// Releases

router.route('/forms/:id?')
    .get(getForms)
    .put(createForm)
    .post(updateForm)
    .delete(deleteForms);