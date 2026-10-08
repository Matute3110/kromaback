import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import * as bcrypt from 'bcrypt';
import { UnauthorizedException } from '@nestjs/common';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {
  }

  async login(correo: string, contrasenaPlana: string) {
    const user = await this.usersService.buscarPorCorreo(correo);
    if (user && await bcrypt.compare(contrasenaPlana, user.contrasena)) {
      const payload = { correo: user.correo, sub: user.id };
      const { contrasena, ...datosUsuario } = user;
      return {
        access_token: this.jwtService.sign(payload),
        usuario: {datosUsuario},  
        
      };
    }else {
      console.log('Contraseña almacenada en la base de datos:', user ? user.contrasena : 'Usuario no encontrado');
    }
    throw new UnauthorizedException('Credenciales inválidas');
  }


   async registrarUsers(userData: any){
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userData.contrasena, salt);
    const nuevousuario = {
      ...userData,contrasena: hashedPassword};
      return this.usersService.create(nuevousuario);
   }
   
  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}




