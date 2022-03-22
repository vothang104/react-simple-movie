import React, { Fragment } from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'

function Main() {
  return (
    <Fragment>
        <Header></Header>
        <Outlet></Outlet>
    </Fragment>
  )
}

export default Main