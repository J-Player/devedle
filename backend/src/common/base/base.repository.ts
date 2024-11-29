export abstract class BaseRepository<T> {
  abstract findById(id: string): Promise<T>
  abstract findAll(): Promise<T[]>
}
