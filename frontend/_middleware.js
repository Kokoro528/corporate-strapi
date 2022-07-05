// import { NextResponse } from 'next/server'
// import { unstable_getServerSession } from 'next-auth'
// import { options } from './auth/[...nextauth]';

async function middleware(request) {
    console.log("ashdaj")
    const response = NextResponse.next();
    const session = await unstable_getServerSession(request, response, options);


    if (!!session.accessToken) {
        response.setHeader("Authorization", "Bearer "+ session.accessToken)
        return response
    }

    return NextResponse.redirect(new URL("/auth/signin", request.url));

}

// export const config = {
//     matcher: '/:path*',
// }

// export { default } from "next-auth/middleware"




import { withAuth } from "next-auth/middleware"

export default withAuth(
  // `withAuth` can augment your Request with the user's token.
  middleware,
  {
    callbacks: {
      authorized: ({ token }) => token?.role === "admin",
    },
  }
)

export const config = { matcher: ["/:path*"] }