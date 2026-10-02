import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class UsersService {

  constructor(private readonly databaseService: DatabaseService) {}

  async create(createUserDto: CreateUserDto) {
    
    const userCreate = 'insert into usuario (name,lastName,DNI, password, email, status, role) values (?, ?, ?, ?, ?, ?, ?)'  
    const row :any[] =  await this.databaseService.query(userCreate, [createUserDto.name, createUserDto.lastName, createUserDto.dni, createUserDto.password, createUserDto.email, createUserDto.status, createUserDto.role]);


    return row ;
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const userUpdate = "update usuario set name = ?, lastName = ?, DNI = ?, password = ?, email = ?, status = ?, role = ? where idUsers = ?"
    const row : any[] =  await this.databaseService.query(userUpdate, [updateUserDto.name, updateUserDto.lastName, updateUserDto.dni, updateUserDto.password, updateUserDto.email, updateUserDto.status, updateUserDto.role, id]);
    
    return row;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
