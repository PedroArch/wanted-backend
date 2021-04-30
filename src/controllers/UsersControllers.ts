import { Response, Request, request } from 'express';
import { getRepository } from 'typeorm';
import usersView from '../views/users_view'
import * as Yup from 'yup';

import User from '../models/User';

export default {

  async index(req: Request, res: Response) {
    const usersRepository = await getRepository(User);

    const users = await usersRepository.find();

    return res.status(200).json(usersView.renderMany(users));
  },

  async show(req: Request, res: Response) {
    const usersRepository = await getRepository(User);
    const { id } = req.params

    const user = await usersRepository.findOneOrFail(id)

    return res.status(200).json(usersView.render(user));
  },

  async create(req: Request, res: Response) {
    const {
      first_name, 
      last_name,
      email,
      city,
      state,
      birthday,
     } = req.body;
  
     const usersRepository = getRepository(User);

     const requestImage = req.file as Express.Multer.File; 
     const avatar = requestImage.filename;

     const data = {
      first_name, 
      last_name,
      email,
      city,
      state,
      birthday,
      avatar
     };

     const schema = Yup.object().shape({
       first_name: Yup.string().required(),
       last_name: Yup.string().required(),
       email: Yup.string().required(),
       city: Yup.string().required(),
       state: Yup.string().required(),
       birthday: Yup.string().required(),
       avatar: Yup.string().required(), 
     })

     await schema.validate(data, {
       abortEarly: false,
     })

     
     const user = usersRepository.create(data);
  
     await usersRepository.save(user);
  
     return res.status(201).json(user);
  }
}