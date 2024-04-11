import { Uuid } from '@common/type'
import { promises as fsPromises } from 'fs'
import { USER_ID_NEW } from '@core/domain/user/entity/constant'
import { OrderDir } from '@common/enum'
import * as crypto from 'crypto'
import { config } from 'dotenv'
import * as process from 'process'
import { AppError } from '@common/error'

config()

type FileStorageFindParams = {
  filter?: Record<string, unknown>
  orderBy?: string
  orderDir?: OrderDir
  take?: number
  skip?: number
}

export class UserFileStorageService<TRecord extends { id: string }> {
  protected filePath: string = process.env.USERS_STORAGE_PATH || ''

  public async save(record: TRecord): Promise<TRecord> {
    const recordsMap = await this.loadRecordsMap()
    this.prepareRecord(record)
    recordsMap[record.id] = record
    await this.persist(recordsMap)
    return record
  }

  public async delete(record: TRecord): Promise<void> {
    const recordsMap = await this.loadRecordsMap()
    delete recordsMap[record.id]
    await this.persist(recordsMap)
  }

  public async findOne(id: Uuid): Promise<null | TRecord> {
    const recordsMap = await this.loadRecordsMap()
    return recordsMap[id] ?? null
  }

  public async find(params: FileStorageFindParams): Promise<TRecord[]> {
    const recordsMap = await this.loadRecordsMap()
    let records = Object.values(recordsMap)
    if (params.filter) {
      Object.entries(params.filter).forEach(([field, value]) => {
        records = records.filter((record) => field in record && record[field] === value)
      })
    }
    const orderBy = params.orderBy ?? 'id'
    const orderDir = params.orderDir ?? OrderDir.Ascending
    records.sort((a, b) => {
      if (!(orderBy in a)) {
        return 0
      }
      if (a[orderBy] === b[orderBy]) {
        return 0
      }
      if (a[orderBy] < b[orderBy]) {
        return OrderDir.Ascending === orderDir ? -1 : 1
      }
      if (a[orderBy] > b[orderBy]) {
        return OrderDir.Descending === orderDir ? 1 : -1
      }
      return 0
    })
    const { skip = 0, take = 0 } = params
    if (skip > 0) {
      records.splice(0, params.skip)
    }
    if (take > 0) {
      records.splice(take)
    }
    return records
  }

  protected prepareRecord(record: TRecord): void {
    record.id = USER_ID_NEW !== record.id ? record.id : crypto.randomUUID()
  }

  private async loadRecordsMap(): Promise<Record<Uuid, TRecord>> {
    let fileBuffer: Buffer
    try {
      fileBuffer = await fsPromises.readFile(this.filePath)
    } catch (error) {
      throw new AppError('File read error', 'FileReadError')
    }
    const records: TRecord[] = JSON.parse(fileBuffer.toString())
    return records.reduce((map, record) => ({ ...map, [record.id]: record }), {})
  }

  private async persist(recordsMap: Record<Uuid, TRecord>): Promise<void> {
    const records = Object.values(recordsMap)
    try {
      await fsPromises.writeFile(this.filePath, JSON.stringify(records, null, '  '))
    } catch (error) {
      throw new AppError('File write error', 'FileWriteError')
    }
  }
}
