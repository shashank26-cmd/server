import { Router } from "express";
import { Next,Submit } from "../controllers/user.controller.js";
import upload from "../middlewars/multer.middleware.js";
const router =Router();

router.post('/first-level',Next);
router.post('/second-level/:id',upload.single("image"),Submit);


export default router;