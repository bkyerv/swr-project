import "../styles/globals.css";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }) {
  const [users, setUsers] = useState(null);

  async function getUsersData() {
    const res = await fetch(process.env.NEXT_PUBLIC_USERS_URL);
    const users = await res.json();
    return users;
  }

  useEffect(() => {
    getUsersData().then((data) => {
      const newUsers = data;
      setUsers(newUsers);
    });
  }, []);

  return (
    <React.StrictMode>
      <div className="h-screen flex">
        <div className="w-1/3 border-r flex flex-col">
          <Link href="/">
            <a className="px-7 pt-4 pb-2 text-lg font-semibold border-b">
              People
            </a>
          </Link>
          <ul className="divide-y divide-gray-100 overflow-y-scroll px-4 pt-2">
            {users?.map((user) => (
              <Person key={user.id} user={user} />
            ))}
          </ul>
        </div>
        <div className="w-2/3">
          <Component {...pageProps} />
        </div>
      </div>
    </React.StrictMode>
  );
}

function Person({ user }) {
  const router = useRouter();
  const isActive = router.asPath === `/${user.id}`;
  return (
    <li>
      <Link href={`/${user.id}`}>
        <a
          className={`${
            isActive ? "bg-blue-100" : "hover:bg-gray-50"
          } pl-4 pr-3 py-4 flex items-center rounded -my-px relative -mx-1 flex justify-between`}
        >
          {user.name}
          {user.events.length != 0 && (
            <span className="flex p-1 w-8 h-8 bg-blue-500 text-white rounded-full items-center justify-center">
              {user.events.length}
            </span>
          )}
        </a>
      </Link>
    </li>
  );
}

export default MyApp;
