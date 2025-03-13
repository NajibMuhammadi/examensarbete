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
          // Logga credentials för att kontrollera inkommande data
          console.log('Credentials:', credentials);
      
          // Anslut till databasen
          await connectDB();
      
          // Hitta användaren i databasen
          const user = await User.findOne({ email: credentials.email });
      
          if (!user) {
            console.log('User not found');
            return Promise.reject(new Error('User not found'));
          }
      
          // Jämför lösenordet från formuläret med lösenordet i databasen
          const isValid = await bcrypt.compare(credentials.password, user.password);
          if (!isValid) {
            console.log('Invalid password');
            return Promise.reject(new Error('Invalid password or email'));
          }

          console.log('Authenticated User:', user);
    
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
      // Om user är definierad (vid första inloggning)
      if (user) {
        token.id = user.id;
        token.isAdmin = user.isAdmin;
        token.isWorker = user.isWorker;
      }
      return token; 
    },

    // När sessionen skapas, hämta användardata från databasen och lägg till i sessionen
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
      // Om användaren loggar in med Google
      if (account.provider === "google") {
        console.log('Google Profile:', profile);  // Här får vi profile för Google-login
        try {
          await connectDB();
      
          const userExist = await User.findOne({ email: profile.email });  // Använd profile för att hämta användaren
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
      
          return true;  // När inloggning via Google är framgångsrik
        } catch (error) {
          console.log('Error in signIn callback (Google):', error);
          return false;  // Om något går fel vid Google-inloggning
        }
      }
    
      // Om användaren loggar in med Credentials
      if (account.provider === "credentials") {
        console.log('Credentials data:', credentials);  // Här får vi credentials via account.provider
        try {
          await connectDB();
      
          const userExist = await User.findOne({ email: credentials.email });  // credentials.email för att hitta användaren
          console.log('User existence check:', userExist);
      
          if (!userExist) {
            console.log('User not found');
            return null;  // Returnera null om användaren inte hittas
          }
      
          // Lösenordsvalidering om det behövs
          const isPasswordValid = bcrypt.compare(credentials.password, userExist.password);
      
          if (!isPasswordValid) {
            console.log('Invalid password');
            return false;  // Om lösenordet inte är korrekt
          }
      
          return true;  // När inloggning via Credentials är framgångsrik
        } catch (error) {
          console.log('Error in signIn callback (Credentials):', error);
          return null;  // Om något går fel vid inloggning med Credentials
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
        httpOnly: true, // Gör att cookie inte kan nås via JavaScript
        secure: process.env.NODE_ENV === "production", // Endast för https i produktion
        path: "/",
        sameSite: "lax",
      },
    },
  },
});

export { handler as GET, handler as POST };
