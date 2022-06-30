import React, { Component } from 'react'
import Layout from '../components/Layout'

export default class HomePage extends Component {
  render() {
    return (
        <Layout showTopBar={false} showBottomBar={true} title="商城首页">
            {/* <div>HomePage</div> */}
            {
              {
                content: (
                  <div>具名插槽</div>
                ),
                title: "这是个文本",
                btnClick: () => {console.log('这是一个事件')}
              }
            }
        </Layout>
    )
  }
}
