import { AppDataSource } from '../config/database';
import { User } from '../models/userModel';
import { MoreThanOrEqual } from 'typeorm';

export const fetchRecentUsers = async () => {
    const userRepository = AppDataSource.getRepository(User);
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const recentUsers = await userRepository.find({
        where: {
            createdAt: MoreThanOrEqual(sevenDaysAgo),
        },
    });
    console.log(recentUsers)

    return recentUsers;
};
