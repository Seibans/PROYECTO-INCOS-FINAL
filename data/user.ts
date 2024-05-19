import { db } from '@/lib/db';

export const getUserByEmail = async (email: string) => {
	try {
		const user = await db.user.findUnique({
			where: {
				email,
			},
		});

		if (!user) {
			throw new Error('User not found');
		}

		return user;
	} catch (error) {
		console.log(error);
		return null;
	}
};

export const getUserById = async (id: string) => {
	try {
		const user = await db.user.findUnique({
			where: {
				id,
			},
		});

		if (!user) {
			throw new Error('User not found');
		}

		return user;
	} catch (error) {
		console.log(error);
		return null;
	}
};

export const getUsers = async () => {
	const users = await db.user.findMany();

	return users;
};

export const createUser = async (user: any) => {
	const createdUser = await db.user.create({
		data: user,
	});

	return createdUser;
};

export const updateUser = async (id: string, user: any) => {
	const updatedUser = await db.user.update({
		where: {
			id,
		},
		data: user,
	});

	return updatedUser;
};

export const deleteUser = async (id: string) => {
	const deletedUser = await db.user.delete({
		where: {
			id,
		},
	});

	return deletedUser;
};

