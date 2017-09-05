/**
 * Created by Ethan on 2016/11/2.
 */
import React, {Component} from "react";
import {Link} from "react-router";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {actionSearch} from "ACTION";
import {Tabs, Row, Col, Card, Button, Radio} from "antd";
import MAP from "STATIC";
const TabPane = Tabs.TabPane;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
class Search extends Component {
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentWillMount() {
        this.props.fetchTemplatesType();
    }

    componentWillUnmount() { //离开此页
        this.props.leave();
    }
    myUserHistory(){
        this.context.router.push('/search/userHistory/home');
    }

    render() {
        const {data} = this.props;
        const operations = <Button type="primary" onClick={this.myUserHistory.bind(this)}>我的查询记录</Button>;
        return (
            <div>
                <Tabs ref="tabComponent" defaultActiveKey="1" tabBarExtraContent={operations}>
                    <TabPane tab="请选择您需要查询的产品" key="1">
                        {data && data.map((item, index) => {
                                return (
                                    <Row className="fn-mt-30" key={`row_${index}`}>
                                        <div>
                                            <div className="fn-mb-10">
                                                <h4>{item.typeName}</h4>
                                            </div>
                                            {item.templates.map((item, index) => {
                                                return (
                                                    <Link to={this.getLink(item.tempCode)} key={index}>
                                                        <Col span="8" style={{padding: '20px 3%'}}>
                                                            <Button style={{width: '100%', height: 60}}>
                                                                {item.tempName}
                                                            </Button>
                                                        </Col>
                                                    </Link>
                                                )
                                            })
                                            }
                                        </div>
                                    </Row>
                                )
                            }
                        )
                        }
                    </TabPane>
                </Tabs>
            </div>
        );
    }

    getLink(code) {
        let url = '/';
        switch(code) {
            case MAP.SEARCHSELECT_ID_MAP.PERSONAL['个人风险信息查询']:
                url = "/search/query/personalRiskInfo";
                break;
            case MAP.SEARCHSELECT_ID_MAP.PERSONAL['个人信贷多次申请核查']:
                url = "/search/query/personalCredit";
                break;
            case MAP.SEARCHSELECT_ID_MAP.PERSONAL['消费及月度收支等级评估']:
                url = '/search/query/consumerBehaviors';
                break;
            case MAP.SEARCHSELECT_ID_MAP.PERSONAL['稳定性评估']:
                url = '/search/query/personalStability';
                break;
            case MAP.SEARCHSELECT_ID_MAP.PERSONAL['支付消费评估']:
                url = '/search/query/paymentEvaluation';
                break;
            case MAP.SEARCHSELECT_ID_MAP.PERSONAL['特殊名单核查']:
                url = '/search/query/specialList';
                break;
            case MAP.SEARCHSELECT_ID_MAP.PERSONAL['百融评分']:
                url = '/search/query/brMark';
                break;
            case MAP.SEARCHSELECT_ID_MAP.PERSONAL['航旅国内旅客价值等级评估']:
                url = '/search/query/airTravelGrade';
                break;
            case MAP.SEARCHSELECT_ID_MAP.PERSONAL['企业信用查询']:
                url = '/search/query/businessCredit';
                break;
            case MAP.SEARCHSELECT_ID_MAP.PERSONAL['商户经营分析']:
                url = '/search/query/businessAnalysis';
                break;
        }
        return url;
    }
}
export default connect(
    (state, props) => ({ //StateToProps
        data: state.searchReducer.data
    }),
    dispatch => bindActionCreators({//DispatchToProps
            fetchTemplatesType: actionSearch.fetchTemplatesType,
            leave: actionSearch.leave
        },
        dispatch)
)(Search)
