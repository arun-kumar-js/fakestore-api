import React from 'react'
import { Outlet } from 'react-router-dom';

export const Nav = () => {
    return (
      <>
        <div className="fixed w-full ">
          <div className="flex justify-between bg-lime-200 p-5">
            <h1 className="text-3xl font-bold">AK Store</h1>
            <div className="flex justify-evenly gap-20 items-center">
              <a className="hover:underline hover:text-fuchsia-600" href="/">
                Home
              </a>
              <a className="hover:underline hover:text-fuchsia-600">About</a>
              <a className="hover:underline hover:text-fuchsia-600">Contact</a>
              
            </div>
          </div>
        </div>
        <main>
          <Outlet />
        </main>
      </>
    );
}



export default Nav;