import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm';
import Image from './Image'

@Entity('freelancers')
export default class Freelancer {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  about: string;
  
  @Column()
  portfolio: string;

  @Column()
  latitude: number;

  @Column()
  longitude: number;

  @Column()
  mobile: string;

  @Column()
  type: number;

  @Column()
  opening_hours: string;
  
  @Column()
  open_on_weekends: boolean;

  @OneToMany(() => Image, image => image.freelancer, {
    cascade:['insert', 'update']
  })
  @JoinColumn({name: 'freelancer_id'})
  images: Image[]
}