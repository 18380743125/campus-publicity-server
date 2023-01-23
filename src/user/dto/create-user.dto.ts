import { IsNotEmpty, IsString, Length } from 'class-validator';
import { Role } from '../../role/entities/role.entity';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(6, 32)
  name: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 64)
  password: string;

  roles: Role[] | number[];
}
