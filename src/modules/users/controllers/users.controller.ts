import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUsersDto } from '../dtos/create-users.dto';
import { UpdateUsersDto } from '../dtos/update-users.dto';
import { Response as ResponseType } from '../../util/enums/response.enum';
import { IdParamValidation } from '../../util/decorators/id-param-validation.decorator';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  public async findAll(@Res() response) {
    try {
      const users = await this.usersService.findAll();
      return response.status(HttpStatus.OK).json({
        type: ResponseType.SUCCESS,
        message: null,
        data: users || [],
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        type: ResponseType.ERROR,
        message: 'Something went wrong, Please try again later',
        data: null,
      });
    }
  }

  @Get('/:id')
  public async getById(@Res() response, @Param() { id }: IdParamValidation) {
    try {
      const user = await this.usersService.findById(id);
      return response.status(HttpStatus.OK).json({
        type: ResponseType.SUCCESS,
        message: null,
        data: user,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        type: ResponseType.ERROR,
        message: 'Something went wrong, Please try again later',
        data: null,
      });
    }
  }

  @Post()
  public async create(@Res() response, @Body() createUsersDto: CreateUsersDto) {
    try {
      const user = await this.usersService.create(createUsersDto);
      return response.status(HttpStatus.OK).json({
        type: ResponseType.SUCCESS,
        message: 'User has been created successfully',
        data: user,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        type: ResponseType.ERROR,
        message: 'Something went wrong, Please try again later',
        data: null,
      });
    }
  }

  @Put('/:id')
  public async update(
    @Res() response,
    @Param() { id }: IdParamValidation,
    @Body() updateUsersDto: UpdateUsersDto,
  ) {
    try {
      const user = await this.usersService.update(id, updateUsersDto);
      return response.status(HttpStatus.OK).json({
        type: ResponseType.SUCCESS,
        message: 'User has been updated successfully',
        data: user,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        type: ResponseType.ERROR,
        message: 'Something went wrong, Please try again later',
        data: null,
      });
    }
  }

  @Delete('/:id')
  public async delete(@Res() response, @Param() { id }: IdParamValidation) {
    try {
      await this.usersService.delete(id);
      return response.status(HttpStatus.OK).json({
        type: ResponseType.SUCCESS,
        message: 'User has been deleted successfully',
        data: null,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        type: ResponseType.ERROR,
        message: 'Something went wrong, Please try again later',
        data: null,
      });
    }
  }
}
