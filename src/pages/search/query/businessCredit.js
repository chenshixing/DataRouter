import React, {Component} from "react";
import {Row, Col, Icon, Form, Input, Button, Alert, Tabs, Select} from "antd";
import {Report} from "COM/template";
import {helper} from "UTILS";
import ruleType from "UTILS/ruleType";
import ConfirmModal from "COM/confirmModal";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {actionSearch} from "ACTION";
import MAP from "STATIC";
const createForm = Form.create;
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
const Option = Select.Option;
import "./../select/style.less"
class BusinessCredit extends Component {
    static defaultProps = {
        templateData: null,
    }

    constructor(props) {
        super(props);
        this.state = {
            templateValus: {
                corpName: "",
                orgCode: "",
                queryReasonID: "",
                registerNo: "",
            },
            isShowModal: false,
            searchValues: {
                corpName: "",
                orgCode: "",
                queryReasonID: "",
                registerNo: "",
            },
            //设置 企业名称  组织机构代码/社会信用代码 工商注册号 的类型 默认企业名称
            selectType: "corpName"
        };
    }

    componentDidMount() {
        this.props.action.fetchInnerprodsTempDetail(MAP.SEARCHSELECT_ID_MAP.PERSONAL['企业信用查询']);
    }

    componentWillUnmount() {
        this.props.action.clearMessage();
        this.props.action.clearTemplateData();
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((errors, values) => {
            if (!!errors) {
                return;
            }
            this.setState({searchValues: values, isShowModal: true});
            //this.setState({templateValus: values})
            //this.props.action.clearMessage();
            //this.props.action.clearTemplateData();
            //this.props.action.fetchTemplateDataSearch(MAP.SEARCHSELECT_ID_MAP.PERSONAL['稳定性评估'], values);
        });
    }

    handleOk() {
        let values = this.state.searchValues;
        this.setState({templateValus: values, isShowModal: false});
        this.props.action.clearMessage();
        this.props.action.clearTemplateData();
        this.props.action.fetchTemplateDataSearch(MAP.SEARCHSELECT_ID_MAP.PERSONAL['企业信用查询'], values);
    }

    handleCancel() {
        this.setState({isShowModal: false});
    }

    handleReset(e) {
        e.preventDefault();
        this.props.form.resetFields();
    }

    handleSelectType(value) {
        this.setState({
            selectType: value
        })
    }


    render() {
        const _this = this;
        const {getFieldProps} = this.props.form;
        const queryReasonIDProps = getFieldProps('queryReasonID', {
            rules: [
                {
                    required: true,
                    message: '查询原因不能为空'
                }
            ]
        });
        const formItemLayout = {
            labelCol: {
                span: 8
            },
            wrapperCol: {
                span: 16
            }
        };

        let {templateData, templateDataError, innerprodsTempDetail} = this.props;

        return (
            <div className="fn-pa-10">
                <div className="panel">
                    <Tabs defaultActiveKey="1">
                        <TabPane tab="企业信用查询" key="1">
                            <h3>
                                {
                                    innerprodsTempDetail.prodDesc
                                        ?
                                        <span
                                            style={{
                                                "color": "#b7b7b7",
                                                "fontSize": "14px",
                                                "fontWeight": "normal",
                                            }}
                                        >
                               {innerprodsTempDetail.prodDesc}
                               </span>
                                        :
                                        null
                                }

                            </h3>
                            <div style={{
                                padding: "20px"
                            }}>
                                {/*Form*/}
                                <Form >
                                    <Row>
                                        <Col xs={{span: 8}} lg={{span: 9}}>
                                            <FormItem
                                                className="select-type"
                                            >
                                                <span
                                                    style={{
                                                        "display": "inlineBlock",
                                                        "marginRight": "4px",
                                                        "fontFamily": "SimSun",
                                                        "fontSize": "12px",
                                                        "color": "#f50",
                                                    }}>
                                                    *:
                                                </span>
                                                <Select
                                                    size="default"
                                                    style={{width: '30%', marginRight: "4px"}}
                                                    defaultValue="corpName"
                                                    onChange={this.handleSelectType.bind(this)}
                                                >
                                                    <Option value="corpName">企业名称</Option>
                                                    <Option value="orgCode">组织机构代码/社会信用代码</Option>
                                                    <Option value="registerNo">工商注册号</Option>
                                                </Select>
                                                {/*<Input style={{width: '70%'}} {...corpNameProps} placeholder="企业名称" />*/}
                                                {
                                                    this.state.selectType == "corpName"
                                                        ?
                                                        <Input
                                                            size="default"
                                                            style={{width: '60%'}}
                                                            {...getFieldProps('corpName', {
                                                                rules: [
                                                                    {
                                                                        required: true,
                                                                        message: '企业名称不能为空'
                                                                    },
                                                                    ruleType('companyName')
                                                                ]
                                                            })}
                                                            placeholder="企业名称"
                                                        />
                                                        :
                                                        null
                                                }
                                                {
                                                    this.state.selectType == "orgCode"
                                                        ?
                                                        <Input
                                                            style={{width: '60%'}}
                                                            size="default"
                                                            {...getFieldProps('orgCode', {
                                                                rules: [
                                                                    {
                                                                        required: true,
                                                                        message: '组织机构代码/社会信用代码不能为空'
                                                                    },
                                                                    {
                                                                        min: 9,
                                                                        max: 18,
                                                                        message: '仅支持9-18位'
                                                                    },
                                                                    ruleType('en+num+str')
                                                                ]
                                                            })} placeholder="组织机构代码/社会信用代码"/>
                                                        :
                                                        null
                                                }
                                                {
                                                    this.state.selectType == "registerNo"
                                                        ?
                                                        <Input
                                                            style={{width: '60%'}}
                                                            size="default"
                                                            {...getFieldProps('registerNo', {
                                                                rules: [
                                                                    {
                                                                        required: true,
                                                                        message: '工商注册号不能为空'
                                                                    },
                                                                    {
                                                                        min: 1,
                                                                        max: 20,
                                                                        message: '仅支持1-20位'
                                                                    },
                                                                    ruleType('en+num+str')
                                                                ]
                                                            })} placeholder="工商注册号"/>
                                                        :
                                                        null
                                                }
                                            </FormItem>
                                        </Col>
                                        <Col xs={{span: 8}} lg={{span: 9}}>
                                            <FormItem {...formItemLayout} label="查询原因" hasFeedback>
                                                <Select
                                                    {...queryReasonIDProps}
                                                    placeholder="请选择"
                                                    style={{width: '100%'}}
                                                    size="default"
                                                >
                                                    <Option value="101">贷款审批</Option>
                                                    <Option value="102">贷款贷后管理</Option>
                                                    <Option value="103">贷款催收</Option>
                                                    <Option value="104">审核担保人信用</Option>
                                                    <Option value="105">担保/融资审批</Option>
                                                    <Option value="999">其他</Option>
                                                </Select>
                                            </FormItem>
                                        </Col>

                                        <Col xs={{span: 6, offset: 1}} lg={{span: 5, offset: 1}}>
                                            <Button type="primary" onClick={this.handleSubmit.bind(this)}>
                                                <Icon type="search"/>
                                                查询
                                            </Button>
                                            <Button type="ghost" onClick={this.handleReset.bind(this)} style={{
                                                "marginLeft": 10
                                            }}>
                                                重置
                                            </Button>
                                        </Col>
                                    </Row>
                                    {/*
                                     <Row>
                                     <Col xs={{span: 8}} lg={{span: 9}}>
                                     <FormItem {...formItemLayout} label="组织机构代码/社会信用代码" hasFeedback>
                                     <Input {...orgCodeProps} placeholder="组织机构代码/社会信用代码"/>
                                     </FormItem>
                                     </Col>
                                     <Col xs={{span: 8}} lg={{span: 9}}>
                                     <FormItem {...formItemLayout} label="工商注册号" hasFeedback>
                                     <Input {...registerNoProps} placeholder="工商注册号"/>
                                     </FormItem>
                                     </Col>
                                     </Row>
                                     */}


                                </Form>
                            </div>
                        </TabPane>
                    </Tabs>
                    <Tabs defaultActiveKey="1">
                        <TabPane tab="查询结果" key="1">
                            <div style={{
                                padding: "20px"
                            }}>
                                {
                                    templateDataError
                                        ? <Alert message="查询失败" description={"错误原因：" + templateDataError.status.message}
                                                 type="error" showIcon/>
                                        : null
                                }
                                {
                                    templateData && templateData.data.code != '200'
                                        ? <Alert message="提示" description={templateData.data.message} type="error"
                                                 showIcon/>
                                        : <div>
                                        {this.report}
                                    </div>
                                }
                            </div>
                        </TabPane>
                    </Tabs>
                </div>
                <ConfirmModal visible={this.state.isShowModal} dataSource={this.state.searchValues}
                              onCancel={this.handleCancel.bind(this)} onOk={this.handleOk.bind(this)}/>
            </div>
        );
    }

    get report() {
        const {templateData} = this.props;
        if (!templateData)
            return;
        return (<Report.businessCredit dataSource={{
            ...templateData.data,
            ...{
                base: {
                    corpName: this.state.templateValus.corpName,
                    orgCode: this.state.templateValus.orgCode,
                    queryReasonID: MAP.QUERY_REASON_MAP[this.state.templateValus.queryReasonID],
                    registerNo: this.state.templateValus.registerNo,
                }
            }
        }}/>);
    }
}
function mapStateToProps(state, props) {
    //console.log("state=>")
    return {
        templateData: state.searchReducer.templateData,
        templateDataError: state.searchReducer.templateDataError,
        innerprodsTempDetail: state.searchReducer.innerprodsTempDetail,
    }
}
function mapDispatchToProps(dispatch) {
    return {
        action: bindActionCreators(actionSearch, dispatch)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(createForm()(BusinessCredit));
