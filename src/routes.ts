import { Router } from 'express';
import multer from 'multer';

import uploadConfig from './config/upload';

import UsersControllers from './controllers/UsersControllers';
import FreelancersControllers from './controllers/FreelancersController';



const routes = Router();
const upload = multer(uploadConfig)


routes.post('/users', upload.single('avatar'), UsersControllers.create);
routes.get('/users', UsersControllers.index);
routes.get('/users/:id', UsersControllers.show);

routes.post('/freelancers/:userid', upload.array('images'), FreelancersControllers.create);
routes.get('/freelancers', FreelancersControllers.index);
routes.get('/freelancers/:id', FreelancersControllers.show);




export default routes;