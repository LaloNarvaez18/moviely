export default interface Repository<
  CreateDto = unknown,
  UpdateDto = unknown,
  Entity = unknown
> {
  create(data: CreateDto): Promise<Entity>
  findAll(): Promise<Entity[]>
  findById(id: number): Promise<Entity | null>
  update(id: number, data: UpdateDto): Promise<Entity>
  delete(id: number): Promise<Entity>
}
