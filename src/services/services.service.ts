import { Injectable } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { DatabaseService } from '../database/database.service';
@Injectable()
export class ServicesService {

  constructor(private readonly databaseService: DatabaseService){}

async create(createServiceDto: any){
  const sql= ' INSERT INTO servicios (nombre, precio) VALUES (?, ?)';
  const result : any = await this.databaseService.query(sql, [createServiceDto.nombre, createServiceDto.precio]);
  console.log('Service created with ID:', result.insertId)
  console.log('Service created:', createServiceDto)
  console.log('Service created:', createServiceDto.duracion)
  console.log('Service created:', createServiceDto.precio)
  console.log('Service created:', createServiceDto.nombre)
  return {
    id: result.insertId,
    nombre: createServiceDto.nombre,
    precio: createServiceDto.precio,
    duracion: createServiceDto.duracion,
    
  }
  }
  

  async findAll() {

    const query = 'SELECT * FROM servicios WHERE activo = 1';
    const row = await this.databaseService.query(query, []);
    return row;
  }

  findOne(id: number) {
    return `This action returns a #${id} service`;
  }

  update(id: number, updateServiceDto: UpdateServiceDto) {
    return `This action updates a #${id} service`;
  }

  remove(id: number) {
    return `This action removes a #${id} service`;
  }
}
