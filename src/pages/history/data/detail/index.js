/**
 * Created by Ethan on 2016/11/2.
 */
import React, {Component} from 'react';
import {Router, History} from 'react-router';
import {
    Row,
    Col,
    Menu,
    Icon,
    Breadcrumb,
    Table,
    Button,
    Form,
    Cascader,
    Input,
    Select,
    Tooltip
} from 'antd';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {actionHistory} from 'ACTION';
import moment from 'moment';
import ruleType from 'UTILS/ruleType';
import { helper } from 'UTILS';
const createForm = Form.create;
const FormItem = Form.Item;
const SubMenu = Menu.SubMenu;
const Option = Select.Option;
import './../../style.less'
class Detail extends Component {
    static defaultProps = {
        recordOriginalProductsId: {}
    }

    constructor(props) {
        super(props);
        this.state = {
            //记录当前页码
            current: 1,
            keyword: '',
            params: "",
        };
    }

    componentDidMount() {
        this.loadData()
    }

    loadData() {
        // let data = {
        //     "all": 1,
        //     "keyword": "",
        //     "all": 1,
        //     "state": 1,
        //     "pageNum": 1,
        //     "pageSize": 1
        // }
        let params = this.props.params.obj;
        this.setState({
            params: params
        })
        let data = {
            "all": 1,
            "pageNum": 1,
            "pageSize": 10
        }
        this.props.action.fetchOriginalProductsId(params, data)
    }
    componentWillUnmount(){
        //清除数据
        this.props.action.clearRecordOriginalProductsId();
    }
    //查询
    handleSubmit(e) {
        e.preventDefault();
        let _this = this;
        this.props.form.validateFieldsAndScroll((errors, values) => {
            if(!!errors) {
                //console.log('Errors in form!!!');
                return;
            }
            //console.log('Submit!!!');
            //console.log(values);
            let data = {
                "all": 0,
                "pageNum": 1,
                "pageSize": 10,
                "keyword":values.keyword?values.keyword.trim():null,
                "state": ( values.state || null),
            }
            _this.setState({
                "current":1,
                "keyword": values.keyword?values.keyword.trim():null,
            })
            _this.props.form.setFieldsValue({
                ["keyword"]:values.keyword?values.keyword.trim():"",
            })
            _this.props.action.fetchOriginalProductsId(_this.state.params, data)
        });
    }

    render() {
        let _this = this;
        const {recordOriginalProductsId} = this.props;
        const {getFieldProps, getFieldError, isFieldValidating} = this.props.form;
        const stateProps = getFieldProps('state', {
            rules: [
                {
                    required: false,
                }
            ],
            onChange: (value) => {
                var pageSize = _this.refs.table.state.pagination.pageSize;
                let data = {
                    "all": 0,
                    "pageNum": 1,
                    "pageSize": pageSize,
                    "keyword": _this.state.keyword,
                    "state": ( value || null)
                }
                _this.setState({
                    current:1,
                })
                _this.props.action.fetchOriginalProductsId(_this.state.params, data)
            },
            initialValue: ""
        });
        const keywordProps = getFieldProps('keyword', {
            rules: [
                {
                    required: false,
                },
            ],
            onChange:(e)=>{
                if(e.target.value==""){
                    var pageSize = _this.refs.table.state.pagination.pageSize;
                    let data = {
                        "all": 0,
                        "pageNum": 1,
                        "pageSize": pageSize,
                        "keyword":  null,
                        "state": ( _this.props.form.getFieldValue("state") || null)
                    }
                    _this.setState({
                        "current":1,
                        "keyword":null,
                    })
                    _this.props.action.fetchOriginalProductsId(_this.state.params, data)
                }

            }
        });
        const formItemLayout = {
            labelCol: {
                span: 8
            },
            wrapperCol: {
                span: 16
            }
        };
        const stateList = [
            {
                id: '',
                name: '全部'
            }, {
                id: '1',
                name: '成功'
            }, {
                id: '2',
                name: '失败'
            }
        ];
        const pagination = {
            total: recordOriginalProductsId.total,
            showSizeChanger: true,
            pageSizeOptions: [
                "10", "20", "50", "100"
            ],
            current:_this.state.current,
            // pageSizeOptions:["1"],
            // pageSize:1,
            onShowSizeChange(current, pageSize) {
                let data = {
                    "all": 0,
                    "keyword": _this.state.keyword,
                    "pageNum": current || null,
                    "pageSize": pageSize || null,
                    "state": _this.props.form.getFieldValue("state") || null
                }
                _this.setState({
                    current:current,
                })
                _this.props.action.fetchOriginalProductsId(_this.state.params, data)
            },
            onChange(current) {
                var pageSize = _this.refs.table.state.pagination.pageSize;
                let data = {
                    "all": 0,
                    "keyword": _this.state.keyword,
                    "pageNum": current || null,
                    "pageSize": pageSize || null,
                    "state": _this.props.form.getFieldValue("state") || null
                }
                _this.setState({
                    current:current,
                })
                _this.props.action.fetchOriginalProductsId(_this.state.params, data)
            }
        };
        if(stateList) {
            var stateListHtml = stateList.map((item, index) => {
                return <Option key={index} value={item.id.toString()}>{item.name}</Option>
            })
        }
        console.log(this)
        return (
            <div className="fn-pa-10">
                <div className="panel">
                    <div style={{
                        "margin": "20px 0"
                    }}></div>
                    <div className="fn-pa-10">

                        <Form inline className="ant-advanced-search-form">

                            <FormItem label="调用状态">
                                <Select style={{
                                    width: 150
                                }} {...stateProps}>
                                    {stateListHtml}
                                </Select>
                            </FormItem>
                            <FormItem label="关键字">
                                <Input style={{
                                    width: 325
                                }} {...keywordProps} placeholder="数据编号/查询编号/内部产品名称/查询方/查询对象 关键字"/>
                            </FormItem>
                            <div className="ant-row ant-form-item" style={{
                                "verticalAlign": "top"
                            }}>
                                <Button disabled={
                                        _this.props.form.getFieldValue("keyword")
                                        ?
                                        false
                                        :
                                        true
                                    } type="primary" onClick={this.handleSubmit.bind(this)}>查询</Button>
                            </div>
                        </Form>

                    </div>
                    <div>
                        {/*
                        <h4 className="fn-pa-10">
                            数据源产品名称：
                            {this.state.historyDataHomeDetails.productName}
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            调用接口次数 {this.state.historyDataHomeDetails.callTimes} 次 ，
                            其中成功{this.state.historyDataHomeDetails.succeededTimes}次，
                            失败{this.state.historyDataHomeDetails.failedTimes}次
                        </h4>
                        */}
                        <h4 className="fn-pa-10">
                            数据源产品名称：
                            {this.props.location.query.productName}
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            调用接口次数 {this.props.location.query.callTimes} 次 ，
                            其中成功{this.props.location.query.succeededTimes}次，
                            失败{this.props.location.query.failedTimes}次
                        </h4>
                        <Table ref='table' columns={this.columns} dataSource={recordOriginalProductsId.list}
                               pagination={pagination}/> {/*
                     title={() => '页头'}
                     footer={() => '页脚'}
                     */}
                    </div>
                </div>
            </div>
        );
    }

    //初始化表格
    get columns() {
        var self = this;
        const columns = [
            {
                title: '序号',
                dataIndex: 'id',
                render: (text, record, index) => {
                    let current = self.refs.table && self.refs.table.state.pagination.current || 1;
                    let pageSize = self.refs.table && self.refs.table.state.pagination.pageSize || 10;
                    return (
                        <div>{(current-1)*pageSize+index+1}</div>
                    )
                }
            }, {
                title: '数据编号',
                dataIndex: 'dataCode',
                render: (text,resord,index) => {
                    let dataCode = resord.dataCode ? resord.dataCode : "没有数据"
                    return (
                        <div>
                            {dataCode}
                        </div>
                    )
                }
            }, {
                title: '查询编号',
                dataIndex: 'queryCode'
            }, {
                title: '内部产品编号',
                dataIndex: 'productCode'
            }, {
                title: '内部产品名称',
                dataIndex: 'productName'
            }, {
                title: '查询方',
                dataIndex: 'operator'
            }, {
                title: '查询对象',
                dataIndex: 'queryObject',
                render: (text,resord,index) => {
                    // let queryObject = JSON.parse(resord.queryObject) || {};
                    // let queryObjectId = null;
                    // let queryObjectName = null;
                    // //兼容 鹏元征信产品
                    // if( helper.isPengyuan(resord.productCode) ){
                    //     queryObjectId = queryObject.corpName?queryObject.corpName:"没有数据"
                    // }else{
                    //     queryObjectId = queryObject.id?queryObject.id.replace(/^(.{6}).*(.{2})$/,"（$1**********$2）"):"没有数据"
                    //     queryObjectName = queryObject.name;
                    // }
                    // return (
                    //     <div>
                    //         {queryObjectName}
                    //         {queryObjectId}
                    //     </div>
                    // )
                    return (
                        <div>{helper.templateQueryObject(resord)}</div>
                    )
                }
            }, {
                title: '调用时间',
                dataIndex: 'queryTime'
            }, {
                title: '返回时间',
                dataIndex: 'returnTime'
            }, {
                title: '调用状态',
                dataIndex: 'state',
                render: (text, record, index) => {
                    //record.state 返回 0 1 2 ，当返回2的时候，才会出现 失败Tooltip提示
                    return (
                        <div>
                            {record.state == 1
                                ? "成功"
                                : "失败"
                            }
                            {
                                (record.state == 2) && (record.reason)
                                    ?
                                    <Tooltip placement="top" title={record.reason}>
                                        <Icon type="exclamation-circle-o"/>
                                    </Tooltip>
                                    :
                                    null
                            }
                        </div>
                    )
                }
            }
        ];
        return columns
    }

    get data() {
        const data = [
            {
                ceshi1: '1',
                ceshi2: 'BR001',
                ceshi3: '查询身份证全项信息',
                ceshi4: '个人信息查询',
                ceshi5: '10',
                ceshi6: '8',
                ceshi7: '2',
                ceshi8: '2016-09-20 06：00：35',
                ceshi9: '2016-09-20 06：00：352',
                ceshi10: 0
            }
        ];
        return data
    }
}
//将state.counter绑定到props的counter
function mapStateToProps(state, props) {
    //console.log("state=>")
    //console.log("hhh", state)
    return {recordOriginalProductsId: state.historyReducer.recordOriginalProductsId}
}
//将action的所有方法绑定到props上
//去掉action会好爽，但代码不好看。等于直接掉方法
function mapDispatchToProps(dispatch) {
    //console.log("hhhhhdddd")
    return {
        action: bindActionCreators(actionHistory, dispatch)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(createForm()(createForm()(Detail)));
