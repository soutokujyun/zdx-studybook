import React, { Component } from 'react'
import { Outlet } from 'react-router-dom'

export default class ClockPage extends Component {
  render() {
    return (
      <div>
        <h3>ClockPage</h3>
        <Outlet />
      </div>
    )
  }
}
