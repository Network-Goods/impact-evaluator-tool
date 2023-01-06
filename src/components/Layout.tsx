// import { observer } from "mobx-react-lite";
// import Navbar from "./Navbar";

// const Layout = observer(({
//     children
//   }: {
//     children: any,
//   }) => {
//   return (
//     <div className="flex flex-col h-full justify-center items-center">
//       <Navbar />

//       <div className="w-[640px]">
//         {children}
//       </div>
//     </div>
//   );
// });

// export default Layout;

import React, { ReactNode } from 'react'
import Link from 'next/link'
import Head from 'next/head'

type Props = {
  children?: ReactNode
  title?: string
}

const Layout = ({ children, title = 'This is the default title' }: Props) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <header>
      <nav>
        <Link href="/">Home</Link> | <Link href="/about">About</Link> |{' '}
        <Link href="/users">Users List</Link> |{' '}
        <a href="/api/users">Users API</a>
      </nav>
    </header>
    {children}
    <footer>
      <hr />
      <span>I'm here to stay (Footer)</span>
    </footer>
  </div>
)

export default Layout