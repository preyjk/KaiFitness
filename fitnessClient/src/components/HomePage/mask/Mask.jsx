import React from 'react'
import { List, Skeleton, Divider } from 'antd';

export default function Mask(props) {
    const {muscleGroup, dietGroup,type} = props
    // console.log(type == 'diet'?dietGroup:muscleGroup)
  if(type == 'diet') {return (
    <div className='mask' >
                          <List
                              dataSource={dietGroup}
                              renderItem={(item) => (
                                <List.Item>
                                  {item.diet.name + "   Number: " + item.weight}
                              </List.Item>
                              )}
                          />
                      </div>
                      
    
  )}else {return(
    <div className='mask' >
                      <List
                          dataSource={muscleGroup}
                          renderItem={(item) => (
                            <List.Item>
                                {item.muscle.name + "   Number: " + item.number + "   Weight: " + item.weight }
                            </List.Item>
                          )}
                      />
    </div>
  )}
}
