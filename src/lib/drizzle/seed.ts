import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "./schema";
const { image } = schema;
const connection = new pg.Client({
	connectionString: process.env.DATABASE_URL as string,
});
const db = drizzle(connection, { schema });
(async () => {
	await connection.connect();
	const insertion = await db
		.insert(image)
		.values([
			{
				dockerImage: "ghcr.io/spaceness/debian",
				friendlyName: "Debian",
				category: ["Desktop"],
				icon: "/images/workspaces/debian.svg",
			},
		])
		.returning();
	console.log(insertion);
	console.log("Seeded image");
	connection.end();
	process.exit();
})();
