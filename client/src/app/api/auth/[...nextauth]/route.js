import { connectDB } from "@/utils/database";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import User from "@/models/User";
import { v4 as uuid } from 'uuid';
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: googleClientId,
      clientSecret: googleClientSecret,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        
        if(!credentials.email) {
          console.log('Email is required');
          return Promise.reject(new Error('Email is required'));
        }

        if(!credentials.password) {
          console.log('Password is required');
          return Promise.reject(new Error('Password is required'));
        }
        try {

          await connectDB();

          const user = await User.findOne({ email: credentials.email });
      
          if (!user) {
            console.log('User not found');
            return Promise.reject(new Error('User not found'));
          }
      
          const isValid = await bcrypt.compare(credentials.password, user.password);
          if (!isValid) {
            console.log('Invalid password');
            return Promise.reject(new Error('Invalid password or email'));
          }
          
          return user;
        } catch (error) {
          console.error('Error during authorization:', error);
          return null;
        }
      }
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.isAdmin = user.isAdmin;
        token.isWorker = user.isWorker;
      }
      return token; 
    },

    async session({ session, token }) {

      try {
        await connectDB();
        const user = await User.findOne({ email: token.email });
        if (user) {
          session.user.id = user.id;
          session.user.isAdmin = user.isAdmin;
          session.user.isWorker = user.isWorker;
          session.user.name = user.name || null;
          session.user.image = user.image || null;
          session.user.givenName = user.givenName || null;
          session.user.username = user.username || null;
        }
        console.log('Session: expires', session.expires);
      } catch (error) {
        console.error('Error during session creation:', error);
      }

      return session;
    },

    async signIn({ credentials, account, profile }) {
      if (account.provider === "google") {
        try {
          await connectDB();
      
          const userExist = await User.findOne({ email: profile.email });
          console.log('User existence check:', userExist);
      
          if (!userExist) {
            const newUser = new User({
              email: profile.email,
              name: profile.name,
              image: profile.picture,
              givenName: profile.given_name,
              familyName: profile.family_name,
              isAdmin: false,
              isWorker: false,
              googleUser: true,
              id: uuid().substring(0, 6)
            });
      
            await newUser.save();
            console.log('New user created:', newUser);
          }
      
          return true;  
        } catch (error) {
          console.log('Error in signIn callback (Google):', error);
          return false; 
        }
      }
  
      if (account.provider === "credentials") {
        console.log('Credentials data:', credentials); 
        try {
          await connectDB();
      
          const userExist = await User.findOne({ email: credentials.email }); 
          console.log('User existence check:', userExist);
      
          if (!userExist) {
            console.log('User not found');
            return null;  
          }
  
          const isPasswordValid = bcrypt.compare(credentials.password, userExist.password);
      
          if (!isPasswordValid) {
            console.log('Invalid password');
            return false;
          }
      
          return true;  
        } catch (error) {
          console.log('Error in signIn callback (Credentials):', error);
          return null; 
        }
      }
    
      return false;
    },    

    async redirect({ baseUrl }) {
      console.log('Redirecting to:', baseUrl + "/dashboard");
      return baseUrl + "/dashboard";
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 15 * 60,
    updateAge: 3 * 60,
    jwt: true,
  },
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true, 
        secure: process.env.NODE_ENV === "production",
        path: "/",
        sameSite: "lax",
      },
    },
  },
});

export { handler as GET, handler as POST };
