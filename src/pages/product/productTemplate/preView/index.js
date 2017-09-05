/**
 * Created by wuyq on 2016/11/1.
 */
import {connect} from "react-redux";
import React, {Component} from "react";
import {Report} from "COM/template";
import MAP from "STATIC";
class ProductTplPreView extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        /*
         '个人风险信息查询': 'QT010001', //1.0.0
         '个人信贷多次申请核查': 'QT020002', //1.0.0
         '消费及月度收支等级评估': 'QT010003', //1.0.0
         '稳定性评估': 'QT010004',   //1.0.0
         '百融评分': 'QT010006',  //1.0.2
         '特殊名单核查': 'QT020005',  //1.0.2
         '支付消费评估': 'QT010007', //1.0.2
         '航旅国内旅客价值等级评估': 'QT010008',  //1.0.2
         '企业信用查询': 'QT030009',  //1.0.2
         '商户经营分析': 'QT030010'  //1.0.2
         */
        var html = null;
        switch(this.props.routeParams.id) {
            case MAP.SEARCHSELECT_ID_MAP.PERSONAL['个人风险信息查询']:  //个人风险信息查询
                html = <Report.personalRiskInfo disabled/>;
                break;
            case MAP.SEARCHSELECT_ID_MAP.PERSONAL['消费及月度收支等级评估']: //
                html = <Report.consumerBehaviors disabled/>;
                break;
            case MAP.SEARCHSELECT_ID_MAP.PERSONAL['稳定性评估']:
                html = <Report.personalStability disabled/>;
                break;
            case MAP.SEARCHSELECT_ID_MAP.PERSONAL['个人信贷多次申请核查']:  //个人信贷多次申请核查
                html = <Report.personalCredit disabled/>;
                break;
            //   1.0.2 
            case MAP.SEARCHSELECT_ID_MAP.PERSONAL['航旅国内旅客价值等级评估']:
                html = <Report.airTravelGrade disabled/>;
                break;
            case MAP.SEARCHSELECT_ID_MAP.PERSONAL['百融评分']:
                html = <Report.brMark disabled/>;
                break;
            case MAP.SEARCHSELECT_ID_MAP.PERSONAL['特殊名单核查']:
                html = <Report.specialList disabled/>;
                break;
            case MAP.SEARCHSELECT_ID_MAP.PERSONAL['支付消费评估']:
                html = <Report.paymentEvaluation disabled/>;
                break;
            case MAP.SEARCHSELECT_ID_MAP.PERSONAL['企业信用查询']:
                html = <Report.businessCredit disabled/>;
                break;
            case MAP.SEARCHSELECT_ID_MAP.PERSONAL['商户经营分析']:
                html = <Report.businessAnalysis disabled/>;
                break;
            default :
                html = '阿哦，找不到对应的模板~';
        }
        return (
            <div>
                {html}
            </div>
        )
    }
}
export default ProductTplPreView;
