import React,{Component} from 'react';
import ReactSwipe from 'react-swipe';

export default class Focus extends Component{
    constructor(){
        super();
        this.state={index:0}
    }

    render(){
        let opts = {
            continuous:true,
            auto:3000,
            callback:(index)=>{
                this.setState({index:index})
            },
        };
        return (
            <div className="swiper">
                {this.props.data.length?<ReactSwipe className="carousel" swipeOptions={opts}>
                    {this.props.data.map((item,index)=>(
                        <div key={index}>
                            <img src={item} alt=""/>
                        </div>
                    ))}
                </ReactSwipe>:<div>loading...</div>}
                <div className="dots">
                    {this.props.data.map((item,index)=>(<span key={index} className={index==this.state.index?'active':''}></span>))}
                </div>
            </div>
        )
    }
}

import './index.less';
