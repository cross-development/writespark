// Packages
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Abstract seed class
 */
abstract class Seed {
	/**
	 * Static method is used to generate seeds with two users and their relationships.
	 */
	public static async generate(): Promise<void> {
		const alice = await prisma.userModel.upsert({
			where: { email: 'alice@prisma.io' },
			update: {},
			create: {
				name: 'Alice',
				email: 'alice@prisma.io',
				password: '$2a$10$EY4c9D5EyBLOUs8SRFIzhOTieXKXo/89ba2NrUN68fHzHqCwpn9G2', // pwd
				posts: {
					create: [
						{
							title: 'Check out Prisma with Next.js',
							content: 'https://www.prisma.io/nextjs',
							comments: {
								create: [],
							},
						},
						{
							title: 'Follow ExpressJS on Twitter',
							content: 'https://twitter.com/expressjs',
							comments: {
								create: [],
							},
						},
					],
				},
			},
		});

		const bob = await prisma.userModel.upsert({
			where: { email: 'bob@prisma.io' },
			update: {},
			create: {
				name: 'Bob',
				email: 'bob@prisma.io',
				password: '$2a$10$EY4c9D5EyBLOUs8SRFIzhOTieXKXo/89ba2NrUN68fHzHqCwpn9G2', // pwd
				posts: {
					create: [
						{
							title: 'Follow Prisma on Twitter',
							content: 'https://twitter.com/prisma',
							comments: {
								create: [
									{
										body: 'Hello from Alice',
										authorId: alice.id,
									},
								],
							},
						},
						{
							title: 'Follow NodeJS on Twitter',
							content: 'https://twitter.com/nodejs',
							comments: {
								create: [],
							},
						},
					],
				},
			},
		});

		console.log({ alice, bob });
	}
}

// Seeding data
Seed.generate()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		// close Prisma Client at the end
		await prisma.$disconnect();
	});
