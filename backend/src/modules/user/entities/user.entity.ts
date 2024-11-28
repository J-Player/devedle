import { UserRole } from '../enums/user-role.enum'
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string = crypto.randomUUID()
  @Column({ unique: true })
  username: string
  @Column()
  password: string
  @Column({ default: UserRole.USER })
  role: UserRole = UserRole.USER
  @CreateDateColumn()
  createdAt: Date
  @UpdateDateColumn()
  updatedAt?: Date
}
