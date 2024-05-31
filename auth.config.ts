// import type { NextAuthConfig } from "next-auth";
// import bcrypt from "bcryptjs";
// import Credentials from "next-auth/providers/credentials";
// import { LoginSchema } from "@/schemas"
// import { getUserByEmail } from "@/data/user";

// export default {
// 	providers: [
// 		Credentials({
//             async authorize(credentials) {
//                 const validateFields = LoginSchema.safeParse(credentials);

//                 if (validateFields.success) {
//                     const { email, password } = validateFields.data;

//                     const user = await getUserByEmail(email);
//                     if (!user || !user.password) return null;

//                     const passwordMatch = await bcrypt.compare(
//                         password,
//                         user.password,
//                     );

//                     if (passwordMatch) return user;
//                 }

//                 return null;
//             }
//         })
// 	]
// } satisfies NextAuthConfig





import type { NextAuthConfig } from "next-auth";
import bcrypt from "bcryptjs";
import Credentials from "next-auth/providers/credentials";

import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Facebook from "next-auth/providers/facebook";

import { LoginSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";

export default {
    // Para mas detalles  minuto 3:31
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        Github({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
        }),
        Facebook({
            clientId: process.env.FACEBOOK_CLIENT_ID,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        }),
        Credentials({
            async authorize(credentials) {
                const validateFields = LoginSchema.safeParse(credentials);

                if (validateFields.success) {
                    const { email, password } = validateFields.data;

                    const user = await getUserByEmail(email);
                    if (!user || !user.password) return null;

                    const passwordMatch = await bcrypt.compare(password, user.password);

                    if (passwordMatch) {
                        return {
                            ...user,
                            id: user.id.toString(), // Convert the id to string for NextAuth
                        };
                    }
                }

                return null;
            }
        })
    ],
} satisfies NextAuthConfig;

// callbacks: {
//     async session({ session, token }) {
//         if (session?.user) {
//             session.user.id = token.id as string; // Use the string id from the token
//         }
//         return session;
//     },
//     async jwt({ token, user }) {
//         if (user) {
//             token.id = user.id as string; // Set the string id in the token
//         }
//         return token;
//     }
// }