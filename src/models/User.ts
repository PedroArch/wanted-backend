import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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
}