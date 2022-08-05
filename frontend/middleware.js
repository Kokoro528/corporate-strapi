import { NextResponse } from 'next/server'
// import { getSession } from 'next-auth'
// import {options} from './pages/api/auth/[...nextauth]'
async function middleware(request) {
    console.log("ashdaj")
    const response = NextResponse.next();
    // const session = await getSession();
    console.log("nextauth", request.nextauth)

    if (!!request.nextauth) {
        // response.setHeader("Authorization", "Bearer "+ request.nextauth.token.accessToken)
        response.nextauth = request.nextauth
        console.log('amy')
        return response
      
    }

    return NextResponse.redirect(new URL("/auth/signin", request.url));

}

// export const config = {
//     matcher: '/:path*',
// }

// export { default } from "next-auth/middleware"




import { withAuth } from "next-auth/middleware"
// middleware.bind(withAuth)
export default withAuth(
  // `withAuth` can augment your Request with the user's token.
  middleware,
  {
    callbacks: {
      authorized: function({ token }){
        console.log("token", token)
        return !!(token?.accessToken)
      },
    },
  }
)

export const config = { matcher: ["/solutions"] }