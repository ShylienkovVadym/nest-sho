import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { Uuid } from '@common/type'
import { ListingCondition } from '@core/domain/listing/entity/enum'

@Entity({ name: 'listing' })
export class ListingOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  public readonly id!: Uuid

  @Column()
  public readonly title!: string

  @Column()
  public readonly description!: string

  @Column()
  public readonly price!: number

  @Column('enum', { enum: ListingCondition })
  public readonly condition!: ListingCondition

  @Column({ precision: 3 })
  public readonly created!: Date

  @Column({ precision: 3 })
  public readonly updated!: Date
}
