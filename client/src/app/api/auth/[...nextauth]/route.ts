import NextAuth from "next-auth/next"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import FacebookProvider from "next-auth/providers/facebook";
import TwitterProvider from "next-auth/providers/twitter";
import { Account, Profile, User as UserType } from "next-auth";
import User from "@/models/User";

const callbacks:{[id: string]: any} = {}

type propsType = {
    user: UserType | null | undefined, 
    account: Account | null | undefined, 
    metadata: Profile | null | undefined
}

callbacks.signIn = async ({
        user, 
        account, 
        metadata
    }: propsType) => {
    if (user) {
        if (account!.type === "credentials") return true
        else if (account!.type === "oauth") {
            const email = user.email
            const res = email ? User.emailMake(email) : null
            if (res) return true
            else {
                const {id, ...usefulInfo} = user!
                const queryParameters = new URLSearchParams()
                queryParameters.append("name", usefulInfo.name!)
                queryParameters.append("email", email!)
                queryParameters.append("picture", usefulInfo.image!)
                return '/register/oauth?' + queryParameters.toString()
            }
        }
    }
    return false
}

callbacks.redirect = async () => '/dashboard'

callbacks.jwt = async ({ token, user, account, profile }: {token: any, user:any, account:any, profile:any}) => {
    if (token.accessLevel) return token
    const [use, err] = await User.emailMake(token.email)
    return {...token, ...use}
}

callbacks.session = async ({session, token, user}: any) => {
    const sessionRe = {...session, ... user, ...token}
    return sessionRe
}

const handler = NextAuth({
    providers: [
        CredentialsProvider({
                // The name to display on the sign in form (e.g. 'Sign in with...')
                name: 'Credentials',
                // The credentials is used to generate a suitable form on the sign in page.
                // You can specify whatever fields you are expecting to be submitted.
                // e.g. domain, username, password, 2FA token, etc.
                // You can pass any HTML attribute to the <input> tag through the object.
                credentials: {
                    username: { label: "Username", type: "text", placeholder: "Username" },
                    password: { label: "Password", type: "password" }
                },
                async authorize(credentials, req) {
                    // You need to provide your own logic here that takes the credentials
                    // submitted and returns either a object representing a user or value
                    // that is false/null if the credentials are invalid.
                    // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
                    // You can also use the `req` object to obtain additional parameters
                    // (i.e., the request IP address)
                    const res = await fetch(process.env.NEXT_PUBLIC_HOST + "api/users/login", {
                        method: 'POST',
                        body: JSON.stringify(credentials),
                        headers: { "Content-Type": "application/json" }
                    })
                    const user = await res.json()
                
    
                    // If no error and we have user data, return it
                    if (res.ok && user) {
                        return user
                    }
                    return null
                    // Return null if user data could not be retrieved
                }
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
        })
    ],
    pages: {
        signIn: '/signIn',
        // signOut: '/auth/signout',
        // error: '/auth/error', // Error code passed in query string as ?error=
        // verifyRequest: '/auth/verify-request', // (used for check email message)
        newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
    },
    session: {
        strategy: "jwt"
    },
    callbacks
})

export {handler as GET, handler as POST}