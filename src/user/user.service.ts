// src/user/user.service.ts
import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { SignInDto } from '../dto/signIn.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async createUser(dto: SignInDto): Promise<UserDocument> {
    const existing = await this.userModel.findOne({ 
        $or: [
          { email: dto.email }, 
          { name: dto.name }
        ] 
    });
    
    if (existing) {
        if (existing.email === dto.email) {
          throw new BadRequestException('User with this email already exists');
        }
        if (existing.name === dto.name) {
          throw new BadRequestException('User with this name already exists');
        }
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const user = new this.userModel({
        email: dto.email,
        password: hashedPassword,
        name: dto.name,
        role: dto.role
    });

    return user.save();
  }

  async findByEmail(email: string): Promise<UserDocument | null> {
        return this.userModel.findOne({ email }).exec();
  }

  async findById(id: string): Promise<UserDocument | null> {
    console.log(`Finding user by ID: ${id}`);
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    return user;
  }

  async findAll (): Promise<UserDocument[]> {
    return this.userModel.find().exec();
  }

  async updateUserRole(id: string, role: string): Promise<UserDocument> {
    const user = await this.userModel.findByIdAndUpdate(
      id,
      { role },
      { new: true }
    ).exec();
    if (!user) {
      throw new BadRequestException('User not found');
    }
    return user;
  }

  async deleteUser(id: string) {
    await this.userModel.findByIdAndDelete(
      id
    ).exec();
  }
}
