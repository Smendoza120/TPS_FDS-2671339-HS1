import { Router } from "express";
import * as userCtrl from '../controllers/users.controllers.js';

const router = Router();

router.get('/user-list', userCtrl.getUser);
router.post('/user-list', userCtrl.createUser);


export default router;