import React from 'react'
import { NavLink } from "react-router-dom";

function Header() {
  return (
    <>
    <header className="header flex items-center justify-center gap-x-5 py-10 text-white text-base mb-5">
        <NavLink className={({isActive}) => isActive ? 'text-primary' : ''} to='/'>Home</NavLink>
        <NavLink className={({isActive}) => isActive ? 'text-primary' : ''} to='/movies'>Movies</NavLink>
    </header>
    </>
  )
}

export default Header