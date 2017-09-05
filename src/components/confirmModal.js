/**
 * Created by wuyq on 2017/1/12.
 * Modify by ethan on 2017/2/21.
 */
import React, {Component} from "react";
import {Form, Button, Modal} from "antd";
import MAP from "STATIC";
const FormItem = Form.Item;
const ITEMNAME = {
    name: '姓名',
    id: '身份证号',
    cell: '手机号',
    cell1: '手机号1',
    cell2: '手机号2',
    cell3: '手机号3',
    mail: '邮箱',
    tel_home: '家庭座机号',
    tel_biz: '公司座机号',
    reason: '查询原因',
    bankCard: '银行卡号',
    businessNum: '工商注册号',
    organization: '组织机构代码/社会信用代码',
    corpName: "公司名称",
    queryReasonID: "查询原因",
    orgCode: "组织机构代码",
    registerNo: "工商注册号",
    bank_id:"银行卡号"
}
class ConfirmModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: this.props.dataSource,
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            dataSource: nextProps.dataSource
        })
    }

    render() {
        const formItemLayout = {
            labelCol: {
                span: 10
            },
            wrapperCol: {
                span: 14
            }
        };
        var itemsHtml = [];
        var data = this.state.dataSource;
        for(var key in data) {
            data[key] && itemsHtml.push(<FormItem
                key={key}
                {...formItemLayout}
                label={ITEMNAME[key]}
                style={{marginBottom: '5px'}}>
                {
                    ITEMNAME[key] == "查询原因"
                        ?
                        <p className="ant-form-text">{MAP.QUERY_REASON_MAP[data[key]]}</p>
                        :
                        <p className="ant-form-text">{data[key]}</p>
                }
            </FormItem>)
        }
        // console.log('confirmModal-props:',this.props);
        return (
            <Modal title="请核对被查询人信息" visible={this.props.visible} onCancel={this.props.onCancel}
                   dataSource
                   footer={[
                       <Button key="back" type="ghost" onClick={this.props.onCancel}>取消</Button>,
                       <Button key="submit" type="primary" onClick={this.props.onOk}>继续查询</Button>
                   ]}>
                {itemsHtml}
            </Modal>
        );
    }
}
export default ConfirmModal;
