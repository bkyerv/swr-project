import { useRouter } from "next/router";
import useSwr from "swr";
import { useEffect, useState } from "react";

function fetcher(...args) {
  return fetch(...args).then((res) => res.json());
}

export default function Person() {
  const [user, setUser] = useState(null);
  const router = useRouter();
  console.log(process.env);

  let { data } = useSwr(
    `${process.env.NEXT_PUBLIC_SINGLE_USER_URL}/${router.query.id}`,
    fetcher
  );

  useEffect(() => {
    data?.length > 0 && setUser(JSON.parse(data[0].result));
  }, [data]);

  function createEvent() {
    console.log(user);
    fetch(`http://localhost:3001/users/${router.query.id}`, { method: "POST" })
      .then((res) => res.json())
      .then(console.log);
  }

  return (
    <>
      <div className="px-6">
        <div className="mt-4 flex justify-between">
          <p className="">{user?.name}</p>
          <button
            className="inline-flex items-center px-4 py-2 leading-4 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 focus:outline-none rounded-md"
            type="button"
            onClick={createEvent}
          >
            create event
          </button>
        </div>
        <div className="py-8">
          {user?.events.length > 0 ? (
            <div className="flow-root">
              <ul className="space-y-4" role="list">
                {user.events.map(({ id, content }, index) => (
                  <div key={id} className="relative">
                    {index !== user.events.length - 1 && (
                      <span
                        className="absolute -ml-px top-6 left-2 h-full w-[2px] bg-gray-300"
                        aria-hidden="true"
                      />
                    )}
                    <p className="">{content}</p>
                  </div>
                ))}
              </ul>
            </div>
          ) : (
            0
          )}
        </div>
      </div>
    </>
  );
}
