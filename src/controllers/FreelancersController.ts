import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Freelancer from '../models/Freelancer';
import freelancerView from '../views/freelancers_view';
import * as Yup from 'yup';

export default {
  async create(req: Request, res: Response) {
    const { 
      about,
      portfolio,
      latitude,
      longitude,
      mobile,
      type,
      opening_hours,
      open_on_weekends,
    } = req.body

    const user = JSON.parse(req.params.userid)
  
    const freelancersRepository = getRepository(Freelancer);

    const requestImages = req.files as Express.Multer.File[]; 
    const images = requestImages.map(image => {
      return { path: image.filename }
    })

    const data = {
      about,
      portfolio,
      latitude,
      longitude,
      mobile,
      type,
      opening_hours,
      open_on_weekends,
      images,
      user,
    };

    const schema = Yup.object().shape({
      about: Yup.string().required(),
      portfolio: Yup.string().required(),
      latitude: Yup.number().required(),
      longitude: Yup.number().required(),
      mobile: Yup.string().required(),
      type: Yup.string().required(),
      opening_hours: Yup.string().required(),
      open_on_weekends: Yup.boolean().required(),
      user: Yup.number().required(),
      images: Yup.array(Yup.object().shape({
        path: Yup.string().required()
      }))
    });

    await schema.validate(data, {
      abortEarly: false,
    });
  
    const freelancer = freelancersRepository.create(data)
    
    await freelancersRepository.save(freelancer);
    
    
    return res.status(201).json(freelancer)
  },

  async index(req: Request, res: Response) {
    const freelancersRepository = getRepository(Freelancer);

    const freelancers = await freelancersRepository.find({
      relations: ['images', 'user']
    });

    return res.status(200).json(freelancerView.renderMany(freelancers));
  },

  async show(req: Request, res: Response) {
    const freelancersRepository = getRepository(Freelancer);

    const { id } = req.params

    const freelancer = await freelancersRepository.findOneOrFail(id, {
      relations: ['images', 'user']
    });

    return res.status(200).json(freelancerView.render(freelancer));
  }
}