import React, { useState } from "react";
import PubSub from 'pubsub-js'
import { UpCircleTwoTone, DownCircleTwoTone, createFromIconfontCN, StarTwoTone, ProfileTwoTone } from '@ant-design/icons';
import { Menu } from 'antd';
import "./Filter.css"

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/c/font_4045121_ttd0blkkoge.js',
});

const items = [
  {
    label: 'Muscle',
    key: 'muscle',
    icon: <IconFont type="icon-jianshenfang" />,
    children: [
      {
        label: 'Own',
        key: 'mnew',
        icon: <ProfileTwoTone twoToneColor="#52c41a" />,
      },
      {
        label: 'Star',
        key: 'mold',
        icon: <StarTwoTone />,
      },
    ],

  },
  {
    label: 'Diet',
    key: 'diet',
    icon: <IconFont type="icon-shala" />,
    children: [
      {
        label: 'Own',
        key: 'dnew',
        icon: <ProfileTwoTone twoToneColor="#52c41a" />,
      },
      {
        label: 'Star',
        key: 'dold',
        icon: <StarTwoTone />,
      },
    ],
  },
];

export default function Filter() {
  const [current, setCurrent] = useState('mnew');
  const getType = (e) => {
    PubSub.publish('gettype', e.keyPath)
    setCurrent(e.key);
  }
  return <Menu onClick={getType} selectedKeys={[current]} mode="horizontal" items={items} />;
}
