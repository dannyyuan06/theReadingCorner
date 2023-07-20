export { default } from 'next-auth/middleware'
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