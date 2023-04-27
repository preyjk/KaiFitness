import React,{useState} from "react";
import PubSub from 'pubsub-js'
// import axios from 'axios'
import { UpCircleTwoTone, FireTwoTone, MinusCircleTwoTone,DownCircleTwoTone } from '@ant-design/icons';
import { Menu } from 'antd';
import "./Filter.css"

const items = [
    {
      label: 'Default',
      key: 'default',
      icon: <MinusCircleTwoTone />,
    },
    {
        label: 'Hot',
        key: 'hot',
        icon: <FireTwoTone twoToneColor="red"/>,
    },
    {
        label: 'New',
        key: 'new',
        icon: <UpCircleTwoTone twoToneColor="#52c41a"/>,
    },
    {
        label: 'Last',
        key: 'last',
        icon: <DownCircleTwoTone twoToneColor="pink"/>,
    },
];

export default function Filter() {
    const [current, setCurrent] = useState('default');
    const getType=(e)=>{
        PubSub.publish('gettype',e.key)
        setCurrent(e.key);
    }
    return <Menu onClick={getType} selectedKeys={[current]} mode="horizontal" items={items} />;
}
