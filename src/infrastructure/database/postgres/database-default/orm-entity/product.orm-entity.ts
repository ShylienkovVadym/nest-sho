import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { Uuid } from '@common/type'

@Entity({ name: 'user' })
export class ProductOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  public readonly id!: Uuid

  @Column()
  public readonly productName!: string

  @Column()
  public readonly description!: string

  @Column()
  public readonly price!: number

  @Column()
  public readonly brand!: string

  @Column({ precision: 3 })
  public readonly created!: Date

  @Column({ precision: 3 })
  public readonly updated!: Date
}
