import React,{useState} from "react";
import PubSub from 'pubsub-js'
// import axios from 'axios'
import { UpCircleTwoTone, FireTwoTone, MinusCircleTwoTone,DownCircleTwoTone,createFromIconfontCN  } from '@ant-design/icons';
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
      },
      {
        label: 'Diet',
        key: 'diet',
        icon: <IconFont type="icon-shala" />,
      },
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
