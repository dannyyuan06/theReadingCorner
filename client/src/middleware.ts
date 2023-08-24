import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"


const scopes = [
    {
        pathname: "/",
        accessLevel: (accessLevel: number) => accessLevel === -1,
        redirect: "/blocked"
    },
    {
        pathname: "/dashboard/admin",
        accessLevel: (accessLevel: number) => accessLevel < 3,
        redirect: "/dashboard"
    },
    {
        pathname: "/dashboard",
        accessLevel: (accessLevel: number) => accessLevel === 3,
        redirect: "/dashboard/admin"
    },
    {
        pathname: "/clubStatistics",
        accessLevel: (accessLevel: number) => accessLevel < 3,
        redirect: "/unauthorised"
    },
    {
        pathname: "/members",
        accessLevel: (accessLevel: number) => accessLevel < 3,
        redirect: "/unauthorised"
    },
]

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    const username = req.nextauth.token?.username!.toString()
    for (let i=0;i<scopes.length;i++) {
        const {pathname, accessLevel, redirect} = scopes[i]
        if (req.nextUrl.pathname.match(pathname) && accessLevel(parseInt(req.nextauth.token?.accessLevel!.toString()))) {
            return NextResponse.rewrite(new URL(redirect, req.url), {headers: {username}})
        }
    }
    return NextResponse.next({headers: {username}})
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
)

export const config = {
    matcher: [
        "/aboutOutClub/:path*",
        "/books/:path*",
        "/bulletinBoard/:path*",
        "/clubSettings/:path*",
        "/clubStatistics/:path*",
        "/components/:path*",
        "/currentlyReading/:path*",
        "/dashboard/:path*",
        "/discountDirectory/:path*",
        "/fonts/:path*",
        "/meetings/:path*",
        "/meetings/:path*",
        "/members/:path*",
        "/navigationBar/:path*",
        "/profile/:path*",
        "/searchBooks/:path*",
        "/suggestions/:path*",
    ]
}