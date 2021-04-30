import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import Freelancer from './Freelancer'

@Entity('users')
export default class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  first_name: string;
  
  @Column()
  last_name: string;

  @Column()
  email: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  birthday: Date;

  @Column()
  avatar: string;

  @OneToOne(() => Freelancer, freelancer => freelancer.user, {
    cascade:['insert', 'update']
  })
  freelancer: Freelancer;
}