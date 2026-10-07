import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DatabaseService } from '../database/database.service';

@Injectable()

export class UsersService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createUserDto: CreateUserDto) {
    const userCreate =
      'INSERT INTO usuarios (nombre, apellido, correo, contrasena, telefono, rol) VALUES (?, ?, ?, ?, ?, ?)';
    const row = await this.databaseService.query(userCreate, [
      createUserDto.nombre,
      createUserDto.apellido,
      createUserDto.correo,
      createUserDto.contrasena,
      createUserDto.telefono,
      createUserDto.rol,
    ]);

      console.log('este es el resultado de la inserción', userCreate, row);
    return row;
  }

  async buscarPorCorreo(correo: string) {
  const query = 'SELECT * FROM usuarios WHERE correo = ? LIMIT 1';
  const rows: any[] = await this.databaseService.query(query, [correo]);

  return rows[0] ?? null;
}

   async findAll() {
    const userFindAll = 'SELECT * FROM usuarios';
    const row: any[] = await this.databaseService.query(userFindAll, []);
    console.log('este es el resultado de la consulta', userFindAll, row);
    return row;
  };

  
  
  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const userUpdate =
      'update usuarios set nombre = ?, apellido = ?,contraseña = ?, correo = ?, rol = ? where idUsers = ?';
    const row: any[] = await this.databaseService.query(userUpdate, [
      updateUserDto.nombre,
      updateUserDto.apellido,
      updateUserDto.contrasena,
      updateUserDto.correo,
      updateUserDto.rol,
      id,
    ]);

    return row;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
