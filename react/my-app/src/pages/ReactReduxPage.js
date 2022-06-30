import React, { Component } from 'react'
import store from '../store'
import { Provider } from 'react-redux'
import RrpComponent from '../components/RrpComponent'
export default class ReactReduxPage extends Component {
  render() {
    return (
        <Provider store={store}>
            <div>ReactReduxPage</div>
            <RrpComponent />
        </Provider>
    )
  }
}
