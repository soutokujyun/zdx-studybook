import React, { Component } from 'react'
import { Outlet } from 'react-router-dom'

export default class Redux extends Component {
  render() {
    return (
        <div>
            <h3>Redux</h3>
            <Outlet />
        </div>
    )
  }
}
