import Image from 'next/image'
import Main from './Home/page'
import Login from './authentication/signin/page'

export default function Home() {
  return (
   <main>
    <Login/>
   </main>
  )
}