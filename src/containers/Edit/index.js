import React, {Component} from 'react';
import './index.less'
import {connect} from 'react-redux';
import actions from '../../redux/actions/user'

import {Upload, Icon, message} from 'antd'
import MHeader from '../../components/MHeader'

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

function beforeUpload(file) {
    const isJPG = file.type === 'image/jpeg';
    if (!isJPG) {
        message.error('You can only upload JPG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJPG && isLt2M;
}

class Edit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ...props.user.userInfo
        }

    }

    componentDidMount() {
        this.props.auth();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({... nextProps.user.userInfo})
    }

    handleImgChange = (e) => {
        if (e.file.status === 'done') {
            if(e.file.response.code==1){
                alert('上传成功')
                getBase64(e.file.originFileObj, avatar => {
                        this.setState({avatar})
                    }
                )
            }else{
                alert('上传失败')
            }
        }
    }
    handleChange= (event)=> {
        let newState = {};
        newState[event.target.name] = event.target.value;
        this.setState(newState);
    }
    handle=()=>{
        let {username, email, sex, birthday,avatar}=this.state
        this.props.edit({username, email, sex, birthday})
    }
    render() {
        let email = this.state.email||'';
        let birthday = this.state.birthday||'';
        let avatar = this.state.avatar;
        return (
            <div className="edit-content">
                <MHeader title="关于我"/>
                <div className="edit-img">
                    <img src={avatar} className="blur" alt=""/>
                    <Upload
                        className="avatar-uploader"
                        name="avatar"
                        action="http://localhost:3000/modifyavatar"
                        showUploadList={false}
                        beforeUpload={beforeUpload}
                        onChange={this.handleImgChange}
                        withCredentials={true}

                    >
                        <img src={avatar} alt="" className="avatar"/>
                        <Icon type="plus" className="avatar-uploader-trigger"/>
                        <div className="username" id="usernameEdit">{this.props.user.userInfo.username}</div>
                    </Upload>
                </div>
                <form className="edit-form">
                    {/*<div className="form-group">
                        <label htmlFor="username" className="control-label">用户名</label>
                        <input type="text" className="form-control" id="username"  defaultValue={this.props.user.userInfo.username} name="username"/>
                    </div>*/}
                    <div className="form-group">
                        <label className="control-label">性别</label>
                        <div className="sex">
                            <label htmlFor="men">
                                <input type="radio" id="men" name="sex" value="男" defaultChecked={true}  onClick={this.handleChange} />男
                            </label>
                            <label htmlFor="women">
                                <input type="radio" id="women" name="sex" onClick={this.handleChange}  value="女"/>女
                            </label>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="birthday">生日</label>
                        <input type="text" className="form-control" id="birthday" name="birthday" onChange={this.handleChange} value={birthday}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">邮箱</label>
                        <input type="email" className="form-control" id="email" name="email" onChange={this.handleChange} value={email}/>
                    </div>
                    <div className="form-group save">
                        <button className="btn btn-info" onClick={this.handle}>保存</button>
                    </div>
                </form>

            </div>

        );
    }
}

export default connect(state => state, actions)(Edit)