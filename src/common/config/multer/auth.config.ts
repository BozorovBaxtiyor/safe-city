import { extname } from 'path';

import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { Request } from 'express';

interface IMulterFileFilterCallback {
    (error: Error | null, acceptFile: boolean): void;
}

interface IMulterUpdateProfileConfig {
    storage: ReturnType<typeof diskStorage>;
    fileFilter: (req: Request, file: Express.Multer.File, cb: IMulterFileFilterCallback) => void;
}

export const multerUpdateProfileConfig: IMulterUpdateProfileConfig = {
    storage: diskStorage({
        destination: './uploads/profiles',
        filename: (
            req: Request,
            file: Express.Multer.File,
            cb: (error: Error | null, filename: string) => void,
        ): void => {
            const uniqueSuffix = uuidv4();
            const fileExtension = extname(file.originalname);
            cb(null, `${uniqueSuffix}${fileExtension}`);
        },
    }),
    fileFilter: (req: Request, file: Express.Multer.File, cb: IMulterFileFilterCallback): void => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
            return cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
    },
};
