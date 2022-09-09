import { getPageData, fetchAPI } from "utils/api"
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const providers = [
  CredentialsProvider({
    // The name to display on the sign in form (e.g. "Sign in with...")
    name: "Credentials",
    // The credentials is used to generate a suitable form on the sign in page.
    // You can specify whatever fields you are expecting to be submitted.
    // e.g. domain, username, password, 2FA token, etc.
    // You can pass any HTML attribute to the <input> tag through the object.
    credentials: {
      username: { label: "Username", type: "text", placeholder: "jsmith" },
      password: { label: "Password", type: "password" },
    },
    async authorize(credentials, req) {
      // Add logic here to look up the user from the credentials supplied
      const user = await fetchAPI(
        "/auth/local",
        {},
        { method: "POST", body: JSON.stringify(credentials) }
      )
      console.log("user", user)
      if (user) {
        // Any object returned will be saved in `user` property of the JWT
        return user
      } else {
        // If you return null then an error will be displayed advising the user to check their details.
        return null

        // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
      }
    },
  }),
]

const callbacks = {
  async signIn({ user, account, profile, email, credentials }) {
    // console.log("signin=======\n", "user", user, "account", account, "profile", profile, "email", email, credentials)
    if (user && user.jwt) {
      return true
    }
    return false
  },
  async redirect({ url, baseUrl }) {
    console.log("hino", url, baseUrl)
    return baseUrl
  },
  async session({ session, user, token }) {
    // console.log("session=======\n", "token", token, "user", user, "session", session)
    session.accessToken = token.accessToken
    return session
  },
  async jwt({ token, user, account, profile, isNewUser }) {
    // console.log("jwt======\n","token", token, "user", user, account, profile)
    if (account || user || profile) {
      token.accessToken = user.jwt
    }
    return token
  },
}

export const options = {
  providers,
  callbacks,
  pages: {
    signIn: "/profile/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
}

const Auth = (req, res) => {
  return NextAuth(req, res, options)
}
export default Auth
