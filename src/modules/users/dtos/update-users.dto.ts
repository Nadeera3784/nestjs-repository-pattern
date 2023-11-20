import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateUsersDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsOptional()
  isActive?: boolean;
}
