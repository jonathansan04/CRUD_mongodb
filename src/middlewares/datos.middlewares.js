import multer, { diskStorage } from 'multer';
import { extname } from 'path';
import path from 'path';

const guardar = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {
        if(file !== null){
            const ext = file.originalname.split('.').pop()
            cb(null, Date.now() + '.' +ext );
        }
    },
});

const filtro = (req,file, cb) =>{
    if(file && (file.mimetype === 'image/jpg' || file.mimetype ==='image/jpeg'
        || file.mimetype === 'image/png')){
            cb(null, true)
        }else {
            cb(null, false)
        }
}

export const upload  = multer({ storage:guardar, fileFilter:filtro });

