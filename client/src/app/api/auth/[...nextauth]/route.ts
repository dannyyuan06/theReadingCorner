import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import TwitterProvider from "next-auth/providers/twitter";
import { Account, Profile, User as UserType } from "next-auth";
import User from "@/models/User";

const callbacks: { [id: string]: any } = {};

type propsType = {
  user: UserType | null | undefined;
  account: Account | null | undefined;
  metadata: Profile | null | undefined;
};

// Events which are triggered when the user signs in
callbacks.signIn = async ({ user, account, metadata }: propsType) => {
  if (user) {
    // Credentials are already verified
    if (account!.type === "credentials") return true;
    // Verify the Oauth credentials
    else if (account!.type === "oauth") {
      const email = user.email; // Query the database for their email
      const [res, err] = email ? await User.emailMake(email) : [null, ""];
      if (res) return true;
      else {
        // If user doesnt exist, return the register screen with their credentials
        const { id, ...usefulInfo } = user!;
        const queryParameters = new URLSearchParams();
        queryParameters.append("name", usefulInfo.name!);
        queryParameters.append("email", email!);
        queryParameters.append("picture", usefulInfo.image!);
        return "/register/oauth?" + queryParameters.toString();
      }
    }
  }
  return false;
};
// Once signed in redirect to the dashboard
callbacks.redirect = async () => "/dashboard";

// Send the customise the JWT sent
callbacks.jwt = async ({ token, user, account, profile }: any) => {
  if (token.accessLevel) return token;
  const [use, err] = await User.emailMake(token.email);
  return { ...token, ...use };
};
// Send back the session with the JWT token
callbacks.session = async ({ session, token, user }: any) => {
  const sessionRe = { ...session, ...user, ...token };
  return sessionRe;
};

const handler = NextAuth({
  providers: [
    // How to log in, credentials, with Google etc.
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "Username" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // Call own method to see if user is database.
        const res = await fetch(
          process.env.NEXT_PUBLIC_HOST + "api/users/login",
          {
            method: "POST",
            body: JSON.stringify(credentials),
            headers: { "Content-Type": "application/json" },
            cache: "no-cache",
          }
        );
        const user = await res.json();

        // If no error and we have user data, return it
        if (res.ok && user) {
          return user;
        }
        return null;
        // Return null if user data could not be retrieved
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    }),
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID!,
      clientSecret: process.env.TWITTER_CLIENT_SECRET!,
      version: "2.0",
    }),
  ],
  pages: { // Set up if custom pages are needed
    signIn: "/signIn",
    newUser: "/auth/new-user",
  }, // use JWT tokens
  session: {
    strategy: "jwt",
  },
  callbacks,
});

export { handler as GET, handler as POST };
