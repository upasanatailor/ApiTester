export default function SideBar() {
  return (
    <div className="  bg-gray">
      <header className="bg-white p-4 shadow-md flex justify-between items-center">
        <div className="flex items-center gap-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
            />
          </svg>

          <div className="text-lg ">Home</div>
          <div className="text-lg font-semibold flex p-2 gap-1 items-center bg-gray-100 rounded hover:bg-orange-600 text-gray-700 hover:text-white">
            Workspace
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m19.5 8.25-7.5 7.5-7.5-7.5"
              />
            </svg>
          </div>
          <div className="text-lg font-semibold flex p-2 gap-1 items-center bg-gray-100 rounded hover:bg-orange-600 text-gray-700 hover:text-white">
            API Network
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m19.5 8.25-7.5 7.5-7.5-7.5"
              />
            </svg>
          </div>
        </div>

        <div className="flex items-center gap-2 border border-gray-300 rounded px-3 py-2 bg-white shadow-sm w-full max-w-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z"
            />
          </svg>
          <input
            type="text"
            placeholder="Search postman..."
            className="w-full outline-none text-sm bg-transparent placeholder-gray-400"
          />
        </div>
        {/* <!-- Postman Top Bar Right Section --> */}

        <div className="flex items-center space-x-4 text-xl">
          <div className="bg-blue-500 flex space-x-1.5 hover:bg-orange-600 text-white text-lg px-4 py-1.5 rounded font-medium ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
              />
            </svg>
            <button>invite</button>
          </div>

          {/* <!-- Bell Icon --> */}
          <button className="relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-gray-600 hover:text-orange-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 01-6 0v-1m6 0H9"
              />
            </svg>
            {/* <!-- Optional notification dot --> */}
            <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
          </button>

          {/* <!-- Settings Icon --> */}
          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-gray-600 hover:text-orange-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l.7 2.153a1 1 0 00.95.69h2.262c.969 0 1.371 1.24.588 1.81l-1.823 1.324a1 1 0 00-.364 1.118l.7 2.153c.3.921-.755 1.688-1.538 1.118l-1.823-1.324a1 1 0 00-1.176 0l-1.823 1.324c-.783.57-1.838-.197-1.538-1.118l.7-2.153a1 1 0 00-.364-1.118L4.3 7.58c-.783-.57-.38-1.81.588-1.81h2.262a1 1 0 00.95-.69l.7-2.153z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </button>

          {/* <!-- Upgrade Button --> */}
          <div className="bg-gray-200 flex space-x-1.5 hover:bg-orange-600 text-black px-4 py-1.5 rounded font-medium">
            <button>Upgrade</button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m19.5 8.25-7.5 7.5-7.5-7.5"
              />
            </svg>
          </div>
        </div>
      </header>
      <div className="flex max-h-full">
        <aside className=" bg-white shadow-md p-4 space-y-6 m-2.5">
          <h1 className="text-xl font-bold text-orange-500">Postman Clone</h1>
          <nav className="space-y-2">
            <a href="#" className="block px-4 py-2 rounded hover:bg-orange-100">
              Collections
            </a>
            <a href="#" className="block px-4 py-2 rounded hover:bg-orange-100">
              APIs
            </a>
            <a href="#" className="block px-4 py-2 rounded hover:bg-orange-100">
              Environments
            </a>
            <a href="#" className="block px-4 py-2 rounded hover:bg-orange-100">
              History
            </a>
          </nav>
        </aside>
      </div>
    </div>
  );
}
