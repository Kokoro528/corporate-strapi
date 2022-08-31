import { NextResponse } from 'next/server'
// import { getSession } from 'next-auth'
// import {options} from './pages/api/auth/[...nextauth]'
async function middleware(request) {
    const response = NextResponse.next();
    // const session = await getSession();
    console.log("nextauth", request.nextauth)

    if (!!request.nextauth) {
        // response.setHeader("Authorization", "Bearer "+ request.nextauth.token.accessToken)
        response.nextauth = request.nextauth
        
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
        // return true
        return !!(token?.accessToken) && (new Date(token?.expires).getTime() > new Date().getTime())
      },
    },
  }
)

export const config = { matcher: ['/:path'] }