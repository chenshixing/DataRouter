import React, {Component} from "react";
import {Menu, Form, Alert} from "antd";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {actionHistory} from "ACTION";
import {Report} from "COM/template";
import "./../../style.less";
const SubMenu = Menu.SubMenu;
const createForm = Form.create;
const FormItem = Form.Item;
import MAP from "STATIC";
class Detail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 'search'
        };
    }

    componentDidMount() {
        this.loadData();
    }

    componentWillUnmount() {
        this.props.action.recordUsersTemplateClear();
    }

    loadData() {
        let dataTemplateId = this.props.params.templateId;
        let dataProductCode = this.props.params.productCode;
        let dataQueryCode = this.props.params.queryCode;
        this.props.action.fetchrecordUsersTemplate(dataTemplateId, dataProductCode, dataQueryCode)
    }

    render() {
        return (
            <div className="fn-pa-10">
                <div className="panel">

                    内部产品名称：{this.props.location.query.productName} 查询编号：{this.props.routeParams.queryCode}
                    <div>{this.getHTML}</div>

                </div>
            </div>
        );
    }

    get getHTML() {
        const {recordUsersTemplate, recordUsersTemplateStatus} = this.props;
        var html = null;
        if(!recordUsersTemplate || recordUsersTemplateStatus.code != 200) {
            console.log("recordUsersTemplateStatus1", recordUsersTemplateStatus)
            return;
        } else if(recordUsersTemplate && recordUsersTemplateStatus.code == 200 && recordUsersTemplate.code == 400) {
            html = (
                <div style={{"margin": "10px 0"}}>
                    <Alert message="查询失败" description={"错误原因：" + recordUsersTemplate.message} type="error" showIcon/>
                </div>
            )
        }
        else if(recordUsersTemplate && recordUsersTemplateStatus.code == 200) {
            switch(this.props.routeParams.productCode) {
                case MAP.SEARCHSELECT_ID_MAP.PERSONAL['个人风险信息查询']:
                    html = <Report.personalRiskInfo dataSource={{
                        ...recordUsersTemplate,
                        ...{
                            base: {
                                cell: this.props.location.query.cell || "",
                                id: this.props.location.query.id || "",
                                name: this.props.location.query.name || "",
                            }
                        }
                    }}/>;
                    break;
                case MAP.SEARCHSELECT_ID_MAP.PERSONAL['消费及月度收支等级评估']:
                    html = <Report.consumerBehaviors dataSource={{
                        ...recordUsersTemplate,
                        ...{
                            base: {
                                cell: this.props.location.query.cell || "",
                                id: this.props.location.query.id || "",
                                name: this.props.location.query.name || "",
                                email: this.props.location.query.mail || "",
                            }
                        }
                    }}/>;
                    break;
                case MAP.SEARCHSELECT_ID_MAP.PERSONAL['稳定性评估']:
                    html = <Report.personalStability dataSource={{
                        ...recordUsersTemplate,
                        ...{
                            base: {
                                cell: this.props.location.query.cell || "",
                                id: this.props.location.query.id || "",
                                name: this.props.location.query.name || "",
                                email: this.props.location.query.mail || "",
                                homeCell: this.props.location.query.tel_home || "",
                                companyCell: this.props.location.query.tel_biz || "",
                            }
                        }
                    }}/>;
                    break;
                case MAP.SEARCHSELECT_ID_MAP.PERSONAL['个人信贷多次申请核查']:
                    html = <Report.personalCredit dataSource={{
                        ...recordUsersTemplate,
                        ...{
                            base: {
                                cell: this.props.location.query.cell || "",
                                id: this.props.location.query.id || "",
                                name: this.props.location.query.name || "",
                            }
                        }
                    }}/>;
                    break;
                case MAP.SEARCHSELECT_ID_MAP.PERSONAL['百融评分']:
                    html = <Report.brMark dataSource={{
                        ...recordUsersTemplate,
                        ...{
                            base: {
                                cell: this.props.location.query.cell || "",
                                id: this.props.location.query.id || "",
                                name: this.props.location.query.name || "",
                            }
                        }
                    }}/>;
                    break;
                case MAP.SEARCHSELECT_ID_MAP.PERSONAL['特殊名单核查']:
                    html = <Report.specialList dataSource={{
                        ...recordUsersTemplate,
                        ...{
                            base: {
                                cell: this.props.location.query.cell || "",
                                id: this.props.location.query.id || "",
                                name: this.props.location.query.name || "",
                                cell1: this.props.location.query.cell1 || "",
                                cell2: this.props.location.query.cell2 || "",
                                cell3: this.props.location.query.cell3 || "",
                            }
                        }
                    }}/>;
                    break;
                case MAP.SEARCHSELECT_ID_MAP.PERSONAL['支付消费评估']:
                    html = <Report.paymentEvaluation dataSource={{
                        ...recordUsersTemplate,
                        ...{
                            base: {
                                cell: this.props.location.query.cell || "",
                                id: this.props.location.query.id || "",
                                name: this.props.location.query.name || "",
                                bankCard: this.props.location.query.bankCard || "",
                            }
                        }
                    }}/>;
                    break;
                case MAP.SEARCHSELECT_ID_MAP.PERSONAL['航旅国内旅客价值等级评估']:
                    html = <Report.airTravelGrade dataSource={{
                        ...recordUsersTemplate,
                        ...{
                            base: {
                                cell: this.props.location.query.cell || "",
                                id: this.props.location.query.id || "",
                                name: this.props.location.query.name || "",
                            }
                        }
                    }}/>;
                    break;
                case MAP.SEARCHSELECT_ID_MAP.PERSONAL['企业信用查询']:
                    html = <Report.businessCredit dataSource={{
                        ...recordUsersTemplate,
                        ...{
                            base: {
                                corpName: this.props.location.query.corpName || "",
                                queryReasonID: MAP.QUERY_REASON_MAP[this.props.location.query.queryReasonID] || "",
                                orgCode: this.props.location.query.orgCode || "",
                                registerNo: this.props.location.query.registerNo || "",
                            }
                        }
                    }}/>;
                    break;
                case MAP.SEARCHSELECT_ID_MAP.PERSONAL['商户经营分析']:
                    html = <Report.businessAnalysis dataSource={{
                        ...recordUsersTemplate,
                        ...{
                            base: {
                                corpName: this.props.location.query.corpName || "",
                                queryReasonID: MAP.QUERY_REASON_MAP[this.props.location.query.queryReasonID] || "",
                            }
                        }
                    }}/>;
                    break;
                default:
                    html = (
                        <div style={{"margin": "10px 0"}}>
                            <Alert message="查询失败" description={"错误原因：" + recordUsersTemplateStatus.message} type="error"
                                   showIcon/>
                        </div>
                    );
            }
        } else {
            html = <span>找不到后端数据</span>;
        }
        return html
    }
}
function mapStateToProps(state, props) {
    //console.log("state=>")
    //console.log("hhh", state)
    return {
        recordUsersTemplate: state.historyReducer.recordUsersTemplate,
        recordUsersTemplateStatus: state.historyReducer.recordUsersTemplateStatus,
    }
}
function mapDispatchToProps(dispatch) {
    //console.log("hhhhhdddd")
    return {
        action: bindActionCreators(actionHistory, dispatch)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(createForm()(Detail));
