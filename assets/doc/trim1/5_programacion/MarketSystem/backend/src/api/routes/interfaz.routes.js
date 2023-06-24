import  Router  from "express";
import * as interfazCtrl from '../controllers/interfaz.controllers.js';
const router = Router();

router.get('/interfaz',interfazCtrl.interfases);

export default router;