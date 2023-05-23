/*
 * @Author: jack_KaiJing 
 * @Date: 2023-05-21 23:41:48 
 * @Last Modified by:   jack_KaiJing 
 * @Last Modified time: 2023-05-21 23:41:48 
 */
import React, { useState } from "react";
import PubSub from 'pubsub-js'
import { createFromIconfontCN, StarTwoTone, ProfileTwoTone } from '@ant-design/icons';
import { Menu } from 'antd';
import "./Filter.css"

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/c/font_4045121_ttd0blkkoge.js',
});

const items = [
  {
    label: 'Muscle',
    key: 'myPlanMuscle',
    icon: <IconFont type="icon-jianshenfang" />,
  },
  {
    label: 'Diet',
    key: 'myPlanDiet',
    icon: <IconFont type="icon-shala" />,
  }
];

export default function Filter() {
  const [current, setCurrent] = useState('myPlanMuscle');
  const getType = (e) => {
    // console.log("key:" + e.key);
    PubSub.publish('getMyplanType', e.key)
    setCurrent(e.key);
  }
  return <Menu onClick={getType} selectedKeys={[current]} mode="horizontal" items={items} />;
}
