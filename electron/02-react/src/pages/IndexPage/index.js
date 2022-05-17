/* eslint-disable */
import React, { Component } from 'react'
// import styles from './index.module.scss'
import { Input } from 'antd';

const { Search } = Input;

const onSearch = value => console.log(value);

export default class IndexPage extends Component {
    render() {
        return (
            <div>
                <Search placeholder="input search text" onSearch={onSearch} enterButton />
            </div>
        )
    }
}
