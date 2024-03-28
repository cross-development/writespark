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
							content:
								"Exploring the dynamic duo of Prisma with Next.js has been a game-changer in my development journey. Gone are the days of wrestling with complex database queries. With Prisma's intuitive ORM and Next.js's seamless server-side rendering, building robust web applications feels like a breeze. Stay tuned as I delve deeper into this powerful combination, uncovering tips and tricks to supercharge your projects. From optimizing database performance to integrating real-time data updates, there's a world of possibilities waiting to be explored. Join me on this exciting adventure as we harness the full potential of Prisma and Next.js. Together, we'll revolutionize the way we build web apps. #Prisma #NextJS #WebDev #ORM #Database",
							comments: {
								create: [],
							},
						},
						{
							title: 'Follow ExpressJS on Twitter',
							content:
								"Calling all ExpressJS enthusiasts! Elevate your Node.js game by following ExpressJS on Twitter. Whether you're a seasoned developer or just starting out, staying updated with the latest trends, tutorials, and best practices is crucial. From middleware tips to advanced routing techniques, there's always something new to learn and explore. Join the ExpressJS community on Twitter and be part of the conversation. Together, we'll navigate the world of web development with speed, simplicity, and style. Don't miss out – hit that follow button now! #ExpressJS #NodeJS #WebDev #Twitter",
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
							title: 'Something new about Prisma on Reddit',
							content:
								"A fascinating discovery awaits on Reddit – a vibrant discussion surrounding the latest innovations in Prisma. As developers, staying ahead of the curve is essential, and this thread promises insights into a groundbreaking feature that could revolutionize how we approach data modeling. With Prisma already simplifying database interactions, this new development could be a game-changer for projects of all sizes. Join me as I dive deep into this discussion, unpacking its implications and exploring potential applications in real-world scenarios. Together, let's uncover the future of data management with Prisma. #Prisma #Database #WebDev #Reddit #Discussion",
							comments: {
								create: [
									{
										body: "Wow, this thread on Prisma is gold! Thanks for sharing. Can't wait to implement these new features in my projects. #Prisma #Database #WebDev",
										authorId: alice.id,
									},
									{
										body: 'Just stumbled upon this discussion – mind blown! Prisma keeps getting better and better. Excited to see where this takes us. #Prisma #Innovation #WebDev',
										authorId: alice.id,
									},
								],
							},
						},
						{
							title: 'Talking about NodeJS on Facebook',
							content:
								"Let's talk NodeJS! Join me on Facebook for an engaging conversation about all things NodeJS. Whether you're a seasoned developer or just starting your journey, there's something for everyone in the NodeJS community. From sharing insights on the latest features to troubleshooting common challenges, this is the place to be for NodeJS enthusiasts. Let's explore the power of asynchronous programming, dive into the world of npm packages, and discover innovative ways to leverage NodeJS for backend development. Together, we'll unlock the full potential of JavaScript on the server-side. Join the discussion now and be part of the NodeJS revolution! #NodeJS #JavaScript #WebDev #Facebook #Community",
							comments: {
								create: [
									{
										body: 'Finally, a space dedicated to all things NodeJS! Looking forward to learning and sharing experiences with fellow devs. #NodeJS #Community #WebDev',
										authorId: alice.id,
									},
									{
										body: 'NodeJS has been my go-to for backend development. Excited to connect with other enthusiasts here! #NodeJS #Backend #WebDev',
										authorId: alice.id,
									},
									{
										body: "Great initiative! Can't wait to exchange ideas and troubleshoot challenges together. #NodeJS #Collaboration #WebDev",
										authorId: alice.id,
									},
								],
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
