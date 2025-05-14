import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async findOne(id: string): Promise<User> {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).select('+password').exec();
  }

  async create(user: User): Promise<User> {
    return this.userModel.create(user);
  }

  async updateById(id: string, userData: User): Promise<User> {
    const user = await this.userModel
      .findByIdAndUpdate(id, userData, {
        new: true,
        runValidators: true, // Ensure validation is run on the update
      })
      .exec();
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  async deleteById(id: string): Promise<string> {
    await this.userModel.findByIdAndDelete(id).exec();
    return `User with id ${id} deleted successfully`;
  }
}
