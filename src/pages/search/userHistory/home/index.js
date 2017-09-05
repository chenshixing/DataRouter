/**
 * Created by Ethan on 2016/11/2.
 */
import React, {Component} from 'react';
import {Router, History,Link} from 'react-router';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {actionHistory} from 'ACTION';
import moment from 'moment';
import ruleType from 'UTILS/ruleType';
import { helper } from 'UTILS';
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
const createForm = Form.create;
const FormItem = Form.Item;
const SubMenu = Menu.SubMenu;
const Option = Select.Option;
import './../../style.less'

class User extends Component {
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };
    static defaultProps = {
        recordUsers:{},
        recordUsersProducts:[],
    }
    constructor(props) {
        super(props);
        this.state = {
            //记录当前页码
            current: 1,
            keyword: '',
        };
    }
    componentDidMount(){
        this.loadData()
    }
    loadData(){
        let data = {
            "all":1,
            "pageNum":1,
            "pageSize":10,
        }
        this.props.action.fetchrecordMine(data);
    }
    //点击查询的时候
    handleSubmit(e) {
        e.preventDefault();
        var _this = this;
        this.props.form.validateFieldsAndScroll((errors, values) => {
            if (!!errors) {
               // console.log('Errors in form!!!');
                return;
            }
            var pageSize = _this.refs.table.state.pagination.pageSize;
            let data = {
                "all":0,
                "pageNum":1,
                "pageSize":pageSize || 10,
                "productTypeId":( parseInt(values.productTypeId,10) || null ),
                "state":( parseInt(values.state,10) || null ),
                "keyword":values.keyword?values.keyword.trim():null,
            }
            _this.setState({
                current:1,
                keyword:values.keyword?values.keyword.trim():null,
            })
            _this.props.form.setFieldsValue({
                ["keyword"]:values.keyword?values.keyword.trim():"",
            })
            this.props.action.fetchrecordMine(data);
        });
    }
    //获取状态
    getState(type){
        let items = {
            0:"全部",
            1:"成功",
            2:"失败",
            3:"处理中",
        }
        return items[type]
    }
    //详情
    handleDetails(record){
        let urlDetails = "/search/userHistory/detail"; //我的查询记录
        let queryObject = JSON.parse(record.queryObject);
        let linkman_cell = queryObject.linkman_cell?JSON.parse(queryObject.linkman_cell):"";

        this.context.router.push({
          pathname: `${urlDetails}/${record.templateId}/${record.productCode}/${record.queryCode}`,
          query: {
              productName: record.productName,
              cell: queryObject.cell || "",
              cell1: linkman_cell[0] || "",
              cell2: linkman_cell[1] || "",
              cell3: linkman_cell[2] || "",
              id: queryObject.id || "",
              name: queryObject.name || "",
              mail: queryObject.mail || "",
              tel_home: queryObject.tel_home || "",
              tel_biz: queryObject.tel_biz || "",
              bankCard: queryObject.bank_id || "",
              corpName: queryObject.corpName || "",
              queryReasonID: queryObject.queryReasonID || "",
              registerNo: queryObject.registerNo || "",
              orgCode:queryObject.orgCode || "",
          },
        });
    }
    render() {

        let _this = this;
        const {
            recordUsers,
            recordUsersProducts
        } = this.props;
        //const datasourcesData = this.datasourcesData()
        const {getFieldProps, getFieldError, isFieldValidating} = this.props.form;
        const productTypeIdProps = getFieldProps('productTypeId', {
            rules: [
                {
                    required: false,
                    message:"请选择内部产品类型",
                    type:"string"
                }
            ],
            onChange(value){
                var pageSize = _this.refs.table.state.pagination.pageSize;
                let data = {
                    "all":0,
                    "pageNum":1 || null,
                    "pageSize":pageSize || null,
                    "productTypeId":value || null,
                    "state":_this.props.form.getFieldValue("state") || null,
                    "keyword":_this.state.keyword,
                }
                _this.setState({
                    current:1,
                })
                _this.props.action.fetchrecordMine(data);
            },
            initialValue:""
        });
        const stateProps = getFieldProps('state', {
            rules: [
                {
                    required: false,
                    message:"请选择状态",
                    type:"string"
                }
            ],
            onChange(value){
                var pageSize = _this.refs.table.state.pagination.pageSize;
                let data = {
                    "all":0,
                    "pageNum":1 || null,
                    "pageSize":pageSize || null,
                    "productTypeId":_this.props.form.getFieldValue("productTypeId") || null,
                    "state":value || null,
                    "keyword":_this.state.keyword,
                }
                _this.setState({
                    current:1,
                })
                _this.props.action.fetchrecordMine(data);
            },
            initialValue:""
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
                        "all":0,
                        "pageNum":1 || null,
                        "pageSize":pageSize || null,
                        "productTypeId":_this.props.form.getFieldValue("productTypeId") || null,
                        "state":_this.props.form.getFieldValue("state") || null,
                        "keyword":null,
                    }
                    _this.setState({
                        "current":1,
                        "keyword":null,
                    })
                    _this.props.action.fetchrecordMine(data);
                }

            }
        });
        const formItemLayout = {
            labelCol: {
                span: 10
            },
            wrapperCol: {
                span: 14
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
            }, {
                id: '3',
                name: '处理中'
            }
        ];
        //页码配置
        const pagination = {
            total:recordUsers.total,
            showSizeChanger: true,
            pageSizeOptions:["10","20","50","100"],
            current:_this.state.current,
            // pageSizeOptions:["1"],
            // pageSize:1,
            onShowSizeChange(current, pageSize) {
                let data = {
                    "all":0,
                    "pageNum":current || null,
                    "pageSize":pageSize || null,
                    "productTypeId":_this.props.form.getFieldValue("productTypeId") || null,
                    "state":_this.props.form.getFieldValue("state") || null,
                    "keyword":_this.state.keyword,
                }
                _this.setState({
                    current:current,
                })
                _this.props.action.fetchrecordMine(data);
            },
            onChange(current) {
                var pageSize = _this.refs.table.state.pagination.pageSize;
                let data = {
                    "all":0,
                    "pageNum":current || null,
                    "pageSize":pageSize || null,
                    "productTypeId":_this.props.form.getFieldValue("productTypeId") || null,
                    "state":_this.props.form.getFieldValue("state") || null,
                    "keyword":_this.state.keyword,
                }
                _this.setState({
                    current:current,
                })
                _this.props.action.fetchrecordMine(data);
                console.log('Current: ', current);
            },
        };
        //用户查询记录 Option 信息
        if(recordUsersProducts){
            //recordUsersProducts.unshift({id:'',name:'全部'});
            var innerProductTypeIdHtml = recordUsersProducts.map((item,index)=>{
                return  <Option key={index} value={item.id.toString()}>{item.name}</Option>
            })
        }
        if(stateList){
            var stateListHtml = stateList.map((item,index)=>{
                return  <Option key={index} value={item.id.toString()}>{item.name}</Option>
            })
        }

        return (
            <div className="fn-pa-10">
                <div className="panel">

                    <div className="fn-pa-10">

                        <Form inline className="ant-advanced-search-form">
                            <FormItem   label="内部产品类型">
                                <Select
                                    style={{ width: 150 }}
                                    {...productTypeIdProps}
                                    >
                                        {innerProductTypeIdHtml}
                                </Select>
                                {/*<Cascader style={{width:250}} {...productTypeIdProps} options={datasourcesData}/>*/}
                            </FormItem>
                            <FormItem   label="状态">
                                <Select
                                    style={{ width: 150 }}
                                    {...stateProps}
                                >
                                    {stateListHtml}
                                </Select>
                                {/*<Cascader style={{width:250}} {...stateProps} options={stateList}/>*/}
                            </FormItem>
                            <FormItem  label="关键字" hasFeedback>
                                <Input style={{width:270}} {...keywordProps} placeholder="查询编号/内部产品名称/查询对象/查询方 关键字"/>
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
                        <Table
                            ref='table'
                            columns={this.columns}
                            dataSource={recordUsers.list}
                            pagination={pagination}
                             /> {/*
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
                dataIndex: 'displayId',
                render: (text, record, index) => {
                    let current = self.refs.table && self.refs.table.state.pagination.current || 1;
                    let pageSize = self.refs.table && self.refs.table.state.pagination.pageSize || 10;
                    return (
                        <div>{(current-1)*pageSize+index+1}</div>
                    )
                }
            }, {
                title: '查询编号',
                dataIndex: 'queryCode'
            }, {
                title: '内部产品名称',
                dataIndex: 'productName'
            }, {
                title: '内部产品类型',
                dataIndex: 'productType'

            }, {
                title: '查询时间',
                dataIndex: 'queryTime'

            }, {
                title: '查询对象',
                dataIndex: 'queryObject',
                render: (text,resord,index) => {
                    //let queryObject = JSON.parse(resord.queryObject) || {};
                    //let queryObjectId = queryObject.id?queryObject.id.replace(/^(.{6}).*(.{2})$/,"$1**********$2"):"没有数据"
                    return (
                        <div>
                            <div>{helper.templateQueryObject(resord)}</div>
                        </div>
                    )
                }
            }, {
                title: '查询方',
                dataIndex: 'operator'

            }, {
                title: '状态',
                dataIndex: 'state',
                render: (text,record,index) => {
                    //record.state 返回 0 1 2 ，当返回2的时候，才会出现 失败Tooltip提示
                    return (
                        <div>
                            {self.getState(record.state)}
                            {
                                record.state==2 && record.reason
                                ?
                                <Tooltip placement="top" title={record.reason}>
                                    <Icon type="exclamation-circle-o" />
                                </Tooltip>
                                :
                                null
                            }
                        </div>
                    )
                }

            }, {
                title: '操作',
                dataIndex: 'id',
                className: 'text-align-center',
                width:"150px",
                render: (text,record,index) => {
                    return (
                        <div>
                            {
                                record.state==1
                                ?
                                <a href="javascript:;" onClick={this.handleDetails.bind(this,record)}>详情</a>
                                :
                                <a disabled href="javascript:void(0)">详情</a>
                            }
                        </div>
                    )
                }

            }
        ];
        return columns
    }


}




//export default createForm()(Data);
//将state.counter绑定到props的counter
function mapStateToProps(state, props) {
    //console.log("state=>")
    //console.log("hhh", state)
    return {
        recordUsers:state.historyReducer.recordUsers,
        recordUsersProducts:state.historyReducer.recordUsersProducts,
    }
}
//将action的所有方法绑定到props上
//去掉action会好爽，但代码不好看。等于直接掉方法
function mapDispatchToProps(dispatch) {
    //console.log("hhhhhdddd")
    return {
        action: bindActionCreators(actionHistory, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(createForm()(User));
