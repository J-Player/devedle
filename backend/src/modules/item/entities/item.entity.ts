import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm'

@Entity('items')
export class Item {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ unique: true })
  name: string

  @Column({ unique: true, nullable: true })
  imageId?: string
}
