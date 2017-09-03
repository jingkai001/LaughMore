import React,{Component} from 'react';
import MHeader from '../../components/MHeader/index';
import {connect} from 'react-redux';
import * as homeAction from '../../redux/actions/home';
import * as publishAction from '../../redux/actions/publish';
import * as userAction from '../../redux/actions/user';

import {Form,Select,Upload,Button,Input,Icon} from 'antd';
import 'antd/dist/antd.css';
const FormItem = Form.Item;
const Option = Select.Option;
const TextArea = Input.TextArea;



class Publish extends Component{

    componentDidMount(){
        this.props.getType();
        !sessionStorage.getItem('user')?this.props.history.push('/login'):null;
    }

    submitImg = (info)=>{
        if(info.file.status === 'error'){
            alert('上传失败');
        }else if(info.file.status === 'done'){
            let article = info.file.response;
            this.props.savePublishImg(article);
        }
    };

    changeCategory = (val)=>{
        this.val = val;
    };

    handleSubmit = ()=>{
        //let {title,category,content} = this.refs;

        let title = this.refs.title.refs.input.value;
        let content = this.refs.content.textAreaRef.value;
        let category = this.val;

        let article = this.props.publish.article;
        article.title = title;
        article.type = category;
        article.text = content;
        this.props.publishArticle(article);
    };

    render(){
        let url = 'http://localhost:3000/publishimg';
        const formItemLayout = {
            labelCol: {
                xs: { span: 3 },
                sm: { span: 2 },
            },
            wrapperCol: {
                xs: { span: 20 },
                sm: { span: 17 },
            },
        };
        const props = {
            action: url,
            listType: 'picture',
            withCredentials:true,//携带cookie，默认是不携带的；
        };

        let {category} = this.props.home||[];
        const {getFieldDecorator} = this.props.form;
        return (
            <div>
                <MHeader/>
                <div>
                    <Form style={{marginTop:'20px'}} action="/publish" method="post">
                        <FormItem label='标题' {...formItemLayout}>
                            {/*{getFieldDecorator('标题',{})(<Input placeholder="请输入标题"/>)}*/}
                            <Input placeholder="请输入标题" ref="title"/>
                        </FormItem>
                        <FormItem label='主题' labelCol={{xs:{span:3}}} wrapperCol={{xs:{span:10}}}>
                            <Select placeholder="选择主题分类" ref="category" onChange={this.changeCategory}>
                                {category.map((item,index)=>(
                                    <Option value={item.name} key={index}>{item.name}</Option>
                                ))}
                            </Select>
                        </FormItem>
                        <FormItem wrapperCol={{xs:{span:22,offset:1}}}>
                            <TextArea rows={10} ref="content"/>
                        </FormItem>
                        <Upload {...props}
                                wrapperCol={{xs:{span:22,offset:1}}}
                                name='publishImg'
                                onChange={this.submitImg}>
                            <Button style={{marginLeft:'20px'}}>
                                <Icon type="upload" /> upload
                            </Button>
                        </Upload>
                        <FormItem>
                            <Button type={'primary'} htmlType={'button'} className='submit-button' onClick={this.handleSubmit}>提交</Button>
                        </FormItem>
                    </Form>
                </div>
            </div>
        )
    }
}

const wrappePublish = Form.create()(Publish);

export default connect(state=>({...state}),{...homeAction,...publishAction,...userAction})(wrappePublish);

import './index.less';