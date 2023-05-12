import React,{useState} from 'react'
import { Button} from 'antd';
import { StarTwoTone} from '@ant-design/icons';
import './DietRecipes.css'

export default function Recipes(props) {
    const {name, information, type, detail, group} = props
    const [starColor, setStarColor] = useState('gray');
    const setStar=(e)=>{
        // PubSub.publish('gettype',e.keyPath)
        // setCurrent(e.key);
        setStarColor(starColor=='gray'? 'orange': 'gray')
        // console.log(e.target)
    }
    return (
        <section className="Recipes">
            <a href="#">
                <div>
                    <div>
                        <img src="https://d18zdz9g6n5za7.cloudfront.net/blog/640/640-1294-cucumber-cottage-cheese-and-grilled-chicken-toasts-9e16.jpg" alt="" />
                    </div>
                    <div className="summary">
                        <h1 className="title">
                            {name}
                            <span className="sub-title">                                
                                {information}              
                            </span>
                        </h1>
                    </div>
                    <div className="primary-type">{type=='diet'? "Healthy Recipes": "Sport Plan"}</div>
                </div>
                <div className='mask'>
                    <h2>{detail}</h2>
                    {(group && group.length > 0) && <>
                        {
                            group.map((item => {
                                return <div key={item._id}>
                                    <p>Meal Type:{item.diet}</p>
                                    <p>Prep Time:{item.weight}</p>
                                    <p>Cook Time:{item._id}</p>
                                </div>
                            }))
                        }
                    </>}
                    <Button onClick={setStar} className='star' type="text" shape="round" icon={<StarTwoTone twoToneColor={starColor}/>} size={'middle'}>
                        Favorite
                    </Button>
                </div>
            </a>
        </section>
  )
}


