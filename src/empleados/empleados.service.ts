import { Injectable } from '@nestjs/common';
import { CreateEmpleadoDto } from './dto/create-empleado.dto';
import { UpdateEmpleadoDto } from './dto/update-empleado.dto';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class EmpleadosService {

  constructor(private readonly databaseService: DatabaseService) {}

  async create(createEmpleadoDto: any) {
    const query = 'INSERT INTO empleados (nombre, cargo, estado) VALUES (?, ?, 1)';
    const result: any = await this.databaseService.query(query, [
      createEmpleadoDto.nombre,
      createEmpleadoDto.cargo || 'Barber' 
    ]);

    return { 
      id: result.insertId, 
      nombre: createEmpleadoDto.nombre, 
      cargo: createEmpleadoDto.cargo || 'Barber',
      estado: 1
    };
  }

  async findAll() {
    const query = 'SELECT * FROM empleados WHERE estado = 1';
    return await this.databaseService.query(query, []);
  }

  findOne(id: number) {
    return `This action returns a #${id} empleado`;
  }

  update(id: number, updateEmpleadoDto: UpdateEmpleadoDto) {
    return `This action updates a #${id} empleado`;
  }

 async remove(id: number) {
    const query = 'UPDATE empleados SET estado = 0 WHERE id = ?';
    await this.databaseService.query(query, [id]);
    return { success: true, message: 'Empleado desactivado' };
  }
}
