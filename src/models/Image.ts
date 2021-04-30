import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import Freelancer from './Freelancer';


@Entity('images')
export default class Image {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  path: string;

  @ManyToOne(() => Freelancer, freelancer => freelancer.images)
  @JoinColumn({name: 'freelancer_id'})
  freelancer: Freelancer;
}