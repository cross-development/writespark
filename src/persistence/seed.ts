// Packages
import { PrismaClient } from '@prisma/client';

// Initializing Prisma client
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
						{
							title: "What's New in .NET 9",
							content:
								'.NET 9 brings a plethora of exciting updates and enhancements, revolutionizing the way we build applications. From performance optimizations to new language features, developers are in for a treat with this release. One of the most anticipated additions is the introduction of native support for Apple Silicon, enabling seamless development and deployment of .NET applications on macOS devices powered by M1 chips. Additionally, advancements in the ASP.NET Core framework promise improved scalability and reliability for web applications, empowering developers to deliver exceptional user experiences. With enhanced support for containers and cloud-native development, .NET 9 is poised to simplify the journey to modern application development. Stay tuned as we delve deeper into these exciting updates, exploring how they can elevate your projects to new heights of success. #dotNET #Programming #Innovation #ASPNETCore #AppleSilicon #WebDevelopment',
							comments: {
								create: [],
							},
						},
						{
							title: 'Exploring the Future of Artificial Intelligence in Healthcare',
							content:
								'Artificial intelligence (AI) is poised to revolutionize the healthcare industry, ushering in a new era of personalized medicine and improved patient outcomes. With AI-powered technologies, healthcare providers can analyze vast amounts of medical data to identify patterns, diagnose diseases, and recommend tailored treatment plans. From predictive analytics that forecast patient risks to image recognition algorithms that aid in medical imaging interpretation, AI is transforming every aspect of healthcare delivery. Moreover, virtual health assistants and chatbots powered by AI are enhancing patient engagement and delivering 24/7 support, revolutionizing the patient experience. As AI continues to evolve, so too will its impact on healthcare, driving efficiencies, reducing costs, and ultimately saving lives. Join us as we delve into the groundbreaking applications of AI in healthcare and explore the possibilities of a future where technology works hand-in-hand with healthcare professionals to provide better care for all. #AI #Healthcare #Innovation #PersonalizedMedicine #FutureOfWork',
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
						{
							title: 'The Rise of Low-Code Development Platforms',
							content:
								'Low-code development platforms are revolutionizing the software development landscape, offering a streamlined approach to building applications with minimal hand-coding. With the demand for digital solutions skyrocketing across industries, low-code platforms empower businesses to accelerate their app development processes, delivering solutions to market faster than ever before. These platforms provide intuitive visual interfaces, drag-and-drop functionality, and pre-built templates, allowing both professional developers and citizen developers to create robust applications with ease. Moreover, low-code platforms facilitate collaboration between IT and business teams, fostering innovation and driving digital transformation initiatives. As organizations embrace the power of low-code development, they gain a competitive edge in rapidly evolving markets, enabling them to adapt to changing customer demands and seize new opportunities. Join the low-code revolution and unlock the potential to build transformative applications at the speed of business. #LowCode #AppDevelopment #DigitalTransformation #Innovation',
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
