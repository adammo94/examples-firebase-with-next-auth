import { useSession, signIn, signOut } from "next-auth/react"

export default function Home() {
  const { data: session, status } = useSession()

  return (
    <>
      {session && (
        <span>Logged in as {session.user?.email}</span>
      )}
      {status === 'authenticated' && <button onClick={() => signOut()}>log out</button>}
      {status === 'unauthenticated' && <button onClick={() => signIn('credentials', {
        callbackUrl: `${window.location.origin}/`
      })}>log in</button>}
    </>
  )
}
