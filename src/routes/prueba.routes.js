import { Router } from "express";
import { getBovino, updateBovinos, createBovinos, deleteBovinos } from "../controllers/prueba.controller.js"
import { esquemaProducto } from "../middlewares/validationprod.js";
import { validacionEsquemas } from "../middlewares/validation.js";
import {upload} from "../middlewares/datos.middlewares.js";


const router= Router()

router.get('/bovinos',  getBovino );
router.get('/bovinos/:id',  getBovino );
router.post('/bovinos',upload.single('imagen'), validacionEsquemas(esquemaProducto), createBovinos );
router.delete('/bovinos/:id', deleteBovinos );
router.put('/bovinos/:id', upload.single('imagen'), updateBovinos );

export default router