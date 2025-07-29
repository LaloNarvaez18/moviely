export interface BaseRepository<T = unknown>{
  create(data: T): Promise<T>
  findAll(): Promise<T[]>
  findById(id: number): Promise<T | null>
  update(id: number, data: Partial<T>): Promise<T>
  delete(id: number): Promise<T>
}
