/*
 * @Author: Zoey
 * @Date: 2023-04-24 16:45:23
 * @LastEditors: Zoey
 * @LastEditTime: 2023-04-28 11:36:55
 * @Descripttion:
 */
import React, { useState } from 'react';
import { UserOutlined, SettingOutlined } from '@ant-design/icons';
import './index.less';
import { Menu } from 'antd';

const items = [
  {
    label: 'WORKOUTS',
    key: 'alipay',
    icon: <SettingOutlined />,
    children: [
      {
        label: 'WORKOUT VIDEOS',
        key: 'setting:1'
      },
      {
        label: 'CUSTOM WORKOUTS',
        key: 'setting:2'
      }
    ]
  },
  {
    label: 'PROGRAMS',
    key: 'PROGRAMS',
    children: [
      {
        label: 'WORKOUT PROGRAMS',
        key: 'WORKOUT PROGRAMS'
      },
      {
        label: 'MEAL PLANS',
        key: 'PLANS'
      }
    ]
  },
  {
    label: 'HEALTHY LIVING',
    key: 'HEALTHY',
    children: [
      {
        label: 'EXPERT ARTICLES',
        key: 'EXPERT ARTICLES'
      },
      {
        label: 'HEALTHY RECIPES',
        key: 'HEALTHY RECIPES'
      },
      {
        label: 'WELLNESS VIDEOS',
        key: 'WELLNESS VIDEOS'
      }
    ]
  },
  {
    label: 'ABOUT',
    key: 'ABOUT',
    children: [
      {
        label: 'ABOUT',
        key: 'ARTICLES'
      },

      {
        label: 'OUR TEAM',
        key: 'TEAM'
      }
    ]
  }
];

const user = sessionStorage.getItem('user');
const App = () => (
  <div className="header-box">
    <div className="logo">
      <a href="/"></a>
    </div>
    <Menu
      className="menu-list"
      style={{ flex: 'auto', minWidth: 0 }}
      mode="horizontal"
      items={items}
    />
    <div className="right">
      <a className="tips">Hi,{user ? user : 'Sign in'}</a>
      <UserOutlined className="user-icon" />
    </div>
    {/* <div style={sharedStyle} /> */}
  </div>
);

export default App;
