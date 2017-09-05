/**
 * Created by Ethan on 2017/2/14.
 * 9:56
 *
 */
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
class BusinessAnalysis extends Component {
    static defaultProps = {
        templateData: null,
    }

    constructor(props) {
        super(props);
        this.state = {
            templateValus: {
                corpName: "",
                queryReasonID:"",
            },
            isShowModal: false,
            searchValues: {
                corpName: "",
                queryReasonID:"",
            }
        };
    }

    componentDidMount() {
        this.props.action.fetchInnerprodsTempDetail(MAP.SEARCHSELECT_ID_MAP.PERSONAL['商户经营分析']);
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
        this.setState({templateValus: values, isShowModal: false});
        this.props.action.clearMessage();
        this.props.action.clearTemplateData();
        this.props.action.fetchTemplateDataSearch(MAP.SEARCHSELECT_ID_MAP.PERSONAL['商户经营分析'], values);
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
        const corpNameProps = getFieldProps('corpName', {
            rules: [
                {
                    required: true,
                    message: '商户名称不能为空'
                },
                ruleType('companyName')
            ]
        });
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
                        <TabPane tab="商户经营分析" key="1">
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
                                        <Col xs={{span: 8}} lg={{span: 9}}>
                                            <FormItem {...formItemLayout} label="商户名称" hasFeedback>
                                                <Input {...corpNameProps} placeholder="商户名称"/>
                                            </FormItem>
                                        </Col>
                                        <Col xs={{span: 8}} lg={{span: 9}}>
                                            <FormItem {...formItemLayout} label="查明原因" hasFeedback>
                                                <Select {...queryReasonIDProps} placeholder="请选择" style={{width: '100%'}}>
                                                    <Option value="101">贷款审批</Option>
                                                    <Option value="102">贷款贷后管理</Option>
                                                    <Option value="103">贷款催收</Option>
                                                </Select>
                                            </FormItem>
                                        </Col>
                                        <Col xs={{span: 7, offset: 1}} lg={{span: 5, offset: 1}}>
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
        return (<Report.businessAnalysis dataSource={{
            ...templateData.data,
            ...{
                base: {
                    corpName: this.state.templateValus.corpName,
                    queryReasonID: MAP.QUERY_REASON_MAP[this.state.templateValus.queryReasonID],
                }
            }
        }}/>);
    }
}
function mapStateToProps(state, props) {
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
export default connect(mapStateToProps, mapDispatchToProps)(createForm()(BusinessAnalysis));
