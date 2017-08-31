import React,{Component} from 'react';
export default class ScrollList extends Component{
    constructor(){
        super();
        this.state = {flag:false};
    }

    componentWillReceiveProps(nextProps){

        if(nextProps.element && !this.state.flag){
            console.log(1);
            this.setState({flag:true});
            nextProps.element.addEventListener('scroll',()=>{
                // clearTimeout(this.timer);
                this.timer = setTimeout(()=>{
                    console.log(1);
                    let {scrollTop,offsetHeight,scrollHeight} = nextProps.element;
                    if(scrollTop+offsetHeight+20>scrollHeight && this.props.hasMore && !this.props.isLoading){
                        this.props.loadMore();
                    }
                },50)
            });
        }
    }

    render(){
        return (
            <div>
                {this.props.children}
            </div>
        )
    }
}

