import { Response, Request } from 'express';
import { getRepository } from 'typeorm';

import User from '../models/User';

export default {

  async index(req: Request, res: Response) {
    const usersRepository = await getRepository(User);

    const users = await usersRepository.find();

    return res.status(200).json(users);
  },

  async show(req: Request, res: Response) {
    const usersRepository = await getRepository(User);
    const { id } = req.params

    const user = await usersRepository.findOneOrFail(id)

    return res.status(200).json(user);
  },

  async create(req: Request, res: Response) {
    const {
      first_name, 
      last_name,
      email,
      city,
      state,
      birthday,
      avatar
     } = req.body;
  
     const usersRepository = getRepository(User);
  
     const user = usersRepository.create({
      first_name, 
      last_name,
      email,
      city,
      state,
      birthday,
      avatar
     });
  
     await usersRepository.save(user);
  
     return res.status(201).json(user);
  }
}