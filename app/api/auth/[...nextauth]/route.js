// import { PrismaClient } from "@prisma/client";
// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import bcrypt from "bcryptjs";

// const prisma = new PrismaClient();

// const authOptions = {
//   providers: [
//     CredentialsProvider({
//       name: "credentials",
//       credentials: {},
//       async authorize(credentials) {
//         const { email, password } = credentials;
//         try {
//           console.log("Credentials:", email, password);
//           const user = await prisma.user.findFirst({ where: { email: email } });
//           console.log("Found user:", user);
//           if (!user) {
//             return null;
//           }
//           const passwordMatch = await bcrypt.compare(password, user.password);
//           if (!passwordMatch) {
//             return null;
//           }
//           const userCategory = user.category;
//           console.log("User category:", userCategory);
//           return { ...user, userCategory };
//         } catch (error) {
//           console.error("Error authenticating user:", error);
//           return null;
//         }
//       },
//     }),
//   ],
//   callbacks: {
//     async session({ session, token, user }) {
//       session.token = token;
//       session.category = userCategory;
//       return session;
//     },
//   },
//   secret: process.env.NEXTAUTH_SECRET,
//   pages: {
//     signIn: "/",
//   },
// };

// const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST };
// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import bcrypt from "bcryptjs";

// const prisma = new PrismaClient();

// const authOptions = {
//   providers: [
//     CredentialsProvider({
//       name: "credentials",
//       credentials: {},
//       async authorize(credentials) {
//         const { email, password } = credentials;
//         try {
//           console.log("Credentials:", email, password);
//           const user = await prisma.user.findFirst({ where: { email: email } });
//           console.log("Found user:", user);
//           if (!user) {
//             return null;
//           }
//           const passwordMatch = await bcrypt.compare(password, user.password);
//           if (!passwordMatch) {
//             return null;
//           }
//           const userCategory = user.category;
//           return user;
//         } catch (error) {
//           console.error("Error authenticating user:", error);
//           return null;
//         }
//       },
//     }),
//   ],
//   session: {
//     strategy: "jwt",
//   },
//   callbacks: {
//     async session({ session, token, user }) {
//       console.log("token", token);
//       console.log("This the user", session.user);
//       console.log("This the user", userCategory);
//       console.log("This the user category", user.userCategory);
//       session.token = token;
//       session.user = session.user;
//       // session.user = { ...user, category: user.userCategory };
//       console.log("session", session);
//       return session;
//     },
//   },
//   secret: process.env.NEXTAUTH_SECRET,
//   pages: {
//     signIn: "/",
//   },
// };

// const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST };
/*********************************************** */
import { PrismaClient } from "@prisma/client";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
var userCategory = null;
const prisma = new PrismaClient();
const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials) {
        const { email, password } = credentials;
        try {
          console.log("Credentials:", email, password);
          const user = await prisma.user.findFirst({
            where: { email: email },
            include: {
              category: true,
            },
          });
          console.log("Found user:", user);
          if (!user) {
            return null;
          }
          const passwordMatch = await bcrypt.compare(password, user.password);
          if (!passwordMatch) {
            return null;
          }
          //console.log(user);
          userCategory = user.category.name;
          return user;
        } catch (error) {
          console.error("Error authenticating user:", error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user, session }) {
      console.log("jwt", { token, user, session });
      if(user){
        token.category=  user.category
      }
      return token
    },
    async session({ session, token, user }) {
      session.category = token.category;
      console.log("session", { session, token, user });
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
