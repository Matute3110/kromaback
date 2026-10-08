import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DatabaseService } from '../database/database.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly databaseService: DatabaseService) {}


  async create(createUserDto: CreateUserDto) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(createUserDto.contrasena, salt);
    const userCreate = 'INSERT INTO usuarios (nombre, apellido, correo, telefono, rol, contrasena) VALUES (?, ?, ?, ?, ?, ?)';
    await this.databaseService.query(userCreate, [
      createUserDto.nombre,
      createUserDto.apellido,
      createUserDto.telefono,
      createUserDto.correo,
      createUserDto.rol,
      hashedPassword
    ]);
    console.log('Usuario creado:', createUserDto);
    return {
      nombre: createUserDto.nombre,
      apellido: createUserDto.apellido,
      correo: createUserDto.correo,
      telefono: createUserDto.telefono,
      rol: createUserDto.rol
    };
  }


  async buscarPorCorreo(correo: string) {
    const query = 'SELECT * FROM usuarios WHERE correo = ? AND estado = 1 LIMIT 1';
    const rows: any[] = await this.databaseService.query(query, [correo]);
    return rows[0] ?? null;
  }

  async findAll() {
    const userFindAll = 'SELECT * FROM usuarios WHERE estado = 1';
    const row: any[] = await this.databaseService.query(userFindAll, []);
    return row;
  }

  async findOne(id: number) {
    const query = 'SELECT * FROM usuarios WHERE id = ? LIMIT 1';
    const rows: any[] = await this.databaseService.query(query, [id]);
    return rows[0] ?? null;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const usuarioActual = await this.findOne(id);
    if (!usuarioActual) {
      throw new NotFoundException(`El usuario con ID ${id} no existe`);
    }
    const nombre = updateUserDto.nombre ?? usuarioActual.nombre;
    const apellido = updateUserDto.apellido ?? usuarioActual.apellido;
    const correo = updateUserDto.correo ?? usuarioActual.correo;
    const rol = updateUserDto.rol ?? usuarioActual.rol;
    const contrasena = updateUserDto.contrasena ?? usuarioActual.contraseña;
    let contrasenaFinal = usuarioActual.contraseña; 
    if (updateUserDto.contrasena) {
      const salt = await bcrypt.genSalt(10);
      contrasenaFinal = await bcrypt.hash(updateUserDto.contrasena, salt);
    }
    const userUpdate =
      'UPDATE usuarios SET nombre = ?, apellido = ?, contrasena = ?, correo = ?, rol = ? WHERE id = ?';
    await this.databaseService.query(userUpdate, [
      nombre,
      apellido,
      contrasenaFinal,
      correo,
      rol,
      id,
    ]);

    return {
      id: id,
      nombre,
      apellido,
      correo,
      rol
    };
  }

  async remove(id: number) {
    const query = 'UPDATE usuarios SET estado = 0 WHERE id = ?';
    await this.databaseService.query(query, [id]);
    return { 
      success: true, 
      message: `El usuario con ID ${id} ha sido desactivado (borrado lógico).` 
    };
  }
}
