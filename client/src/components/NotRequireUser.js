import React from 'react'
import { KEY_ACCESS_TOKEN, getItem } from '../utils/localStorageManager'
import { Outlet,Navigate } from 'react-router-dom';


function NotRequireUser() {
    const user=getItem(KEY_ACCESS_TOKEN);
  return (
    !user?<Outlet/>:<Navigate to="/"/>
  )
}

export default NotRequireUser
