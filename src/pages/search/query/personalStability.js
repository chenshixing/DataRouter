import React, {Component} from "react";
import {Row, Col, Icon, Form, Input, Button, Alert,Tabs} from "antd";
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
class PersonalStability extends Component {
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
                id: "",
                name: "",
                mail: "",
                tel_home: "",
                tel_biz: ""
            },
            isShowModal: false,
            searchValues: {
                cell: "",
                id: "",
                name: "",
                mail: "",
                tel_home: "",
                tel_biz: ""
            }
        };
    }

    componentDidMount() {
        this.props.action.fetchInnerprodsTempDetail(MAP.SEARCHSELECT_ID_MAP.PERSONAL['稳定性评估']);
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
        this.props.action.fetchTemplateDataSearch(MAP.SEARCHSELECT_ID_MAP.PERSONAL['稳定性评估'], values);
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
        //传递的时候穿mail,参数是email
        const mailProps = getFieldProps('mail', {
            rules: [
                {
                    required: false
                },
                {
                    min: 1,
                    max: 99,
                    message: '仅输入1-99位'
                },
                ruleType('email')
            ]
        });
        const tel_homeProps = getFieldProps('tel_home', {
            rules: [
                {
                    required: false
                },
                ruleType('telephone')
            ]
        });
        const tel_bizProps = getFieldProps('tel_biz', {
            rules: [
                {
                    required: false
                },
                ruleType('telephone')
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
                        <TabPane tab="稳定性评估" key="1">
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
                                            <FormItem {...formItemLayout} label="邮箱" hasFeedback>
                                                <Input  {...mailProps} placeholder="邮箱"/>
                                            </FormItem>
                                        </Col>
                                        <Col xs={{span: 5}} lg={{span: 6}}>
                                            <FormItem {...formItemLayout} label="家庭座机号" hasFeedback>
                                                <Input  {...tel_homeProps} placeholder="家庭座机号"/>
                                            </FormItem>
                                        </Col>
                                        <Col xs={{span: 5}} lg={{span: 6}}>
                                            <FormItem {...formItemLayout} label="公司座机号" hasFeedback>
                                                <Input  {...tel_bizProps} placeholder="公司座机号"/>
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
        return (<Report.personalStability dataSource={{
            ...templateData.data,
            ...{
                base: {
                    cell: this.state.templateValus.cell,
                    id: this.state.templateValus.id,
                    name: this.state.templateValus.name,
                    email: this.state.templateValus.mail,
                    homeCell: this.state.templateValus.tel_home,
                    companyCell: this.state.templateValus.tel_biz
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
export default connect(mapStateToProps, mapDispatchToProps)(createForm()(PersonalStability));
