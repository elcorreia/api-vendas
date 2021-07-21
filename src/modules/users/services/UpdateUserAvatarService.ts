import AppError from '@shared/errors/AppError';
import path from 'path';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import uploadConfig from '@config/upload';
import fs from 'fs';
import DiskStorageProvider from '@shared/providers/StorageProvider/DiskStorageProvider';
import S3StorageProvider from '@shared/providers/StorageProvider/S3StorageProvider';

interface IRequest {
  user_id: string;
  avatarFileName: string;
}

class UpdateUserAvatarService {
  public async execute({ user_id, avatarFileName }: IRequest): Promise<User> {
    const userRepository = getCustomRepository(UsersRepository);
    const storageProvider = new DiskStorageProvider();

    const user = await userRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found.');
    }

    if (uploadConfig.driver === 's3') {
      const s3StorageProvider = new S3StorageProvider();
      if (user.avatar) {
        await s3StorageProvider.deleteFile(user.avatar);
      }

      const fileName = await s3StorageProvider.saveFile(avatarFileName);
    } else {
      const storageProvider = new DiskStorageProvider();

      if (user.avatar) {
        await storageProvider.deleteFile(user.avatar);
      }

      const fileName = await storageProvider.saveFile(avatarFileName);
    }

    user.avatar = fileName;

    await userRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
