/**
 * Created by Ethan on 2017/2/14.
 * 10:29
 * 支付消费评估
 */
import {BaseReport} from "./BaseReport";
import React from "react";
import {Row, Col} from "antd";
import "./style.less";
export class PaymentEvaluation extends BaseReport {
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
                    <span style={this.css.color}>支付消费评估</span>
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
                        <Col span={4}>姓名</Col>
                        <Col span={8}>{this.base.name}</Col>
                        <Col span={4}>身份证号</Col>
                        <Col span={8}>{this.base.id}</Col>
                    </Row>
                    <Row>
                        <Col span={4}>手机号</Col>
                        <Col span={8}>{this.base.phone}</Col>
                        <Col span={4}>银行卡号</Col>
                        <Col span={8}>{this.base.bankCard}</Col>
                    </Row>
                </div>
                {this.payment}
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
                name: base.name || '',
                phone: base.cell || '',
                id: base.id || '',
                bankCard: base.bankCard || ''
            }
        }
        return {
            name: '',
            phone: '',
            id: '',
            bankCard: ''
        }
    }

    get payment() {
        const {disabled} = this.props;
        if(disabled) {
            return (
                <div className=" fn-mt-10">
                    <table width="100%" className="report-table-sp">
                        <colgroup>
                            <col width="10%"/>
                            <col/>
                            <col/>
                        </colgroup>
                        <thead>
                        <tr rowSpan="2">
                            <th rowSpan="2"></th>
                            <th rowSpan="2" className="text-align-center">消费总金额</th>
                            <th rowSpan="2" className="text-align-center">消费总次数</th>
                            <th colSpan="3" className="text-align-center">消费金额最多的商户类型</th>
                            <th colSpan="3" className="text-align-center">消费次数最多的商户类型</th>
                            <th rowSpan="2" className="text-align-center">夜消费金额（时间段00:00-06:00)</th>
                            <th rowSpan="2" className="text-align-center">夜消费次数（时间段00:00-06:00)</th>
                            <th rowSpan="2" className="text-align-center">最多消费次数所在省份</th>
                        </tr>
                        <tr>
                            <th className="text-align-center">第一名</th>
                            <th className="text-align-center">第二名</th>
                            <th className="text-align-center">第三名</th>
                            <th className="text-align-center">第一名</th>
                            <th className="text-align-center">第二名</th>
                            <th className="text-align-center">第三名</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <th>最近第一个月</th>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <th>最近第二个月</th>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <th>最近第三个月</th>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <th>最近第四个月</th>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <th>最近第五个月</th>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <th>最近第六个月</th>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <th >最近第七个月</th>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <th>最近第八个月</th>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <th>最近第九个月</th>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <th>最近第十个月</th>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <th>最近第十一个月</th>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <th>最近第十二个月</th>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            )
        } else {
            const {code, payConsumptionItems, message} = this.props.dataSource;
            console.log(code);
            if(code && code != 200) {
                return (
                    <div>
                        <h3>{message ? message : `code:${code}`}</h3>
                    </div>);
            }
            if(payConsumptionItems && !disabled) {
                console.log("payConsumptionItems",payConsumptionItems)
                return (
                    <div className=" fn-mt-10">
                        <table width="100%" className="report-table-sp">
                            <colgroup>
                                <col width="8%"/>
                                <col width="6%"/>
                                <col width="6%"/>
                                <col width="8%"/>
                                <col width="8%"/>
                                <col width="8%"/>
                                <col width="8%"/>
                                <col width="8%"/>
                                <col width="8%"/>
                            </colgroup>
                            <thead>
                            <tr rowSpan="2">
                                <th rowSpan="2"></th>
                                <th rowSpan="2" className="text-align-center">消费总金额</th>
                                <th rowSpan="2" className="text-align-center">消费总次数</th>
                                <th colSpan="3" className="text-align-center">消费金额最多的商户类型</th>
                                <th colSpan="3" className="text-align-center">消费次数最多的商户类型</th>
                                <th rowSpan="2" className="text-align-center">夜消费金额（时间段00:00-06:00)</th>
                                <th rowSpan="2" className="text-align-center">夜消费次数（时间段00:00-06:00)</th>
                                <th rowSpan="2" className="text-align-center">最多消费次数所在省份</th>
                            </tr>
                            <tr>
                                <th className="text-align-center">第一名</th>
                                <th className="text-align-center">第二名</th>
                                <th className="text-align-center">第三名</th>
                                <th className="text-align-center">第一名</th>
                                <th className="text-align-center">第二名</th>
                                <th className="text-align-center">第三名</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <th>最近第一个月</th>
                                <td>{this.displayDollar(payConsumptionItems.one.pcPay)}</td>
                                <td>{payConsumptionItems.one.pcNum}</td>
                                <td>{payConsumptionItems.one.pc1stPay}</td>
                                <td>{payConsumptionItems.one.pc2stPay}</td>
                                <td>{payConsumptionItems.one.pc3stPay}</td>
                                <td>{payConsumptionItems.one.pc1stNum}</td>
                                <td>{payConsumptionItems.one.pc2stNum}</td>
                                <td>{payConsumptionItems.one.pc3stNum}</td>
                                <td>{this.displayDollar(payConsumptionItems.one.pcNightPay)}</td>
                                <td>{payConsumptionItems.one.pcNightNum}</td>
                                <td>{payConsumptionItems.one.pcMaxNumPvn}</td>
                            </tr>
                            <tr>
                                <th>最近第二个月</th>
                                <td>{this.displayDollar(payConsumptionItems.two.pcPay)}</td>
                                <td>{payConsumptionItems.two.pcNum}</td>
                                <td>{payConsumptionItems.two.pc1stPay}</td>
                                <td>{payConsumptionItems.two.pc2stPay}</td>
                                <td>{payConsumptionItems.two.pc3stPay}</td>
                                <td>{payConsumptionItems.two.pc1stNum}</td>
                                <td>{payConsumptionItems.two.pc2stNum}</td>
                                <td>{payConsumptionItems.two.pc3stNum}</td>
                                <td>{this.displayDollar(payConsumptionItems.two.pcNightPay)}</td>
                                <td>{payConsumptionItems.two.pcNightNum}</td>
                                <td>{payConsumptionItems.two.pcMaxNumPvn}</td>
                            </tr>
                            <tr>
                                <th>最近第三个月</th>
                                <td>{this.displayDollar(payConsumptionItems.three.pcPay)}</td>
                                <td>{payConsumptionItems.three.pcNum}</td>
                                <td>{payConsumptionItems.three.pc1stPay}</td>
                                <td>{payConsumptionItems.three.pc2stPay}</td>
                                <td>{payConsumptionItems.three.pc3stPay}</td>
                                <td>{payConsumptionItems.three.pc1stNum}</td>
                                <td>{payConsumptionItems.three.pc2stNum}</td>
                                <td>{payConsumptionItems.three.pc3stNum}</td>
                                <td>{this.displayDollar(payConsumptionItems.three.pcNightPay)}</td>
                                <td>{payConsumptionItems.three.pcNightNum}</td>
                                <td>{payConsumptionItems.three.pcMaxNumPvn}</td>
                            </tr>
                            <tr>
                                <th>最近第四个月</th>
                                <td>{this.displayDollar(payConsumptionItems.four.pcPay)}</td>
                                <td>{payConsumptionItems.four.pcNum}</td>
                                <td>{payConsumptionItems.four.pc1stPay}</td>
                                <td>{payConsumptionItems.four.pc2stPay}</td>
                                <td>{payConsumptionItems.four.pc3stPay}</td>
                                <td>{payConsumptionItems.four.pc1stNum}</td>
                                <td>{payConsumptionItems.four.pc2stNum}</td>
                                <td>{payConsumptionItems.four.pc3stNum}</td>
                                <td>{this.displayDollar(payConsumptionItems.four.pcNightPay)}</td>
                                <td>{payConsumptionItems.four.pcNightNum}</td>
                                <td>{payConsumptionItems.four.pcMaxNumPvn}</td>
                            </tr>
                            <tr>
                                <th>最近第五个月</th>
                                <td>{this.displayDollar(payConsumptionItems.five.pcPay)}</td>
                                <td>{payConsumptionItems.five.pcNum}</td>
                                <td>{payConsumptionItems.five.pc1stPay}</td>
                                <td>{payConsumptionItems.five.pc2stPay}</td>
                                <td>{payConsumptionItems.five.pc3stPay}</td>
                                <td>{payConsumptionItems.five.pc1stNum}</td>
                                <td>{payConsumptionItems.five.pc2stNum}</td>
                                <td>{payConsumptionItems.five.pc3stNum}</td>
                                <td>{this.displayDollar(payConsumptionItems.five.pcNightPay)}</td>
                                <td>{payConsumptionItems.five.pcNightNum}</td>
                                <td>{payConsumptionItems.five.pcMaxNumPvn}</td>
                            </tr>
                            <tr>
                                <th>最近第六个月</th>
                                <td>{this.displayDollar(payConsumptionItems.six.pcPay)}</td>
                                <td>{payConsumptionItems.six.pcNum}</td>
                                <td>{payConsumptionItems.six.pc1stPay}</td>
                                <td>{payConsumptionItems.six.pc2stPay}</td>
                                <td>{payConsumptionItems.six.pc3stPay}</td>
                                <td>{payConsumptionItems.six.pc1stNum}</td>
                                <td>{payConsumptionItems.six.pc2stNum}</td>
                                <td>{payConsumptionItems.six.pc3stNum}</td>
                                <td>{this.displayDollar(payConsumptionItems.six.pcNightPay)}</td>
                                <td>{payConsumptionItems.six.pcNightNum}</td>
                                <td>{payConsumptionItems.six.pcMaxNumPvn}</td>
                            </tr>
                            <tr>
                                <th >最近第七个月</th>
                                <td>{this.displayDollar(payConsumptionItems.seven.pcPay)}</td>
                                <td>{payConsumptionItems.seven.pcNum}</td>
                                <td>{payConsumptionItems.seven.pc1stPay}</td>
                                <td>{payConsumptionItems.seven.pc2stPay}</td>
                                <td>{payConsumptionItems.seven.pc3stPay}</td>
                                <td>{payConsumptionItems.seven.pc1stNum}</td>
                                <td>{payConsumptionItems.seven.pc2stNum}</td>
                                <td>{payConsumptionItems.seven.pc3stNum}</td>
                                <td>{this.displayDollar(payConsumptionItems.seven.pcPay)}</td>
                                <td>{payConsumptionItems.seven.pcNightNum}</td>
                                <td>{payConsumptionItems.seven.pcMaxNumPvn}</td>
                            </tr>
                            <tr>
                                <th>最近第八个月</th>
                                <td>{this.displayDollar(payConsumptionItems.eight.pcPay)}</td>
                                <td>{payConsumptionItems.eight.pcNum}</td>
                                <td>{payConsumptionItems.eight.pc1stPay}</td>
                                <td>{payConsumptionItems.eight.pc2stPay}</td>
                                <td>{payConsumptionItems.eight.pc3stPay}</td>
                                <td>{payConsumptionItems.eight.pc1stNum}</td>
                                <td>{payConsumptionItems.eight.pc2stNum}</td>
                                <td>{payConsumptionItems.eight.pc3stNum}</td>
                                <td>{this.displayDollar(payConsumptionItems.eight.pcNightPay)}</td>
                                <td>{payConsumptionItems.eight.pcNightNum}</td>
                                <td>{payConsumptionItems.eight.pcMaxNumPvn}</td>
                            </tr>
                            <tr>
                                <th>最近第九个月</th>
                                <td>{this.displayDollar(payConsumptionItems.nine.pcPay)}</td>
                                <td>{payConsumptionItems.nine.pcNum}</td>
                                <td>{payConsumptionItems.nine.pc1stPay}</td>
                                <td>{payConsumptionItems.nine.pc2stPay}</td>
                                <td>{payConsumptionItems.nine.pc3stPay}</td>
                                <td>{payConsumptionItems.nine.pc1stNum}</td>
                                <td>{payConsumptionItems.nine.pc2stNum}</td>
                                <td>{payConsumptionItems.nine.pc3stNum}</td>
                                <td>{this.displayDollar(payConsumptionItems.nine.pcNightPay)}</td>
                                <td>{payConsumptionItems.nine.pcNightNum}</td>
                                <td>{payConsumptionItems.nine.pcMaxNumPvn}</td>
                            </tr>
                            <tr>
                                <th>最近第十个月</th>
                                <td>{this.displayDollar(payConsumptionItems.ten.pcPay)}</td>
                                <td>{payConsumptionItems.ten.pcNum}</td>
                                <td>{payConsumptionItems.ten.pc1stPay}</td>
                                <td>{payConsumptionItems.ten.pc2stPay}</td>
                                <td>{payConsumptionItems.ten.pc3stPay}</td>
                                <td>{payConsumptionItems.ten.pc1stNum}</td>
                                <td>{payConsumptionItems.ten.pc2stNum}</td>
                                <td>{payConsumptionItems.ten.pc3stNum}</td>
                                <td>{this.displayDollar(payConsumptionItems.ten.pcNightPay)}</td>
                                <td>{payConsumptionItems.ten.pcNightNum}</td>
                                <td>{payConsumptionItems.ten.pcMaxNumPvn}</td>
                            </tr>
                            <tr>
                                <th>最近第十一个月</th>
                                <td>{this.displayDollar(payConsumptionItems.eleven.pcPay)}</td>
                                <td>{payConsumptionItems.eleven.pcNum}</td>
                                <td>{payConsumptionItems.eleven.pc1stPay}</td>
                                <td>{payConsumptionItems.eleven.pc2stPay}</td>
                                <td>{payConsumptionItems.eleven.pc3stPay}</td>
                                <td>{payConsumptionItems.eleven.pc1stNum}</td>
                                <td>{payConsumptionItems.eleven.pc2stNum}</td>
                                <td>{payConsumptionItems.eleven.pc3stNum}</td>
                                <td>{this.displayDollar(payConsumptionItems.eleven.pcNightPay)}</td>
                                <td>{payConsumptionItems.eleven.pcNightNum}</td>
                                <td>{payConsumptionItems.eleven.pcMaxNumPvn}</td>
                            </tr>
                            <tr>
                                <th>最近第十二个月</th>
                                <td>{this.displayDollar(payConsumptionItems.twelve.pcPay)}</td>
                                <td>{payConsumptionItems.twelve.pcNum}</td>
                                <td>{payConsumptionItems.twelve.pc1stPay}</td>
                                <td>{payConsumptionItems.twelve.pc2stPay}</td>
                                <td>{payConsumptionItems.twelve.pc3stPay}</td>
                                <td>{payConsumptionItems.twelve.pc1stNum}</td>
                                <td>{payConsumptionItems.twelve.pc2stNum}</td>
                                <td>{payConsumptionItems.twelve.pc3stNum}</td>
                                <td>{this.displayDollar(payConsumptionItems.twelve.pcNightPay)}</td>
                                <td>{payConsumptionItems.twelve.pcNightNum}</td>
                                <td>{payConsumptionItems.twelve.pcMaxNumPvn}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                )
            }
        }
    }
}
