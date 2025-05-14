import { Body, Controller, Delete, Get, Param, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.schema';
import { UpdateUserDto } from './dto/update.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  async findOne(
    @Param('id')
    id: string,
  ): Promise<User> {
    return this.userService.findOne(id);
  }

  @Put(':id')
  async updateUserById(
    @Param('id')
    id: string,
    @Body()
    user: UpdateUserDto,
  ): Promise<User> {
    return this.userService.updateById(id, user);
  }

  @Delete(':id')
  async delete(
    @Param('id')
    id: string,
  ): Promise<string> {
    return this.userService.deleteById(id);
  }
}
