import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { Uuid } from '@common/type'

@Entity({ name: 'category' })
export class CategoryOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  public readonly id!: Uuid

  @Column()
  public readonly name!: string

  @Column({ nullable: true })
  public readonly parentCategoryId?: Uuid

  @Column({ precision: 3 })
  public readonly created!: Date

  @Column({ precision: 3 })
  public readonly updated!: Date
}
