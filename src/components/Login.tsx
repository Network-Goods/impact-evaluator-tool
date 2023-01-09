// import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
// import { supabase } from "../lib/supabase";

// // Supabase auth needs to be triggered client-side
// export default function Login() {
//   return (
//     <>
//       <div className="w-full h-full flex justify-center items-center p-4 bg-gray-300">
//         <div className="w-full sm:w-1/2 xl:w-1/3">
//           <div className="border-teal p-8 border-t-12 bg-white mb-6 rounded-lg shadow-lg bg-white">
//             <div className="is-flex is-justify-content-center">
//               <div className="mr-3 is-flex">
//                 <img alt="logo" />
//               </div>
//               <div className="title is-size-5">Impact Evaluator</div>
//             </div>
//             <hr className="my-6" />
//             <p className="title has-text-centered is-size-4">
//               Log into your account
//             </p>
//             <Auth
//               appearance={{ theme: ThemeSupa }}
//               // view="update_password"
//               supabaseClient={supabase}
//               providers={["google", "github"]}
//               // scopes={{github: 'repo'}} // TODO: enable scopes in Auth component.
//               socialLayout="vertical"
//             />
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

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