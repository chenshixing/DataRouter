/**
 * Created by Ethan on 2017/2/14.
 * 9:56
 * 商户经营分析
 */
import {BaseReport} from "./BaseReport";
import React from "react";
import {helper} from "UTILS";
import ReactEcharts from "echarts-for-react";
import {Row, Col, Tooltip, Icon, Collapse} from "antd";
import "./style.less";
const Panel = Collapse.Panel
export class BusinessAnalysis extends BaseReport {
    static defaultProps = {
        disabled: null,//是否模板
        dataSource: {}
    }

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        const {disabled, dataSource}=this.props;
        return (
            <div className="fn-pa-10">
                <h2 style={this.css.center}>
                    <span style={this.css.color}>商户经营分析</span>
                </h2>
                <div className="report-table fn-mb-20">
                    <Row>
                        <Col span={6}>查询主体</Col>
                        <Col span={7} offset={11}>
                            <span>查询编号</span>
                            {(!disabled && dataSource) && dataSource.queryCode || ''}
                        </Col>
                    </Row>
                    <Row>
                        <Col span={4}>商户名称</Col>
                        <Col span={8}>{this.base.corpName}</Col>
                        <Col span={4}>统计周期</Col>
                        <Col span={8}>近12个月</Col>
                    </Row>
                    <Row>
                        <Col span={4}>查询原因</Col>
                        <Col span={8}>{this.base.queryReasonID}</Col>
                        <Col span={4}></Col>
                        <Col span={8}></Col>
                    </Row>
                </div>
                <Collapse bordered={false} defaultActiveKey={['1', '2', '3', '4', '5', '6'] }>
                    <Panel header="商户基本信息" key="1">
                        {this.basicInfo}
                    </Panel>
                    <Panel header="经营核心指标" key="2">
                        {this.kernel}
                    </Panel>
                    <Panel header="经营稳定性指标" key="3">
                        {this.stability}
                    </Panel>
                    <Panel header="商户POS交易金额" key="4">
                        {this.tradesAmount}
                    </Panel>
                    <Panel header="商户POSS交易笔数" key="5">
                        {this.tradesNum}
                    </Panel>
                    <Panel header={
                        <div>
                            客户贡献度
                            <Tooltip placement="right" title="1、贡献度指每类客户占总体客户的百分比，忠诚客户占比越高，商户经营状况越稳定；
                     2、按统计周期内刷卡次数，把客户分为忠诚客户、中等客户、普通客户；">
                                <Icon className="fn-ml-10" type="exclamation-circle-o"/>
                            </Tooltip>
                        </div>
                    } key="6">
                        {this.profitability}
                    </Panel>
                </Collapse>
                {/*更新时间*/}
                {this.update}
            </div>
        )
    }

    get base() {  //基础数据
        const {disabled} = this.props;
        if(this.props.dataSource && !disabled) {
            const {base} = this.props.dataSource;
            return {
                corpName: base.corpName || '',
                queryReasonID: base.queryReasonID || ''
            }
        }
        return {
            corpName: '',
            queryReasonID: '',
            id: ''
        }
    }

    //商户基本信息
    get basicInfo() {
        const {disabled} = this.props;
        if(disabled) {
            return (
                <div className=" fn-mt-10">
                    <table width="100%" className="report-table-sp">
                        <colgroup>
                            <col width="10%"/>
                            <col />
                            <col width="10%"/>
                            <col />
                        </colgroup>
                        <tbody>
                        <tr>
                            <th>商户名称</th>
                            <td></td>
                            <th>分店数量</th>
                            <td></td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            )
        } else {
            const { map} = this.props.dataSource;
            const {code, message} = map.cisReport.merchantTransInfo;
            if(code != 200) {
                return (
                    <div>
                        <h3>{message ? message : `code:${code}`}</h3>
                    </div>);
            }
            const {merchantBaseInfo} = map.cisReport.merchantTransInfo;
            if(merchantBaseInfo && !disabled) {
                if(merchantBaseInfo.code != 200) {
                    return (
                        <div>
                            <h3>{merchantBaseInfo.message ? merchantBaseInfo.message : `code:${merchantBaseInfo.code}`}</h3>
                        </div>);
                }
                return (
                    <div className=" fn-mt-10">
                        <table width="100%" className="report-table-sp">
                            <colgroup>
                                <col width="10%"/>
                                <col width="40%"/>
                                <col width="10%"/>
                                <col width="40%"/>
                            </colgroup>
                            <tbody>
                            <tr>
                                <th>商户名称</th>
                                <td>{merchantBaseInfo.name}</td>
                                <th>分店数量</th>
                                <td>{merchantBaseInfo.branchCount}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                )
            }
        }
    }

    //经营核心指标
    get kernel() {
        const {disabled} = this.props;
        if(disabled) {
            return (
                <div className="report-table">
                    <Row>
                        <Col span={4}>交易总金额</Col>
                        <Col span={8}></Col>
                        <Col span={4}>交易次数</Col>
                        <Col span={8}></Col>
                    </Row>
                    <Row>
                        <Col span={4}>交易人数</Col>
                        <Col span={8}></Col>
                        <Col span={4}>首次交易日期</Col>
                        <Col span={8}></Col>
                    </Row>
                    <Row>
                        <Col span={4}>笔单价</Col>
                        <Col span={8}></Col>
                        <Col span={4}>客单价</Col>
                        <Col span={8}></Col>
                    </Row>
                    <Row>
                        <Col span={4}>周均交易笔数</Col>
                        <Col span={8}></Col>
                        <Col span={4}>月均交易天数</Col>
                        <Col span={8}></Col>
                    </Row>
                    <Row>
                        <Col span={4}>周均交易金额</Col>
                        <Col span={8}></Col>
                        <Col span={4}></Col>
                        <Col span={8}></Col>
                    </Row>
                </div>
            )
        } else {
            const {map} = this.props.dataSource;
            const {code, message} = map.cisReport.merchantTransInfo;
            if(code != 200) {
                return (
                    <div>
                        <h3>{message ? message : `code:${code}`}</h3>
                    </div>);
            }
            const {indexCore} = map.cisReport.merchantTransInfo.merchantTransStatisInfo;
            if(indexCore && !disabled) {
                if(indexCore.code != 200) {
                    return (
                        <div>
                            <h3>{indexCore.message ? indexCore.message : `code:${indexCore.code}`}</h3>
                        </div>);
                }
                return (
                    <div className="report-table">
                        <Row>
                            <Col span={4}>交易总金额</Col>
                            <Col span={8}>￥{indexCore.transAmountTotal}</Col>
                            <Col span={4}>交易次数</Col>
                            <Col span={8}>{indexCore.transCount}</Col>
                        </Row>
                        <Row>
                            <Col span={4}>交易人数</Col>
                            <Col span={8}>{indexCore.transPersonCount}</Col>
                            <Col span={4}>首次交易日期</Col>
                            <Col span={8}>{this.dateFormat(indexCore.firstTransDate)}</Col>
                        </Row>
                        <Row>
                            <Col span={4}>笔单价</Col>
                            <Col span={8}>￥{indexCore.countPrice}</Col>
                            <Col span={4}>客单价</Col>
                            <Col span={8}>￥{indexCore.personPrice}</Col>
                        </Row>
                        <Row>
                            <Col span={4}>周均交易笔数</Col>
                            <Col span={8}>{indexCore.weekTransCountAvg}</Col>
                            <Col span={4}>月均交易天数</Col>
                            <Col span={8}>{indexCore.monthDaysAvg}</Col>
                        </Row>
                        <Row>
                            <Col span={4}>周均交易金额</Col>
                            <Col span={8}>{indexCore.weekTransAmountAvg}</Col>
                            <Col span={4}></Col>
                            <Col span={8}></Col>
                        </Row>
                    </div>
                )
            }
        }
    }

    //经营稳定性指标
    get stability() {
        const {disabled} = this.props;
        if(disabled) {
            return (
                <div className="report-table">
                    <Row>
                        <Col span={5}>周均交易金额增长率</Col>
                        <Col span={7}></Col>
                        <Col span={5}>周均交易笔数增长率</Col>
                        <Col span={7}></Col>
                    </Row>
                    <Row>
                        <Col span={5}>退换货次数</Col>
                        <Col span={7}></Col>
                        <Col span={5}>退换货金额</Col>
                        <Col span={7}></Col>
                    </Row>
                    <Row>
                        <Col span={5}>交易金额前五的客户笔数占比</Col>
                        <Col span={7}></Col>
                        <Col span={5}>交易金额前五的客户金额占比</Col>
                        <Col span={7}></Col>
                    </Row>
                    <Row>
                        <Col span={5}>交易额峰值常见旬</Col>
                        <Col span={7}></Col>
                        <Col span={5}></Col>
                        <Col span={7}></Col>
                    </Row>
                </div>
            )
        } else {
            const { map} = this.props.dataSource;
            const {code, message} = map.cisReport.merchantTransInfo;
            if(code != 200) {
                return (
                    <div>
                        <h3>{message ? message : `code:${code}`}</h3>
                    </div>);
            }
            const {indexStability} = map.cisReport.merchantTransInfo.merchantTransStatisInfo;
            if(indexStability && !disabled) {
                if(indexStability.code != 200) {
                    return (
                        <div>
                            <h3>{indexStability.message ? indexStability.message : `code:${indexStability.code}`}</h3>
                        </div>);
                }
                return (
                    <div className="report-table">
                        <Row>
                            <Col span={5}>周均交易金额增长率</Col>
                            <Col span={7}>{this.displayPercent(indexStability.weekTransAmountGrowthRate)}</Col>
                            <Col span={5}>周均交易笔数增长率</Col>
                            <Col span={7}>{this.displayPercent(indexStability.weekTransCountGrowthRate)}</Col>
                        </Row>
                        <Row>
                            <Col span={5}>退换货次数</Col>
                            <Col span={7}>{indexStability.reverseTransCount}</Col>
                            <Col span={5}>退换货金额</Col>
                            <Col span={7}>{indexStability.reverseTransAmount}</Col>
                        </Row>
                        <Row>
                            <Col span={5}>交易金额前五的客户笔数占比</Col>
                            <Col span={7}>{this.displayPercent(indexStability.top5TransCountProp)}</Col>
                            <Col span={5}>交易金额前五的客户金额占比</Col>
                            <Col span={7}>{this.displayPercent(indexStability.top5TransAmountProp)}</Col>
                        </Row>
                        <Row>
                            <Col span={5}>交易额峰值常见旬</Col>
                            <Col span={7}>{indexStability.transAmountHighestTendays}</Col>
                            <Col span={5}></Col>
                            <Col span={7}></Col>
                        </Row>
                    </div>
                )
            }
        }
    }

    //商户POS交易金额
    get tradesAmount() {
        const {disabled} = this.props;
        if(disabled) {
            return (
                <div>
                    <ReactEcharts
                        option={this.optionAmount([], [])}
                        showLoading={false}/>
                    <div className="report-table">
                        <Row>
                            <Col span={4}>统计周期内交易金额总和</Col>
                            <Col span={8}></Col>
                            <Col span={4}>月平均交易金额</Col>
                            <Col span={8}></Col>
                        </Row>
                    </div>
                    <div className=" fn-mt-10">
                        <table width="100%" className="report-table-sp">
                            <colgroup>
                                <col width="16%"/>
                                <col/>
                                <col/>
                            </colgroup>
                            <tbody>
                            {/*循环*/}
                            <tr>
                                <th>月份</th>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <th>同地区同行业排名</th>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            {/*循环结束*/}
                            {/*循环*/}
                            <tr>
                                <th>月份</th>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <th>同地区同行业排名</th>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            {/*循环结束*/}
                            {/*循环*/}
                            <tr>
                                <th>月份</th>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <th>同地区同行业排名</th>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            {/*循环结束*/}
                            {/*循环*/}
                            <tr>
                                <th>月份</th>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <th>同地区同行业排名</th>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            {/*循环结束*/}

                            </tbody>
                        </table>
                    </div>
                </div>
            )
        } else {
            const { map} = this.props.dataSource;
            const {code, message} = map.cisReport.merchantTransInfo;
            if(code != 200) {
                return (
                    <div>
                        <h3>{message ? message : `code:${code}`}</h3>
                    </div>);
            }
            const {indexContrast} = map.cisReport.merchantTransInfo.merchantTransStatisInfo;
            if(indexContrast && !disabled) {
                if(indexContrast.code != 200) {
                    return (
                        <div>
                            <h3>{indexContrast.message ? indexContrast.message : `code:${indexContrast.code}`}</h3>
                        </div>);
                }
                let total = 0; //计算交易金额总和
                let months = [];
                let amounts = [];
                let indexContrastData = helper.templateToArray(indexContrast.item);
                for(var i = 0; i < indexContrastData.length; i++) {
                    total += Number(indexContrastData[i].monthAmount);
                    amounts.push(Number(indexContrastData[i].monthAmount));
                    months.push(this.dateFormat(indexContrastData[i].month,'YYYY年MM月'));
                }
                //月平均交易金额
                let avg = total / indexContrastData.length;
                return (
                    <div>
                        <ReactEcharts
                            option={this.optionAmount(months, amounts)}
                            showLoading={false}/>
                        <div className="report-table">
                            <Row>
                                <Col span={4}>统计周期内交易金额总和</Col>
                                <Col span={8}>{`￥${total.toFixed(2)}`}</Col>
                                <Col span={4}>月平均交易金额</Col>
                                <Col span={8}>{`￥${avg.toFixed(2)}`}</Col>
                            </Row>
                        </div>
                        <div className=" fn-mt-10">
                            <table width="100%" className="report-table-sp">
                                <colgroup>
                                    <col width="16%"/>
                                    <col/>
                                    <col/>
                                </colgroup>

                                {
                                    (() => {
                                        const COL_NUMBER = 6;
                                        let cols = Math.ceil(indexContrastData.length / COL_NUMBER);
                                        let trs = [];
                                        for(var i = 0; i < cols; i++) {
                                            trs.push(
                                                <tbody key={i}>
                                                <tr >
                                                    <th>月份</th>
                                                    <td>{this.dateFormat(indexContrastData[i * COL_NUMBER].month,'YYYY年MM月')}</td>
                                                    <td>{this.dateFormat(indexContrastData[i * COL_NUMBER + 1].month,'YYYY年MM月')}</td>
                                                    <td>{this.dateFormat(indexContrastData[i * COL_NUMBER + 2].month,'YYYY年MM月')}</td>
                                                    <td>{this.dateFormat(indexContrastData[i * COL_NUMBER + 3].month,'YYYY年MM月')}</td>
                                                    <td>{this.dateFormat(indexContrastData[i * COL_NUMBER + 4].month,'YYYY年MM月')}</td>
                                                    <td>{this.dateFormat(indexContrastData[i * COL_NUMBER + 5].month,'YYYY年MM月')}</td>
                                                </tr>
                                                <tr>
                                                    <th>同地区同行业排名</th>
                                                    <td>{this.displayRankingPercent(indexContrastData[i * COL_NUMBER].monthAmountRank)}</td>
                                                    <td>{this.displayRankingPercent(indexContrastData[i * COL_NUMBER + 1].monthAmountRank)}</td>
                                                    <td>{this.displayRankingPercent(indexContrastData[i * COL_NUMBER + 2].monthAmountRank)}</td>
                                                    <td>{this.displayRankingPercent(indexContrastData[i * COL_NUMBER + 3].monthAmountRank)}</td>
                                                    <td>{this.displayRankingPercent(indexContrastData[i * COL_NUMBER + 4].monthAmountRank)}</td>
                                                    <td>{this.displayRankingPercent(indexContrastData[i * COL_NUMBER + 5].monthAmountRank)}</td>
                                                </tr>
                                                </tbody>
                                            )
                                        }
                                        return trs;
                                    })()
                                }

                            </table>
                        </div>
                    </div>
                )
            }
        }
    }

    //商户POS交易笔数
    get tradesNum() {
        const {disabled} = this.props;
        if(disabled) {
            return (
                <div>
                    <ReactEcharts
                        option={this.optionNum([], [])}
                        showLoading={false}/>
                    <div className="report-table">
                        <Row>
                            <Col span={4}>统计周期内交易笔数总和</Col>
                            <Col span={8}></Col>
                            <Col span={4}>月平均交易笔数</Col>
                            <Col span={8}></Col>
                        </Row>
                    </div>
                    <div className=" fn-mt-10">
                        <table width="100%" className="report-table-sp">
                            <colgroup>
                                <col width="16%"/>
                                <col/>
                                <col/>
                            </colgroup>
                            <tbody>
                            {/*循环*/}
                            <tr>
                                <th>月份</th>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <th>同地区同行业排名</th>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            {/*循环结束*/}
                            </tbody>
                        </table>
                    </div>
                </div>
            )
        } else {
            const {map} = this.props.dataSource;
            const {code,message} = map.cisReport.merchantTransInfo;
            if(code != 200) {
                return (
                    <div>
                        <h3>{message ? message : `code:${code}`}</h3>
                    </div>);
            }
            const {indexContrast} = map.cisReport.merchantTransInfo.merchantTransStatisInfo;
            if(indexContrast && !disabled) {
                if(indexContrast.code != 200) {
                    return (
                        <div>
                            <h3>{indexContrast.message ? indexContrast.message : `code:${indexContrast.code}`}</h3>
                        </div>);
                }
                let total = 0; //计算交易金额总和
                let months = [];
                let count = [];
                let indexContrastData = helper.templateToArray(indexContrast.item);
                for(var i = 0; i < indexContrastData.length; i++) {
                    total += Number(indexContrastData[i].monthCount);
                    count.push(Number(indexContrastData[i].monthCount));
                    months.push(this.dateFormat(indexContrastData[i].month,'YYYY年MM月'));
                }
                //月平均交易金额
                let avg = total / indexContrastData.length;
                return (
                    <div>
                        <ReactEcharts
                            option={this.optionNum(months, count)}
                            showLoading={false}/>
                        <div className="report-table">
                            <Row>
                                <Col span={4}>统计周期内交易笔数总和</Col>
                                <Col span={8}>{`${Math.round(total)}`}</Col>
                                <Col span={4}>月平均交易笔数</Col>
                                <Col span={8}>{`${Math.round(avg)}`}</Col>
                            </Row>
                        </div>
                        <div className=" fn-mt-10">
                            <table width="100%" className="report-table-sp">
                                <colgroup>
                                    <col width="16%"/>
                                    <col/>
                                    <col/>
                                </colgroup>
                                {
                                    (() => {
                                        const COL_NUMBER = 6;
                                        let cols = Math.ceil(indexContrastData.length / COL_NUMBER);
                                        let trs = [];
                                        for(var i = 0; i < cols; i++) {
                                            trs.push(
                                                <tbody key={i}>
                                                <tr >
                                                    <th>月份</th>
                                                    <td>{this.dateFormat(indexContrastData[i * COL_NUMBER].month,'YYYY年MM月')}</td>
                                                    <td>{this.dateFormat(indexContrastData[i * COL_NUMBER + 1].month,'YYYY年MM月')}</td>
                                                    <td>{this.dateFormat(indexContrastData[i * COL_NUMBER + 2].month,'YYYY年MM月')}</td>
                                                    <td>{this.dateFormat(indexContrastData[i * COL_NUMBER + 3].month,'YYYY年MM月')}</td>
                                                    <td>{this.dateFormat(indexContrastData[i * COL_NUMBER + 4].month,'YYYY年MM月')}</td>
                                                    <td>{this.dateFormat(indexContrastData[i * COL_NUMBER + 5].month,'YYYY年MM月')}</td>
                                                </tr>
                                                <tr>
                                                    <th>同地区同行业排名</th>
                                                    <td>{this.displayRankingPercent(indexContrastData[i * COL_NUMBER].monthCountRank)}</td>
                                                    <td>{this.displayRankingPercent(indexContrastData[i * COL_NUMBER + 1].monthCountRank)}</td>
                                                    <td>{this.displayRankingPercent(indexContrastData[i * COL_NUMBER + 2].monthCountRank)}</td>
                                                    <td>{this.displayRankingPercent(indexContrastData[i * COL_NUMBER + 3].monthCountRank)}</td>
                                                    <td>{this.displayRankingPercent(indexContrastData[i * COL_NUMBER + 4].monthCountRank)}</td>
                                                    <td>{this.displayRankingPercent(indexContrastData[i * COL_NUMBER + 5].monthCountRank)}</td>
                                                </tr>
                                                </tbody>
                                            )
                                        }
                                        return trs;
                                    })()
                                }
                            </table>
                        </div>
                    </div>
                )
            }
        }
    }

    //客户贡献度
    get profitability() {
        const {disabled} = this.props;
        if(disabled) {
            return (
                <div className=" fn-mt-10">
                    <table width="100%" className="report-table-sp">
                        <colgroup>
                            <col width="12%"/>
                            <col />
                            <col width="12%"/>
                            <col />
                            <col width="12%"/>
                            <col />
                        </colgroup>
                        <tbody>
                        <tr>
                            <th>忠实客户贡献度</th>
                            <td></td>
                            <th>中等客户贡献度</th>
                            <td></td>
                            <th>普通客户贡献度</th>
                            <td></td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            )
        } else {
            const { map} = this.props.dataSource;
            const {code, message} = map.cisReport.merchantTransInfo;
            if( code != 200) {
                return (
                    <div>
                        <h3>{message ? message : `code:${code}`}</h3>
                    </div>);
            }
            const {indexLoyalty} = map.cisReport.merchantTransInfo.merchantTransStatisInfo;
            if(indexLoyalty && !disabled) {
                if(indexLoyalty.code != 200) {
                    return (
                        <div>
                            <h3>{indexLoyalty.message ? indexLoyalty.message : `code:${indexLoyalty.code}`}</h3>
                        </div>);
                }
                let indexLoyaltyData = helper.templateToArray(indexLoyalty.item);
                return (
                    <div className=" fn-mt-10">
                        <table width="100%" className="report-table-sp">
                            <colgroup>
                                <col width="12%"/>
                                <col />
                                <col width="12%"/>
                                <col />
                                <col width="12%"/>
                                <col />
                            </colgroup>
                            <tbody>
                            <tr>
                                <th>{indexLoyaltyData[0] && indexLoyaltyData[0].customerType}</th>
                                <td>{this.displayPercent(indexLoyaltyData[0].personProp)}</td>
                                <th>{indexLoyaltyData[1] && indexLoyaltyData[1].customerType}</th>
                                <td>{this.displayPercent(indexLoyaltyData[1].personProp)}</td>
                                <th>{indexLoyaltyData[2] && indexLoyaltyData[2].customerType}</th>
                                <td>{this.displayPercent(indexLoyaltyData[2].personProp)}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                )
            }
        }
    }

    optionAmount(month, amount) {
        return {
            title: {
                text: '',
                subtext: '',
            },
            tooltip: {
                trigger: 'item',
                formatter: function(params) {
                    return params.name + ' 交易金额 ' + params.value.toFixed(2) + ' 元';
                },
            },
            legend: {
                orient: 'vertical',
                x: 'center',
                data: ['交易金额(元)']
            },
            calculable: true,
            xAxis: [
                {
                    type: 'category',
                    data: month
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    name: '交易金额(元)',
                    type: 'bar',
                    data: amount,
                    markLine: {
                        precision: 2,
                        data: [
                            {type: 'average', name: '平均值'}
                        ]
                    }
                }
            ]
        };
    }

    optionNum(month, count) {
        return {
            title: {
                text: '',
                subtext: '',
            },
            tooltip: {
                trigger: 'item',
                formatter: "{b} 交易笔数 {c} 笔"
            },
            legend: {
                orient: 'vertical',
                x: 'center',
                data: ['交易笔数(笔)']
            },
            calculable: true,
            xAxis: [
                {
                    type: 'category',
                    data: month
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    name: '交易笔数(笔)',
                    type: 'line',
                    data: count,
                    markLine: {
                        precision: 0,
                        data: [
                            {type: 'average', name: '平均值'}
                        ]
                    }
                }
            ]
        };
    }
}
