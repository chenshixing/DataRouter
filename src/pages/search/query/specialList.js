/**
 * Created by Ethan on 2017/2/14.
 * 9:55
 *
 */
import React, {Component} from "react";
import {Row, Col, Icon, Form, Input, Button, Alert, Tabs} from "antd";
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
class SpecialList extends Component {
    static defaultProps = {
        templateData: null,
        templateValus: {
            cell: "",
            id: "",
            name: "",
            mail: "",
            tel_home: "",
            tel_biz: ""
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            templateValus: {
                cell: "",
                cell1: "",
                cell2: "",
                cell3: "",
                id: "",
                name: "",
            },
            isShowModal: false,
            searchValues: {
                cell: "",
                cell1: "",
                cell2: "",
                cell3: "",
                id: "",
                name: "",
            }
        };
    }

    componentDidMount() {
        this.props.action.fetchInnerprodsTempDetail(MAP.SEARCHSELECT_ID_MAP.PERSONAL['特殊名单核查']);
    }

    componentWillUnmount() {
        this.props.action.clearMessage();
        this.props.action.clearTemplateData();
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((errors, values) => {
            if(!!errors) {
                return;
            }
            this.setState({searchValues: values, isShowModal: true});
        });
    }

    handleOk() {
        let values = this.state.searchValues;
        let nValue = {
            cell:values.cell,
            linkman_cell: [],
            id: values.id,
            name: values.name,
        };
        this.setState({templateValus: values, isShowModal: false});
        this.props.action.clearMessage();
        this.props.action.clearTemplateData();
        var arr = [];
        //按后台建议，linkman_cell 传数组
        if(values.cell1 != "" && typeof(values.cell1) != "undefined") arr.push(values.cell1);
        if(values.cell2 != "" && typeof(values.cell2) != "undefined") arr.push(values.cell2);
        if(values.cell3 != "" && typeof(values.cell3) != "undefined") arr.push(values.cell3);
        nValue.linkman_cell =  arr;
        this.props.action.fetchTemplateDataSearch(MAP.SEARCHSELECT_ID_MAP.PERSONAL['特殊名单核查'], nValue);
    }

    handleCancel() {
        this.setState({isShowModal: false});
    }

    handleReset(e) {
        e.preventDefault();
        this.props.form.resetFields();
    }

    render() {
        const {getFieldProps} = this.props.form;
        const nameProps = getFieldProps('name', {
            rules: [
                {
                    required: true,
                    message: '姓名不能为空'
                }, {
                    min: 1,
                    max: 30,
                    message: '1-30位中英文字符、半角标点符号•.,-_~ *()'
                },
                ruleType('cn+en+str')
            ]
        });
        const idCardProps = getFieldProps('id', {
            rules: [
                {
                    required: true,
                    message: '身份证号码不能为空'
                },
                ruleType('id-card')
            ]
        });
        const phoneProps = getFieldProps('cell', {
            rules: [
                {
                    required: true,
                    message: '手机号码不能为空'
                },
                ruleType('mobile')
            ]
        });
        const phoneProps1 = getFieldProps('cell1', {
            rules: [
                {
                    required: false,
                    message: '手机号码不能为空'
                },
                ruleType('mobile')
            ]
        });
        const phoneProps2 = getFieldProps('cell2', {
            rules: [
                {
                    required: false,
                    message: '手机号码不能为空'
                },
                ruleType('mobile')
            ]
        });
        const phoneProps3 = getFieldProps('cell3', {
            rules: [
                {
                    required: false,
                    message: '手机号码不能为空'
                },
                ruleType('mobile')
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
                        <TabPane tab="特殊名单核查" key="1">
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
                                <Form className="ant-advanced-search-form">
                                    <Row>
                                        <Col xs={{span: 5}} lg={{span: 6}}>
                                            <FormItem {...formItemLayout} label="姓名" hasFeedback>
                                                <Input {...nameProps} placeholder="姓名"/>
                                            </FormItem>
                                        </Col>
                                        <Col xs={{span: 5}} lg={{span: 6}}>
                                            <FormItem {...formItemLayout} label="身份证号" hasFeedback>
                                                <Input {...idCardProps} placeholder="身份证号"/>
                                            </FormItem>
                                        </Col>
                                        <Col xs={{span: 5}} lg={{span: 6}}>
                                            <FormItem {...formItemLayout} label="手机号" hasFeedback>
                                                <Input {...phoneProps} placeholder="手机号"/>
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

                                    <Row>
                                        <Col xs={{span: 5}} lg={{span: 6}}>
                                            <FormItem {...formItemLayout} label="手机号1" hasFeedback>
                                                <Input {...phoneProps1} placeholder="被查询人亲属或好友的手机号"/>
                                            </FormItem>
                                        </Col>
                                        <Col xs={{span: 5}} lg={{span: 6}}>
                                            <FormItem {...formItemLayout} label="手机号2" hasFeedback>
                                                <Input {...phoneProps2} placeholder="被查询人亲属或好友的手机号"/>
                                            </FormItem>
                                        </Col>
                                        <Col xs={{span: 5}} lg={{span: 6}}>
                                            <FormItem {...formItemLayout} label="手机号3" hasFeedback>
                                                <Input {...phoneProps3} placeholder="被查询人亲属或好友的手机号"/>
                                            </FormItem>
                                        </Col>
                                    </Row>


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
        if(!templateData)
            return;
        return (<Report.specialList dataSource={{
            ...templateData.data,
            ...{
                base: {
                    cell: this.state.templateValus.cell,
                    cell1: this.state.templateValus.cell1,
                    cell2: this.state.templateValus.cell2,
                    cell3: this.state.templateValus.cell3,
                    id: this.state.templateValus.id,
                    name: this.state.templateValus.name
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
export default connect(mapStateToProps, mapDispatchToProps)(createForm()(SpecialList));
