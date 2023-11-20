import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUsersDto {
  id?: number;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsOptional()
  isActive?: boolean;
}
