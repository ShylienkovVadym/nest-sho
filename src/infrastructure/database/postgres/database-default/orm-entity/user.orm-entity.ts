import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { Uuid } from '@common/type'
import { UserStatus } from '@core/domain/user/entity/enum'

@Entity({ name: 'user' })
export class UserOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  public readonly id!: Uuid

  @Column()
  public readonly firstName!: string

  @Column()
  public readonly lastName!: string

  @Column('enum', { enum: UserStatus })
  public readonly status!: string

  @Column({ precision: 3 })
  public readonly created!: Date

  @Column({ precision: 3 })
  public readonly updated!: Date
}
