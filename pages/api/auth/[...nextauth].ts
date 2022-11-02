import NextAuth, { NextAuthOptions } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from "../../../firebaseConfig"
export const authOptions: NextAuthOptions = {

  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        username: {
          label: 'Email',
          type: 'text',
        },
        password: {
          label: 'Password',
          type: 'password'
        }
      },
      async authorize(credentials) {
        try {
          const data = await signInWithEmailAndPassword(auth, credentials?.username || '', credentials?.password || '')
          return ({
            ...data.user,
            id: data.user.uid
          })
        } catch (error) {
          return null
        }
      }
    })
  ],
  session: {
    strategy: "jwt"
  },
  secret: process.env.NEXTAUTH_SECRET
}
export default NextAuth(authOptions)