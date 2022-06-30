import React, { Component } from 'react'
import { connect } from 'react-redux'

export default connect(
    // mapStateToProps 把state映射到props上
    state => ({ num: state }),
    // 默认：mapDispatchToProps 把dispatch映射到props
    {
        add: () => ({ type: 'ADD' })
    }
)(class RrpComponent extends Component {
  render() {
    const { num, dispatch, add } = this.props
    console.log(this.props)
    return (
    <div>
        <h3>RrpComponent</h3>
        <p>{ num }</p>
        <button onClick={() => dispatch({ type: "ADD" })}>ADD</button>
        <button onClick={add}>ADD</button>
    </div>
    )
  }
})
