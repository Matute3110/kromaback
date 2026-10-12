import { Injectable } from '@nestjs/common';
import { CreateCitaDto } from './dto/create-cita.dto';
import { UpdateCitaDto } from './dto/update-cita.dto';

@Injectable()
export class CitasService {
  databaseService: any;
  async create(createCitaDto: any) {
    const query = `
      INSERT INTO citas ( barbero_id, servicio_id, fecha_hora, estado) 
      VALUES (?, ?, ?, ?, 'Pendiente')
    `;
    
    const result: any = await this.databaseService.query(query, [
      createCitaDto.barbero_id,
      createCitaDto.servicio_id,
      createCitaDto.fecha_hora 
    ]);
    console.log('Cita creada con ID:', result.insertId);
    console.log('Datos de la cita:', createCitaDto);
    console.log('Estado de la cita:', 'Pendiente');
    console.log('Fecha y hora de la cita:', createCitaDto.fecha_hora);
    console.log('ID del cliente:', createCitaDto.cliente_id);

    return { 
      success: true, 
      id: result.insertId, 
      ...createCitaDto, 
      estado: 'Pendiente' 
    };
  }
  async findAll() {
    const query = `
      SELECT 
        c.id, 
        c.fecha_hora, 
        c.estado,
        u.nombre AS cliente_nombre,
        u.apellido AS cliente_apellido,
        s.nombre AS servicio_nombre, 
        s.precio AS servicio_precio, 
        e.nombre AS barbero_nombre 
      FROM citas c
      LEFT JOIN usuarios u ON c.cliente_id = u.id 
      LEFT JOIN servicios s ON c.servicio_id = s.id
      LEFT JOIN empleados e ON c.barbero_id = e.id
      ORDER BY c.fecha_hora ASC
    `;
    return await this.databaseService.query(query, []);
  }

  findOne(id: number) {
    return `This action returns a #${id} cita`;
  }

  update(id: number, updateCitaDto: UpdateCitaDto) {
    return `This action updates a #${id} cita`;
  }

  remove(id: number) {
    return `This action removes a #${id} cita`;
  }
}
