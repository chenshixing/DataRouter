/**
 * Created by Ethan on 2017/2/14.
 * 9:55
 *特殊名单核查
 */
import {BaseReport} from "./BaseReport";
import React from "react";
import {Row, Col} from "antd";
import "./style.less";
export class SpecialList extends BaseReport {
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
                    <span style={this.css.color}>特殊名单核查</span>
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
                        <Col span={4}>手机号1</Col>
                        <Col span={8}>{this.base.phone1}</Col>

                    </Row>
                    <Row>
                        <Col span={4}>手机号2</Col>
                        <Col span={8}>{this.base.phone2}</Col>
                        <Col span={4}>手机号3</Col>
                        <Col span={8}>{this.base.phone3}</Col>
                    </Row>
                </div>
                {this.info}
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
                phone1: base.cell1 || '',
                phone2: base.cell2 || '',
                phone3: base.cell3 || '',
                id: base.id || ''
            }
        }
        return {
            name: '',
            phone: '',
            phone1: '',
            phone2: '',
            phone3: '',
            id: ''
        }
    }

    get info() {
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
                        <tr>
                            <th className="text-align-center"></th>
                            <th className="text-align-center">通过身份证查询</th>
                            <th className="text-align-center">通过本人手机号查询</th>
                            <th className="text-align-center">通过联系人手机号查询</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <th>高危行为</th>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <th>电信欠费</th>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <th>法院失信人</th>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <th>法院被执行人</th>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <th>银行(含信用卡)不良</th>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <th>银行(含信用卡)短时逾期</th>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <th>银行(含信用卡)资信不佳</th>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <th>银行(含信用卡)失联</th>
                            <td></td>
                            <td></td>
                            <td></td>

                        </tr>
                        <tr>
                            <th>银行(含信用卡)拒绝</th>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <th>非银(含全部非银类型)不良</th>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <th>非银(含全部非银类型)短时逾期</th>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <th>非银(含全部非银类型)资信不佳</th>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <th>非银(含全部非银类型)失联</th>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <th>非银(含全部非银类型)拒绝</th>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <th>P2P不良</th>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <th>P2P短时逾期</th>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <th>P2P资信不佳</th>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <th>P2P失联</th>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <th>P2P拒绝</th>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <th>小贷不良</th>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <th>小贷短时逾期</th>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <th>小贷资信不佳</th>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <th>小贷失联</th>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <th>小贷拒绝</th>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <th>现金类分期不良</th>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <th>现金类分期短时逾期</th>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <th>现金类分期资信不佳</th>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <th>现金类分期失联</th>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <th>现金类分期拒绝</th>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <th>代偿类分期不良</th>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <th>代偿类分期短时逾期</th>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <th>代偿类分期资信不佳</th>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <th>代偿类分期失联</th>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <th>代偿类分期拒绝</th>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <th>消费类分期不良</th>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <th>消费类分期短时逾期</th>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <th>消费类分期资信不佳</th>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <th>消费类分期失联</th>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <th>消费类分期拒绝</th>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <th>非银其他不良</th>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <th>非银其他短时逾期</th>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <th>非银其他资信不佳</th>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <th>非银其他失联</th>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <th>非银其他拒绝</th>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            )
        } else {
            const {code, specialListCell, specialListId, specialListLmCell, message} = this.props.dataSource;
            if(code && code != 200) {
                return (
                    <div>
                        <h3>{message ? message : `code:${code}`}</h3>
                    </div>);
            }
            if(specialListCell && specialListId && specialListLmCell && !disabled) {
                return (
                    <div className=" fn-mt-10">
                        <table width="100%" className="report-table-sp">
                            <colgroup>
                                <col width="10%"/>
                                <col/>
                                <col/>
                            </colgroup>
                            <thead>
                            <tr>
                                <th className="text-align-center"></th>
                                <th className="text-align-center">通过身份证查询</th>
                                <th className="text-align-center">通过本人手机号查询</th>
                                <th className="text-align-center">通过联系人手机号查询</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <th>高危行为</th>
                                <td>{specialListId.abnormal}</td>
                                <td>{specialListCell.abnormal}</td>
                                <td>{specialListLmCell.abnormal}</td>
                            </tr>
                            <tr>
                                <th>电信欠费</th>
                                <td>{specialListId.phoneOverdue}</td>
                                <td>{specialListCell.phoneOverdue}</td>
                                <td>{specialListLmCell.phoneOverdue}</td>
                            </tr>
                            <tr>
                                <th>法院失信人</th>
                                <td>{specialListId.courtBad}</td>
                                <td>{specialListCell.courtBad}</td>
                                <td>{specialListLmCell.courtBad}</td>
                            </tr>
                            <tr>
                                <th>法院被执行人</th>
                                <td>{specialListId.courtExecuted}</td>
                                <td>{specialListCell.courtExecuted}</td>
                                <td>{specialListLmCell.courtExecuted}</td>
                            </tr>
                            <tr>
                                <th>银行(含信用卡)不良</th>
                                <td>{specialListId.bankBad}</td>
                                <td>{specialListCell.bankBad}</td>
                                <td>{specialListLmCell.bankBad}</td>
                            </tr>
                            <tr>
                                <th>银行(含信用卡)短时逾期</th>
                                <td>{specialListId.bankOverdue}</td>
                                <td>{specialListCell.bankOverdue}</td>
                                <td>{specialListLmCell.bankOverdue}</td>
                            </tr>
                            <tr>
                                <th>银行(含信用卡)资信不佳</th>
                                <td>{specialListId.bankFraud}</td>
                                <td>{specialListCell.bankFraud}</td>
                                <td>{specialListLmCell.bankFraud}</td>
                            </tr>
                            <tr>
                                <th>银行(含信用卡)失联</th>
                                <td>{specialListId.bankLost}</td>
                                <td>{specialListCell.bankLost}</td>
                                <td>{specialListLmCell.bankLost}</td>

                            </tr>
                            <tr>
                                <th>银行(含信用卡)拒绝</th>
                                <td>{specialListId.bankRefuse}</td>
                                <td>{specialListCell.bankRefuse}</td>
                                <td>{specialListLmCell.bankRefuse}</td>
                            </tr>
                            <tr>
                                <th>非银(含全部非银类型)不良</th>
                                <td>{specialListId.p2pBad}</td>
                                <td>{specialListCell.p2pBad}</td>
                                <td>{specialListLmCell.p2pBad}</td>
                            </tr>
                            <tr>
                                <th>非银(含全部非银类型)短时逾期</th>
                                <td>{specialListId.p2pOverdue}</td>
                                <td>{specialListCell.p2pOverdue}</td>
                                <td>{specialListLmCell.p2pOverdue}</td>
                            </tr>
                            <tr>
                                <th>非银(含全部非银类型)资信不佳</th>
                                <td>{specialListId.p2pFraud}</td>
                                <td>{specialListCell.p2pFraud}</td>
                                <td>{specialListLmCell.p2pFraud}</td>
                            </tr>
                            <tr>
                                <th>非银(含全部非银类型)失联</th>
                                <td>{specialListId.p2pLost}</td>
                                <td>{specialListCell.p2pLost}</td>
                                <td>{specialListLmCell.p2pLost}</td>
                            </tr>
                            <tr>
                                <th>非银(含全部非银类型)拒绝</th>
                                <td>{specialListId.p2pRefuse}</td>
                                <td>{specialListCell.p2pRefuse}</td>
                                <td>{specialListLmCell.p2pRefuse}</td>
                            </tr>
                            <tr>
                                <th>P2P不良</th>
                                <td>{specialListId.nbankP2pBad}</td>
                                <td>{specialListCell.nbankP2pBad}</td>
                                <td>{specialListLmCell.nbankP2pBad}</td>
                            </tr>
                            <tr>
                                <th>P2P短时逾期</th>
                                <td>{specialListId.nbankP2pOverdue}</td>
                                <td>{specialListCell.nbankP2pOverdue}</td>
                                <td>{specialListLmCell.nbankP2pOverdue}</td>
                            </tr>
                            <tr>
                                <th>P2P资信不佳</th>
                                <td>{specialListId.nbankP2pFraud}</td>
                                <td>{specialListCell.nbankP2pFraud}</td>
                                <td>{specialListLmCell.nbankP2pFraud}</td>
                            </tr>
                            <tr>
                                <th>P2P失联</th>
                                <td>{specialListId.nbankP2pLost}</td>
                                <td>{specialListCell.nbankP2pLost}</td>
                                <td>{specialListLmCell.nbankP2pLost}</td>
                            </tr>
                            <tr>
                                <th>P2P拒绝</th>
                                <td>{specialListId.nbankP2pRefuse}</td>
                                <td>{specialListCell.nbankP2pRefuse}</td>
                                <td>{specialListLmCell.nbankP2pRefuse}</td>
                            </tr>
                            <tr>
                                <th>小贷不良</th>
                                <td>{specialListId.nbankMcBad}</td>
                                <td>{specialListCell.nbankMcBad}</td>
                                <td>{specialListLmCell.nbankMcBad}</td>
                            </tr>
                            <tr>
                                <th>小贷短时逾期</th>
                                <td>{specialListId.nbankMcOverdue}</td>
                                <td>{specialListCell.nbankMcOverdue}</td>
                                <td>{specialListLmCell.nbankMcOverdue}</td>
                            </tr>
                            <tr>
                                <th>小贷资信不佳</th>
                                <td>{specialListId.nbankMcFraud}</td>
                                <td>{specialListCell.nbankMcFraud}</td>
                                <td>{specialListLmCell.nbankMcFraud}</td>
                            </tr>
                            <tr>
                                <th>小贷失联</th>
                                <td>{specialListId.nbankMcLost}</td>
                                <td>{specialListCell.nbankMcLost}</td>
                                <td>{specialListLmCell.nbankMcLost}</td>
                            </tr>
                            <tr>
                                <th>小贷拒绝</th>
                                <td>{specialListId.nbankMcRefuse}</td>
                                <td>{specialListCell.nbankMcRefuse}</td>
                                <td>{specialListLmCell.nbankMcRefuse}</td>
                            </tr>
                            <tr>
                                <th>现金类分期不良</th>
                                <td>{specialListId.nbankCaBad}</td>
                                <td>{specialListCell.nbankCaBad}</td>
                                <td>{specialListLmCell.nbankCaBad}</td>
                            </tr>
                            <tr>
                                <th>现金类分期短时逾期</th>
                                <td>{specialListId.nbankCaOverdue}</td>
                                <td>{specialListCell.nbankCaOverdue}</td>
                                <td>{specialListLmCell.nbankCaOverdue}</td>
                            </tr>
                            <tr>
                                <th>现金类分期资信不佳</th>
                                <td>{specialListId.nbankCaFraud}</td>
                                <td>{specialListCell.nbankCaFraud}</td>
                                <td>{specialListLmCell.nbankCaFraud}</td>
                            </tr>
                            <tr>
                                <th>现金类分期失联</th>
                                <td>{specialListId.nbankCaLost}</td>
                                <td>{specialListCell.nbankCaLost}</td>
                                <td>{specialListLmCell.nbankCaLost}</td>
                            </tr>
                            <tr>
                                <th>现金类分期拒绝</th>
                                <td>{specialListId.nbankCaRefuse}</td>
                                <td>{specialListCell.nbankCaRefuse}</td>
                                <td>{specialListLmCell.nbankCaRefuse}</td>
                            </tr>
                            <tr>
                                <th>代偿类分期不良</th>
                                <td>{specialListId.nbankComBad}</td>
                                <td>{specialListCell.nbankComBad}</td>
                                <td>{specialListLmCell.nbankComBad}</td>
                            </tr>
                            <tr>
                                <th>代偿类分期短时逾期</th>
                                <td>{specialListId.nbankComOverdue}</td>
                                <td>{specialListCell.nbankComOverdue}</td>
                                <td>{specialListLmCell.nbankComOverdue}</td>
                            </tr>
                            <tr>
                                <th>代偿类分期资信不佳</th>
                                <td>{specialListId.nbankComFraud}</td>
                                <td>{specialListCell.nbankComFraud}</td>
                                <td>{specialListLmCell.nbankComFraud}</td>
                            </tr>
                            <tr>
                                <th>代偿类分期失联</th>
                                <td>{specialListId.nbankComLost}</td>
                                <td>{specialListCell.nbankComLost}</td>
                                <td>{specialListLmCell.nbankComLost}</td>
                            </tr>
                            <tr>
                                <th>代偿类分期拒绝</th>
                                <td>{specialListId.nbankComRefuse}</td>
                                <td>{specialListCell.nbankComRefuse}</td>
                                <td>{specialListLmCell.nbankComRefuse}</td>
                            </tr>
                            <tr>
                                <th>消费类分期不良</th>
                                <td>{specialListId.nbankCfBad}</td>
                                <td>{specialListCell.nbankCfBad}</td>
                                <td>{specialListLmCell.nbankCfBad}</td>
                            </tr>
                            <tr>
                                <th>消费类分期短时逾期</th>
                                <td>{specialListId.nbankCfOverdue}</td>
                                <td>{specialListCell.nbankCfOverdue}</td>
                                <td>{specialListLmCell.nbankCfOverdue}</td>
                            </tr>
                            <tr>
                                <th>消费类分期资信不佳</th>
                                <td>{specialListId.nbankCfFraud}</td>
                                <td>{specialListCell.nbankCfFraud}</td>
                                <td>{specialListLmCell.nbankCfFraud}</td>
                            </tr>
                            <tr>
                                <th>消费类分期失联</th>
                                <td>{specialListId.nbankCfLost}</td>
                                <td>{specialListCell.nbankCfLost}</td>
                                <td>{specialListLmCell.nbankCfLost}</td>
                            </tr>
                            <tr>
                                <th>消费类分期拒绝</th>
                                <td>{specialListId.nbankComRefuse}</td>
                                <td>{specialListCell.nbankComRefuse}</td>
                                <td>{specialListLmCell.nbankComRefuse}</td>
                            </tr>
                            <tr>
                                <th>非银其他不良</th>
                                <td>{specialListId.nbankOtherBad}</td>
                                <td>{specialListCell.nbankOtherBad}</td>
                                <td>{specialListLmCell.nbankOtherBad}</td>
                            </tr>
                            <tr>
                                <th>非银其他短时逾期</th>
                                <td>{specialListId.nbankOtherOverdue}</td>
                                <td>{specialListCell.nbankOtherOverdue}</td>
                                <td>{specialListLmCell.nbankOtherOverdue}</td>
                            </tr>
                            <tr>
                                <th>非银其他资信不佳</th>
                                <td>{specialListId.nbankOtherFraud}</td>
                                <td>{specialListCell.nbankOtherFraud}</td>
                                <td>{specialListLmCell.nbankOtherFraud}</td>
                            </tr>
                            <tr>
                                <th>非银其他失联</th>
                                <td>{specialListId.nbankOtherLost}</td>
                                <td>{specialListCell.nbankOtherLost}</td>
                                <td>{specialListLmCell.nbankOtherLost}</td>
                            </tr>
                            <tr>
                                <th>非银其他拒绝</th>
                                <td>{specialListId.nbankOtherRefuse}</td>
                                <td>{specialListCell.nbankOtherRefuse}</td>
                                <td>{specialListLmCell.nbankOtherRefuse}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                )
            }
        }
    }
}
