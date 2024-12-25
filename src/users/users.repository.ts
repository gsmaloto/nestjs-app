import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = await this.userModel.create(createUserDto);
    return createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().select('-password').exec();
  }

  async findOne(id: string): Promise<User> {
    return this.userModel.findById(id).select('-password').exec();
  }

  async findByKeyValue(key: string, value: string): Promise<User> {
    return this.userModel
      .findOne({ [key]: value })
      .lean()
      .exec();
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    return this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .select('-password');
  }

  async delete(id: string): Promise<User> {
    return this.userModel.findByIdAndDelete(id).select('-password');
  }

  async updateLastLogin(id: string): Promise<User> {
    return this.userModel.findByIdAndUpdate(id, { lastLogin: new Date() });
  }
}
