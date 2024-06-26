import { db, user } from "@/lib/drizzle/db";
import { getServerSession } from "next-auth";
import type { NextAuthOptions, Session } from "next-auth";
import Auth0 from "next-auth/providers/auth0";

const authConfig: NextAuthOptions = {
	pages: {
		signIn: "/auth/login",
		verifyRequest: "/auth/verify",
		signOut: "/auth/logout",
		error: "/auth/error",
	},
	callbacks: {
		async signIn({ profile }) {
			const { email, name, sub: id } = profile || {};
			if (email && id) {
				await db.insert(user).values({ id, email, name }).onConflictDoUpdate({ target: user.id, set: { name, email } });
			}
			return true;
		},
	},
	providers: [
		Auth0({
			clientId: process.env.AUTH0_ID as string,
			clientSecret: process.env.AUTH0_SECRET as string,
			issuer: process.env.AUTH0_ISSUER,
		}),
	],
};
const getAuthSession = () => getServerSession(authConfig) as Promise<Session>;
export { authConfig, getAuthSession };
