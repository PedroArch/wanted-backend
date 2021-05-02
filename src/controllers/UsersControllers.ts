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
      password,
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
      password,
      city,
      state,
      birthday,
      avatar
     };

     const schema = Yup.object().shape({
       first_name: Yup.string("Formato de dado inválido").required("first_name é obrigatório"),
       last_name: Yup.string().required("last_name é obrigatório"),
       email: Yup.string().required("email é obrigatório"),
       password: Yup.string().required("password é obrigatório").min(3, "Mínimo de 3 caracteres"),
       city: Yup.string().required("city é obrigatório"),
       state: Yup.string().required("state é obrigatório"),
       birthday: Yup.string().required("birthday é obrigatório"),
       avatar: Yup.string().required("avatar é obrigatório"), 
     })

     await schema.validate(data, {
       abortEarly: false,
     })

     
     const user = usersRepository.create(data);
  
     await usersRepository.save(user);
  
     return res.status(201).json(user);
  }
}