/**
 * Created by Ethan on 2016/12/6.
 * 个人信贷多次申请核查报告 模版
 * Personal risk information report
 *
 */
import {BaseReport} from './BaseReport';
import React, {Component} from 'react';
import {Row, Col, Collapse, Popover, Icon} from 'antd';
import './style.less';
const Panel = Collapse.Panel;
export class PersonalCredit extends BaseReport {
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
                    <span style={this.css.color}>个人信贷多次申请核查报告</span>
                </h2>
                <div className="report-table fn-mb-20">
                    <Row>
                        <Col span={6}>查询主体</Col>
                        <Col span={7} offset={11}>
                            <span>查询编号：</span>
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
                        <Col span={20}>{this.base.phone}</Col>
                    </Row>
                </div>

                <Collapse bordered={false} defaultActiveKey={['1', '2', '3']}>
                    {/* 申请次数和机构数统计*/}
                    <Panel header="申请次数和机构数统计" key="1">
                        {this.applyCountAndOrgs}
                    </Panel>
                    {/* 申请记录汇总*/}
                    <Panel header="申请记录汇总" key="2">
                        {this.applyCounts}
                    </Panel>
                    {/* 最近最早申请记录*/}
                    <Panel header="最近最早申请记录（近12个月）" key="3">
                        {this.firstAndLastApplies}
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
                name: base.name || '',
                phone: base.cell || '',
                id: base.id || ''
            }
        }
        return {
            name: '',
            phone: '',
            id: ''
        }
    }

    get applyCountAndOrgs() {
        const {disabled} = this.props;
        const content = (
            <div className="popover-content">
                <ul>
                    <li>非银行机构包括：P2P、小贷、消费类分期、现金类分期、代偿类分期、其他(信保、信托等)</li>
                    <li>消费类分期：借贷用于购买消费品并分期偿还的业务</li>
                    <li>现金类分期：支取现金并分期偿还的业务</li>
                    <li>代偿类分期：借贷用于偿还已有借款并分期偿还的业务</li>
                    <li>其他：包括担保、信保等</li>
                </ul>
                <p>
                    以上定义均适用于本报告。
                </p>
            </div>
        );        if(disabled) {
            return (
                <table width="100%" className="report-table-sp">
                    <colgroup>
                        <col width="50"/>
                        <col width="15%"/>
                        <col/>
                        <col/>
                        <col/>
                        <col/>
                        <col/>
                        <col/>
                        <col/>
                        <col/>
                        <col/>
                        <col/>
                        <col/>
                        <col/>
                    </colgroup>
                    <thead>
                    <tr>
                        <th rowSpan="2" colSpan="2"></th>
                        <th colSpan="2" className="text-align-center">近7天申请次数和机构数</th>
                        <th colSpan="2" className="text-align-center">近15天申请次数和机构数</th>
                        <th colSpan="2" className="text-align-center">近1个月申请次数和机构数</th>
                        <th colSpan="2" className="text-align-center">近3个月申请次数和机构数</th>
                        <th colSpan="2" className="text-align-center">近6个月申请次数和机构数</th>
                        <th colSpan="2" className="text-align-center">近12个月申请次数和机构数</th>
                    </tr>
                    <tr>
                        <th className="text-align-center">身份证查询</th>
                        <th className="text-align-center">手机号查询</th>
                        <th className="text-align-center">身份证查询</th>
                        <th className="text-align-center">手机号查询</th>
                        <th className="text-align-center">身份证查询</th>
                        <th className="text-align-center">手机号查询</th>
                        <th className="text-align-center">身份证查询</th>
                        <th className="text-align-center">手机号查询</th>
                        <th className="text-align-center">身份证查询</th>
                        <th className="text-align-center">手机号查询</th>
                        <th className="text-align-center">身份证查询</th>
                        <th className="text-align-center">手机号查询</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <th rowSpan="2">银行</th>
                        <th>总申请次数</th>
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
                        <td></td>
                    </tr>
                    <tr>
                        <th>总申请机构数</th>
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
                        <td></td>
                    </tr>
                    <tr>
                        <th rowSpan="15">
                            非银行
                            <Popover placement="topRight" content={content} trigger="hover">
                                <Icon type="exclamation-circle-o"/>
                            </Popover>
                        </th>
                        <th>本机构申请次数</th>
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
                        <td></td>
                    </tr>
                    <tr>
                        <th>总申请机构数</th>
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
                        <td></td>
                    </tr>
                    <tr>
                        <th>p2p申请次数</th>
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
                        <td></td>
                    </tr>
                    <tr>
                        <th>小贷申请次数</th>
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
                        <td></td>
                    </tr>
                    <tr>
                        <th>现金类分期申请次数</th>
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
                        <td></td>
                    </tr>
                    <tr>
                        <th>消费类分期申请次数</th>
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
                        <td></td>
                    </tr>
                    <tr>
                        <th>代偿类分期申请次数</th>
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
                        <td></td>
                    </tr>
                    <tr>
                        <th>其他申请次数</th>
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
                        <td></td>
                    </tr>
                    <tr>
                        <th>申请机构数</th>
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
                        <td></td>
                    </tr>
                    <tr>
                        <th>p2p申请机构数</th>
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
                        <td></td>
                    </tr>
                    <tr>
                        <th>小贷申请机构数</th>
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
                        <td></td>
                    </tr>
                    <tr>
                        <th>现金类分期申请机构数</th>
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
                        <td></td>
                    </tr>
                    <tr>
                        <th>消费类分期申请机构数</th>
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
                        <td></td>
                    </tr>
                    <tr>
                        <th>代偿类分期申请机构数</th>
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
                        <td></td>
                    </tr>
                    <tr>
                        <th>其他申请机构数</th>
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
                        <td></td>
                    </tr>
                    </tbody>
                </table>
            )
        } else {
            const {code, applyCountAndOrgs, applyCounts, firstAndLastApplies, message} = this.props.dataSource;
            if(code != 200) {
                return (
                    <div>
                        <h3>{message ? message : `code:${code}`}</h3>
                    </div>);
            }
            if(applyCountAndOrgs && !disabled) {
                return (
                    <table width="100%" className="report-table-sp">
                        <colgroup>
                            <col width="50"/>
                            <col width="15%"/>
                            <col/>
                            <col/>
                            <col/>
                            <col/>
                            <col/>
                            <col/>
                            <col/>
                            <col/>
                            <col/>
                            <col/>
                            <col/>
                            <col/>
                        </colgroup>
                        <thead>
                        <tr>
                            <th rowSpan="2" colSpan="2"></th>
                            <th colSpan="2" className="text-align-center">近7天申请次数和机构数</th>
                            <th colSpan="2" className="text-align-center">近15天申请次数和机构数</th>
                            <th colSpan="2" className="text-align-center">近1个月申请次数和机构数</th>
                            <th colSpan="2" className="text-align-center">近3个月申请次数和机构数</th>
                            <th colSpan="2" className="text-align-center">近6个月申请次数和机构数</th>
                            <th colSpan="2" className="text-align-center">近12个月申请次数和机构数</th>
                        </tr>
                        <tr>
                            <th className="text-align-center">身份证查询</th>
                            <th className="text-align-center">手机号查询</th>
                            <th className="text-align-center">身份证查询</th>
                            <th className="text-align-center">手机号查询</th>
                            <th className="text-align-center">身份证查询</th>
                            <th className="text-align-center">手机号查询</th>
                            <th className="text-align-center">身份证查询</th>
                            <th className="text-align-center">手机号查询</th>
                            <th className="text-align-center">身份证查询</th>
                            <th className="text-align-center">手机号查询</th>
                            <th className="text-align-center">身份证查询</th>
                            <th className="text-align-center">手机号查询</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <th rowSpan="2">银行</th>
                            <th>总申请次数</th>
                            <td>{applyCountAndOrgs.d7IdApplyCountAndOrg.bankAllnum}</td>
                            <td>{applyCountAndOrgs.d7CellApplyCountAndOrg.bankAllnum}</td>
                            <td>{applyCountAndOrgs.d15IdApplyCountAndOrg.bankAllnum}</td>
                            <td>{applyCountAndOrgs.d15CellApplyCountAndOrg.bankAllnum}</td>
                            <td>{applyCountAndOrgs.m1IdApplyCountAndOrg.bankAllnum}</td>
                            <td>{applyCountAndOrgs.m1CellApplyCountAndOrg.bankAllnum}</td>
                            <td>{applyCountAndOrgs.m3IdApplyCountAndOrg.bankAllnum}</td>
                            <td>{applyCountAndOrgs.m3CellApplyCountAndOrg.bankAllnum}</td>
                            <td>{applyCountAndOrgs.m6IdApplyCountAndOrg.bankAllnum}</td>
                            <td>{applyCountAndOrgs.m6CellApplyCountAndOrg.bankAllnum}</td>
                            <td>{applyCountAndOrgs.m12IdApplyCountAndOrg.bankAllnum}</td>
                            <td>{applyCountAndOrgs.m12CellApplyCountAndOrg.bankAllnum}</td>
                        </tr>
                        <tr>
                            <th>总申请机构数</th>
                            <td>{applyCountAndOrgs.d7IdApplyCountAndOrg.bankOrgnum}</td>
                            <td>{applyCountAndOrgs.d7CellApplyCountAndOrg.bankOrgnum}</td>
                            <td>{applyCountAndOrgs.d15IdApplyCountAndOrg.bankOrgnum}</td>
                            <td>{applyCountAndOrgs.d15CellApplyCountAndOrg.bankOrgnum}</td>
                            <td>{applyCountAndOrgs.m1IdApplyCountAndOrg.bankOrgnum}</td>
                            <td>{applyCountAndOrgs.m1CellApplyCountAndOrg.bankOrgnum}</td>
                            <td>{applyCountAndOrgs.m3IdApplyCountAndOrg.bankOrgnum}</td>
                            <td>{applyCountAndOrgs.m3CellApplyCountAndOrg.bankOrgnum}</td>
                            <td>{applyCountAndOrgs.m6IdApplyCountAndOrg.bankOrgnum}</td>
                            <td>{applyCountAndOrgs.m6CellApplyCountAndOrg.bankOrgnum}</td>
                            <td>{applyCountAndOrgs.m12IdApplyCountAndOrg.bankOrgnum}</td>
                            <td>{applyCountAndOrgs.m12CellApplyCountAndOrg.bankOrgnum}</td>
                        </tr>
                        <tr>
                            <th rowSpan="15">
                                非银行
                                <Popover placement="topRight" content={content} trigger="hover">
                                    <Icon type="exclamation-circle-o"/>
                                </Popover>
                            </th>
                            <th>本机构申请次数</th>
                            <td>{applyCountAndOrgs.d7IdApplyCountAndOrg.nbankSelfnum}</td>
                            <td>{applyCountAndOrgs.d7CellApplyCountAndOrg.nbankSelfnum}</td>
                            <td>{applyCountAndOrgs.d15IdApplyCountAndOrg.nbankSelfnum}</td>
                            <td>{applyCountAndOrgs.d15CellApplyCountAndOrg.nbankSelfnum}</td>
                            <td>{applyCountAndOrgs.m1IdApplyCountAndOrg.nbankSelfnum}</td>
                            <td>{applyCountAndOrgs.m1CellApplyCountAndOrg.nbankSelfnum}</td>
                            <td>{applyCountAndOrgs.m3IdApplyCountAndOrg.nbankSelfnum}</td>
                            <td>{applyCountAndOrgs.m3CellApplyCountAndOrg.nbankSelfnum}</td>
                            <td>{applyCountAndOrgs.m6IdApplyCountAndOrg.nbankSelfnum}</td>
                            <td>{applyCountAndOrgs.m6CellApplyCountAndOrg.nbankSelfnum}</td>
                            <td>{applyCountAndOrgs.m12IdApplyCountAndOrg.nbankSelfnum}</td>
                            <td>{applyCountAndOrgs.m12CellApplyCountAndOrg.nbankSelfnum}</td>
                        </tr>
                        <tr>
                            <th>总申请机构数</th>
                            <td>{applyCountAndOrgs.d7IdApplyCountAndOrg.nbankAllnum}</td>
                            <td>{applyCountAndOrgs.d7CellApplyCountAndOrg.nbankAllnum}</td>
                            <td>{applyCountAndOrgs.d15IdApplyCountAndOrg.nbankAllnum}</td>
                            <td>{applyCountAndOrgs.d15CellApplyCountAndOrg.nbankAllnum}</td>
                            <td>{applyCountAndOrgs.m1IdApplyCountAndOrg.nbankAllnum}</td>
                            <td>{applyCountAndOrgs.m1CellApplyCountAndOrg.nbankAllnum}</td>
                            <td>{applyCountAndOrgs.m3IdApplyCountAndOrg.nbankAllnum}</td>
                            <td>{applyCountAndOrgs.m3CellApplyCountAndOrg.nbankAllnum}</td>
                            <td>{applyCountAndOrgs.m6IdApplyCountAndOrg.nbankAllnum}</td>
                            <td>{applyCountAndOrgs.m6CellApplyCountAndOrg.nbankAllnum}</td>
                            <td>{applyCountAndOrgs.m12IdApplyCountAndOrg.nbankAllnum}</td>
                            <td>{applyCountAndOrgs.m12CellApplyCountAndOrg.nbankAllnum}</td>
                        </tr>
                        <tr>
                            <th>p2p申请次数</th>
                            <td>{applyCountAndOrgs.d7IdApplyCountAndOrg.nbankP2pAllnum}</td>
                            <td>{applyCountAndOrgs.d7CellApplyCountAndOrg.nbankP2pAllnum}</td>
                            <td>{applyCountAndOrgs.d15IdApplyCountAndOrg.nbankP2pAllnum}</td>
                            <td>{applyCountAndOrgs.d15CellApplyCountAndOrg.nbankP2pAllnum}</td>
                            <td>{applyCountAndOrgs.m1IdApplyCountAndOrg.nbankP2pAllnum}</td>
                            <td>{applyCountAndOrgs.m1CellApplyCountAndOrg.nbankP2pAllnum}</td>
                            <td>{applyCountAndOrgs.m3IdApplyCountAndOrg.nbankP2pAllnum}</td>
                            <td>{applyCountAndOrgs.m3CellApplyCountAndOrg.nbankP2pAllnum}</td>
                            <td>{applyCountAndOrgs.m6IdApplyCountAndOrg.nbankP2pAllnum}</td>
                            <td>{applyCountAndOrgs.m6CellApplyCountAndOrg.nbankP2pAllnum}</td>
                            <td>{applyCountAndOrgs.m12IdApplyCountAndOrg.nbankP2pAllnum}</td>
                            <td>{applyCountAndOrgs.m12CellApplyCountAndOrg.nbankP2pAllnum}</td>
                        </tr>
                        <tr>
                            <th>小贷申请次数</th>
                            <td>{applyCountAndOrgs.d7IdApplyCountAndOrg.nbankMcAllnum}</td>
                            <td>{applyCountAndOrgs.d7CellApplyCountAndOrg.nbankMcAllnum}</td>
                            <td>{applyCountAndOrgs.d15IdApplyCountAndOrg.nbankMcAllnum}</td>
                            <td>{applyCountAndOrgs.d15CellApplyCountAndOrg.nbankMcAllnum}</td>
                            <td>{applyCountAndOrgs.m1IdApplyCountAndOrg.nbankMcAllnum}</td>
                            <td>{applyCountAndOrgs.m1CellApplyCountAndOrg.nbankMcAllnum}</td>
                            <td>{applyCountAndOrgs.m3IdApplyCountAndOrg.nbankMcAllnum}</td>
                            <td>{applyCountAndOrgs.m3CellApplyCountAndOrg.nbankMcAllnum}</td>
                            <td>{applyCountAndOrgs.m6IdApplyCountAndOrg.nbankMcAllnum}</td>
                            <td>{applyCountAndOrgs.m6CellApplyCountAndOrg.nbankMcAllnum}</td>
                            <td>{applyCountAndOrgs.m12IdApplyCountAndOrg.nbankMcAllnum}</td>
                            <td>{applyCountAndOrgs.m12CellApplyCountAndOrg.nbankMcAllnum}</td>
                        </tr>
                        <tr>
                            <th>现金类分期申请次数</th>
                            <td>{applyCountAndOrgs.d7IdApplyCountAndOrg.nbankCaAllnum}</td>
                            <td>{applyCountAndOrgs.d7CellApplyCountAndOrg.nbankCaAllnum}</td>
                            <td>{applyCountAndOrgs.d15IdApplyCountAndOrg.nbankCaAllnum}</td>
                            <td>{applyCountAndOrgs.d15CellApplyCountAndOrg.nbankCaAllnum}</td>
                            <td>{applyCountAndOrgs.m1IdApplyCountAndOrg.nbankCaAllnum}</td>
                            <td>{applyCountAndOrgs.m1CellApplyCountAndOrg.nbankCaAllnum}</td>
                            <td>{applyCountAndOrgs.m3IdApplyCountAndOrg.nbankCaAllnum}</td>
                            <td>{applyCountAndOrgs.m3CellApplyCountAndOrg.nbankCaAllnum}</td>
                            <td>{applyCountAndOrgs.m6IdApplyCountAndOrg.nbankCaAllnum}</td>
                            <td>{applyCountAndOrgs.m6CellApplyCountAndOrg.nbankCaAllnum}</td>
                            <td>{applyCountAndOrgs.m12IdApplyCountAndOrg.nbankCaAllnum}</td>
                            <td>{applyCountAndOrgs.m12CellApplyCountAndOrg.nbankCaAllnum}</td>
                        </tr>
                        <tr>
                            <th>消费类分期申请次数</th>
                            <td>{applyCountAndOrgs.d7IdApplyCountAndOrg.nbankCfAllnum}</td>
                            <td>{applyCountAndOrgs.d7CellApplyCountAndOrg.nbankCfAllnum}</td>
                            <td>{applyCountAndOrgs.d15IdApplyCountAndOrg.nbankCfAllnum}</td>
                            <td>{applyCountAndOrgs.d15CellApplyCountAndOrg.nbankCfAllnum}</td>
                            <td>{applyCountAndOrgs.m1IdApplyCountAndOrg.nbankCfAllnum}</td>
                            <td>{applyCountAndOrgs.m1CellApplyCountAndOrg.nbankCfAllnum}</td>
                            <td>{applyCountAndOrgs.m3IdApplyCountAndOrg.nbankCfAllnum}</td>
                            <td>{applyCountAndOrgs.m3CellApplyCountAndOrg.nbankCfAllnum}</td>
                            <td>{applyCountAndOrgs.m6IdApplyCountAndOrg.nbankCfAllnum}</td>
                            <td>{applyCountAndOrgs.m6CellApplyCountAndOrg.nbankCfAllnum}</td>
                            <td>{applyCountAndOrgs.m12IdApplyCountAndOrg.nbankCfAllnum}</td>
                            <td>{applyCountAndOrgs.m12CellApplyCountAndOrg.nbankCfAllnum}</td>
                        </tr>
                        <tr>
                            <th>代偿类分期申请次数</th>
                            <td>{applyCountAndOrgs.d7IdApplyCountAndOrg.nbankComAllnum}</td>
                            <td>{applyCountAndOrgs.d7CellApplyCountAndOrg.nbankComAllnum}</td>
                            <td>{applyCountAndOrgs.d15IdApplyCountAndOrg.nbankComAllnum}</td>
                            <td>{applyCountAndOrgs.d15CellApplyCountAndOrg.nbankComAllnum}</td>
                            <td>{applyCountAndOrgs.m1IdApplyCountAndOrg.nbankComAllnum}</td>
                            <td>{applyCountAndOrgs.m1CellApplyCountAndOrg.nbankComAllnum}</td>
                            <td>{applyCountAndOrgs.m3IdApplyCountAndOrg.nbankComAllnum}</td>
                            <td>{applyCountAndOrgs.m3CellApplyCountAndOrg.nbankComAllnum}</td>
                            <td>{applyCountAndOrgs.m6IdApplyCountAndOrg.nbankComAllnum}</td>
                            <td>{applyCountAndOrgs.m6CellApplyCountAndOrg.nbankComAllnum}</td>
                            <td>{applyCountAndOrgs.m12IdApplyCountAndOrg.nbankComAllnum}</td>
                            <td>{applyCountAndOrgs.m12CellApplyCountAndOrg.nbankComAllnum}</td>
                        </tr>
                        <tr>
                            <th>其他申请次数</th>
                            <td>{applyCountAndOrgs.d7IdApplyCountAndOrg.nbankOthAllnum}</td>
                            <td>{applyCountAndOrgs.d7CellApplyCountAndOrg.nbankOthAllnum}</td>
                            <td>{applyCountAndOrgs.d15IdApplyCountAndOrg.nbankOthAllnum}</td>
                            <td>{applyCountAndOrgs.d15CellApplyCountAndOrg.nbankOthAllnum}</td>
                            <td>{applyCountAndOrgs.m1IdApplyCountAndOrg.nbankOthAllnum}</td>
                            <td>{applyCountAndOrgs.m1CellApplyCountAndOrg.nbankOthAllnum}</td>
                            <td>{applyCountAndOrgs.m3IdApplyCountAndOrg.nbankOthAllnum}</td>
                            <td>{applyCountAndOrgs.m3CellApplyCountAndOrg.nbankOthAllnum}</td>
                            <td>{applyCountAndOrgs.m6IdApplyCountAndOrg.nbankOthAllnum}</td>
                            <td>{applyCountAndOrgs.m6CellApplyCountAndOrg.nbankOthAllnum}</td>
                            <td>{applyCountAndOrgs.m12IdApplyCountAndOrg.nbankOthAllnum}</td>
                            <td>{applyCountAndOrgs.m12CellApplyCountAndOrg.nbankOthAllnum}</td>
                        </tr>
                        <tr>
                            <th>申请机构数</th>
                            <td>{applyCountAndOrgs.d7IdApplyCountAndOrg.nbankOrgnum}</td>
                            <td>{applyCountAndOrgs.d7CellApplyCountAndOrg.nbankOrgnum}</td>
                            <td>{applyCountAndOrgs.d15IdApplyCountAndOrg.nbankOrgnum}</td>
                            <td>{applyCountAndOrgs.d15CellApplyCountAndOrg.nbankOrgnum}</td>
                            <td>{applyCountAndOrgs.m1IdApplyCountAndOrg.nbankOrgnum}</td>
                            <td>{applyCountAndOrgs.m1CellApplyCountAndOrg.nbankOrgnum}</td>
                            <td>{applyCountAndOrgs.m3IdApplyCountAndOrg.nbankOrgnum}</td>
                            <td>{applyCountAndOrgs.m3CellApplyCountAndOrg.nbankOrgnum}</td>
                            <td>{applyCountAndOrgs.m6IdApplyCountAndOrg.nbankOrgnum}</td>
                            <td>{applyCountAndOrgs.m6CellApplyCountAndOrg.nbankOrgnum}</td>
                            <td>{applyCountAndOrgs.m12IdApplyCountAndOrg.nbankOrgnum}</td>
                            <td>{applyCountAndOrgs.m12CellApplyCountAndOrg.nbankOrgnum}</td>
                        </tr>
                        <tr>
                            <th>p2p申请机构数</th>
                            <td>{applyCountAndOrgs.d7IdApplyCountAndOrg.nbankP2pOrgnum}</td>
                            <td>{applyCountAndOrgs.d7CellApplyCountAndOrg.nbankP2pOrgnum}</td>
                            <td>{applyCountAndOrgs.d15IdApplyCountAndOrg.nbankP2pOrgnum}</td>
                            <td>{applyCountAndOrgs.d15CellApplyCountAndOrg.nbankP2pOrgnum}</td>
                            <td>{applyCountAndOrgs.m1IdApplyCountAndOrg.nbankP2pOrgnum}</td>
                            <td>{applyCountAndOrgs.m1CellApplyCountAndOrg.nbankP2pOrgnum}</td>
                            <td>{applyCountAndOrgs.m3IdApplyCountAndOrg.nbankP2pOrgnum}</td>
                            <td>{applyCountAndOrgs.m3CellApplyCountAndOrg.nbankP2pOrgnum}</td>
                            <td>{applyCountAndOrgs.m6IdApplyCountAndOrg.nbankP2pOrgnum}</td>
                            <td>{applyCountAndOrgs.m6CellApplyCountAndOrg.nbankP2pOrgnum}</td>
                            <td>{applyCountAndOrgs.m12IdApplyCountAndOrg.nbankP2pOrgnum}</td>
                            <td>{applyCountAndOrgs.m12CellApplyCountAndOrg.nbankP2pOrgnum}</td>
                        </tr>
                        <tr>
                            <th>小贷申请机构数</th>
                            <td>{applyCountAndOrgs.d7IdApplyCountAndOrg.nbankMcOrgnum}</td>
                            <td>{applyCountAndOrgs.d7CellApplyCountAndOrg.nbankMcOrgnum}</td>
                            <td>{applyCountAndOrgs.d15IdApplyCountAndOrg.nbankMcOrgnum}</td>
                            <td>{applyCountAndOrgs.d15CellApplyCountAndOrg.nbankMcOrgnum}</td>
                            <td>{applyCountAndOrgs.m1IdApplyCountAndOrg.nbankMcOrgnum}</td>
                            <td>{applyCountAndOrgs.m1CellApplyCountAndOrg.nbankMcOrgnum}</td>
                            <td>{applyCountAndOrgs.m3IdApplyCountAndOrg.nbankMcOrgnum}</td>
                            <td>{applyCountAndOrgs.m3CellApplyCountAndOrg.nbankMcOrgnum}</td>
                            <td>{applyCountAndOrgs.m6IdApplyCountAndOrg.nbankMcOrgnum}</td>
                            <td>{applyCountAndOrgs.m6CellApplyCountAndOrg.nbankMcOrgnum}</td>
                            <td>{applyCountAndOrgs.m12IdApplyCountAndOrg.nbankMcOrgnum}</td>
                            <td>{applyCountAndOrgs.m12CellApplyCountAndOrg.nbankMcOrgnum}</td>
                        </tr>
                        <tr>
                            <th>现金类分期申请机构数</th>
                            <td>{applyCountAndOrgs.d7IdApplyCountAndOrg.nbankCaOrgnum}</td>
                            <td>{applyCountAndOrgs.d7CellApplyCountAndOrg.nbankCaOrgnum}</td>
                            <td>{applyCountAndOrgs.d15IdApplyCountAndOrg.nbankCaOrgnum}</td>
                            <td>{applyCountAndOrgs.d15CellApplyCountAndOrg.nbankCaOrgnum}</td>
                            <td>{applyCountAndOrgs.m1IdApplyCountAndOrg.nbankCaOrgnum}</td>
                            <td>{applyCountAndOrgs.m1CellApplyCountAndOrg.nbankCaOrgnum}</td>
                            <td>{applyCountAndOrgs.m3IdApplyCountAndOrg.nbankCaOrgnum}</td>
                            <td>{applyCountAndOrgs.m3CellApplyCountAndOrg.nbankCaOrgnum}</td>
                            <td>{applyCountAndOrgs.m6IdApplyCountAndOrg.nbankCaOrgnum}</td>
                            <td>{applyCountAndOrgs.m6CellApplyCountAndOrg.nbankCaOrgnum}</td>
                            <td>{applyCountAndOrgs.m12IdApplyCountAndOrg.nbankCaOrgnum}</td>
                            <td>{applyCountAndOrgs.m12CellApplyCountAndOrg.nbankCaOrgnum}</td>
                        </tr>
                        <tr>
                            <th>消费类分期申请机构数</th>
                            <td>{applyCountAndOrgs.d7IdApplyCountAndOrg.nbankCfOrgnum}</td>
                            <td>{applyCountAndOrgs.d7CellApplyCountAndOrg.nbankCfOrgnum}</td>
                            <td>{applyCountAndOrgs.d15IdApplyCountAndOrg.nbankCfOrgnum}</td>
                            <td>{applyCountAndOrgs.d15CellApplyCountAndOrg.nbankCfOrgnum}</td>
                            <td>{applyCountAndOrgs.m1IdApplyCountAndOrg.nbankCfOrgnum}</td>
                            <td>{applyCountAndOrgs.m1CellApplyCountAndOrg.nbankCfOrgnum}</td>
                            <td>{applyCountAndOrgs.m3IdApplyCountAndOrg.nbankCfOrgnum}</td>
                            <td>{applyCountAndOrgs.m3CellApplyCountAndOrg.nbankCfOrgnum}</td>
                            <td>{applyCountAndOrgs.m6IdApplyCountAndOrg.nbankCfOrgnum}</td>
                            <td>{applyCountAndOrgs.m6CellApplyCountAndOrg.nbankCfOrgnum}</td>
                            <td>{applyCountAndOrgs.m12IdApplyCountAndOrg.nbankCfOrgnum}</td>
                            <td>{applyCountAndOrgs.m12CellApplyCountAndOrg.nbankCfOrgnum}</td>
                        </tr>
                        <tr>
                            <th>代偿类分期申请机构数</th>
                            <td>{applyCountAndOrgs.d7IdApplyCountAndOrg.nbankComOrgnum}</td>
                            <td>{applyCountAndOrgs.d7CellApplyCountAndOrg.nbankComOrgnum}</td>
                            <td>{applyCountAndOrgs.d15IdApplyCountAndOrg.nbankComOrgnum}</td>
                            <td>{applyCountAndOrgs.d15CellApplyCountAndOrg.nbankComOrgnum}</td>
                            <td>{applyCountAndOrgs.m1IdApplyCountAndOrg.nbankComOrgnum}</td>
                            <td>{applyCountAndOrgs.m1CellApplyCountAndOrg.nbankComOrgnum}</td>
                            <td>{applyCountAndOrgs.m3IdApplyCountAndOrg.nbankComOrgnum}</td>
                            <td>{applyCountAndOrgs.m3CellApplyCountAndOrg.nbankComOrgnum}</td>
                            <td>{applyCountAndOrgs.m6IdApplyCountAndOrg.nbankComOrgnum}</td>
                            <td>{applyCountAndOrgs.m6CellApplyCountAndOrg.nbankComOrgnum}</td>
                            <td>{applyCountAndOrgs.m12IdApplyCountAndOrg.nbankComOrgnum}</td>
                            <td>{applyCountAndOrgs.m12CellApplyCountAndOrg.nbankComOrgnum}</td>
                        </tr>
                        <tr>
                            <th>其他申请机构数</th>
                            <td>{applyCountAndOrgs.d7IdApplyCountAndOrg.nbankOthOrgnum}</td>
                            <td>{applyCountAndOrgs.d7CellApplyCountAndOrg.nbankOthOrgnum}</td>
                            <td>{applyCountAndOrgs.d15IdApplyCountAndOrg.nbankOthOrgnum}</td>
                            <td>{applyCountAndOrgs.d15CellApplyCountAndOrg.nbankOthOrgnum}</td>
                            <td>{applyCountAndOrgs.m1IdApplyCountAndOrg.nbankOthOrgnum}</td>
                            <td>{applyCountAndOrgs.m1CellApplyCountAndOrg.nbankOthOrgnum}</td>
                            <td>{applyCountAndOrgs.m3IdApplyCountAndOrg.nbankOthOrgnum}</td>
                            <td>{applyCountAndOrgs.m3CellApplyCountAndOrg.nbankOthOrgnum}</td>
                            <td>{applyCountAndOrgs.m6IdApplyCountAndOrg.nbankOthOrgnum}</td>
                            <td>{applyCountAndOrgs.m6CellApplyCountAndOrg.nbankOthOrgnum}</td>
                            <td>{applyCountAndOrgs.m12IdApplyCountAndOrg.nbankOthOrgnum}</td>
                            <td>{applyCountAndOrgs.m12CellApplyCountAndOrg.nbankOthOrgnum}</td>
                        </tr>
                        </tbody>
                    </table>
                )
            }
        }
    }

    get applyCounts() {
        const {disabled} = this.props;
        if(disabled) {
            return (
                <div>
                    <table width="100%" className="report-table-sp">
                        <colgroup>
                            <col width="15%"/>
                            <col/>
                            <col/>
                            <col/>
                            <col/>
                            <col/>
                            <col/>
                        </colgroup>
                        <thead>
                        <tr>
                            <th rowSpan="2"></th>
                            <th colSpan="2" className="text-align-center">近3个月申请记录汇总</th>
                            <th colSpan="2" className="text-align-center">近6个月申请记录汇总</th>
                            <th colSpan="2" className="text-align-center">近12个月申请记录汇总</th>
                        </tr>
                        <tr>
                            <th className="text-align-center">身份证查询</th>
                            <th className="text-align-center">手机号查询</th>
                            <th className="text-align-center">身份证查询</th>
                            <th className="text-align-center">手机号查询</th>
                            <th className="text-align-center">身份证查询</th>
                            <th className="text-align-center">手机号查询</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <th>申请记录月份数</th>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <th>平均每月申请次数(有申请月份平均)</th>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <th>最大月申请次数</th>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <th>最小月申请次数</th>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <th>申请最大间隔天数</th>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <th>申请最小间隔天数</th>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        </tbody>
                    </table>
                    <table width="100%" className="report-table-sp">
                        <colgroup>
                            <col width="50"/>
                            <col width="15%"/>
                            <col/>
                            <col/>
                            <col/>
                            <col/>
                            <col/>
                            <col/>
                            <col/>
                        </colgroup>
                        <thead>
                        <tr>
                            <th rowSpan="2" colSpan="2"></th>
                            <th colSpan="2" className="text-align-center">近3个月申请记录汇总</th>
                            <th colSpan="2" className="text-align-center">近6个月申请记录汇总</th>
                            <th colSpan="2" className="text-align-center">近12个月申请记录汇总</th>
                        </tr>
                        <tr>
                            <th className="text-align-center">身份证查询</th>
                            <th className="text-align-center">手机号查询</th>
                            <th className="text-align-center">身份证查询</th>
                            <th className="text-align-center">手机号查询</th>
                            <th className="text-align-center">身份证查询</th>
                            <th className="text-align-center">手机号查询</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <th rowSpan="6">银行</th>
                            <th>申请记录月份数</th>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <th>平均每月申请次数(有申请月份平均)</th>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <th>最大月申请次数</th>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <th>最小月申请次数</th>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <th>申请最大间隔天数</th>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <th>申请最小间隔天数</th>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <th rowSpan="6">非银行</th>
                            <th>申请记录月份数</th>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <th>平均每月申请次数(有申请月份平均)</th>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <th>最大月申请次数</th>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <th>最小月申请次数</th>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <th>申请最大间隔天数</th>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <th>申请最小间隔天数</th>
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
            const {code, applyCounts, message} = this.props.dataSource;
            if(code != 200) {
                return (
                    <div>
                        <h3>{message ? message : `code:${code}`}</h3>
                    </div>);
            }
            if(applyCounts && !disabled) {
                return (
                    <div>
                        <table width="100%" className="report-table-sp">
                            <colgroup>
                                <col width="15%"/>
                                <col/>
                                <col/>
                            </colgroup>
                            <thead>
                            <tr>
                                <th rowSpan="2"></th>
                                <th colSpan="2" className="text-align-center">近3个月申请记录汇总</th>
                                <th colSpan="2" className="text-align-center">近6个月申请记录汇总</th>
                                <th colSpan="2" className="text-align-center">近12个月申请记录汇总</th>
                            </tr>
                            <tr>
                                <th className="text-align-center">身份证查询</th>
                                <th className="text-align-center">手机号查询</th>
                                <th className="text-align-center">身份证查询</th>
                                <th className="text-align-center">手机号查询</th>
                                <th className="text-align-center">身份证查询</th>
                                <th className="text-align-center">手机号查询</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <th>申请记录月份数</th>
                                <td>{applyCounts.m3IdApplyCount.totMons}</td>
                                <td>{applyCounts.m3CellApplyCount.totMons}</td>
                                <td>{applyCounts.m6IdApplyCount.totMons}</td>
                                <td>{applyCounts.m6CellApplyCount.totMons}</td>
                                <td>{applyCounts.m12IdApplyCount.totMons}</td>
                                <td>{applyCounts.m12CellApplyCount.totMons}</td>
                            </tr>
                            <tr>
                                <th>平均每月申请次数(有申请月份平均)</th>
                                <td>{applyCounts.m3IdApplyCount.avgMonnum}</td>
                                <td>{applyCounts.m3CellApplyCount.avgMonnum}</td>
                                <td>{applyCounts.m6IdApplyCount.avgMonnum}</td>
                                <td>{applyCounts.m6CellApplyCount.avgMonnum}</td>
                                <td>{applyCounts.m12IdApplyCount.avgMonnum}</td>
                                <td>{applyCounts.m12CellApplyCount.avgMonnum}</td>
                            </tr>
                            <tr>
                                <th>最大月申请次数</th>
                                <td>{applyCounts.m3IdApplyCount.maxMonnum}</td>
                                <td>{applyCounts.m3CellApplyCount.maxMonnum}</td>
                                <td>{applyCounts.m6IdApplyCount.maxMonnum}</td>
                                <td>{applyCounts.m6CellApplyCount.maxMonnum}</td>
                                <td>{applyCounts.m12IdApplyCount.maxMonnum}</td>
                                <td>{applyCounts.m12CellApplyCount.maxMonnum}</td>
                            </tr>
                            <tr>
                                <th>最小月申请次数</th>
                                <td>{applyCounts.m3IdApplyCount.minMonnum}</td>
                                <td>{applyCounts.m3CellApplyCount.minMonnum}</td>
                                <td>{applyCounts.m6IdApplyCount.minMonnum}</td>
                                <td>{applyCounts.m6CellApplyCount.minMonnum}</td>
                                <td>{applyCounts.m12IdApplyCount.minMonnum}</td>
                                <td>{applyCounts.m12CellApplyCount.minMonnum}</td>
                            </tr>
                            <tr>
                                <th>申请最大间隔天数</th>
                                <td>{applyCounts.m3IdApplyCount.maxInteday}</td>
                                <td>{applyCounts.m3CellApplyCount.maxInteday}</td>
                                <td>{applyCounts.m6IdApplyCount.maxInteday}</td>
                                <td>{applyCounts.m6CellApplyCount.maxInteday}</td>
                                <td>{applyCounts.m12IdApplyCount.maxInteday}</td>
                                <td>{applyCounts.m12CellApplyCount.maxInteday}</td>
                            </tr>
                            <tr>
                                <th>申请最小间隔天数</th>
                                <td>{applyCounts.m3IdApplyCount.minInteday}</td>
                                <td>{applyCounts.m3CellApplyCount.minInteday}</td>
                                <td>{applyCounts.m6IdApplyCount.minInteday}</td>
                                <td>{applyCounts.m6CellApplyCount.minInteday}</td>
                                <td>{applyCounts.m12IdApplyCount.minInteday}</td>
                                <td>{applyCounts.m12CellApplyCount.minInteday}</td>
                            </tr>
                            </tbody>
                        </table>
                        <table width="100%" className="report-table-sp">
                            <colgroup>
                                <col width="50"/>
                                <col width="15%"/>
                                <col/>
                                <col/>
                                <col/>
                                <col/>
                                <col/>
                                <col/>
                                <col/>
                            </colgroup>
                            <thead>
                            <tr>
                                <th rowSpan="2" colSpan="2"></th>
                                <th colSpan="2" className="text-align-center">近3个月申请记录汇总</th>
                                <th colSpan="2" className="text-align-center">近6个月申请记录汇总</th>
                                <th colSpan="2" className="text-align-center">近12个月申请记录汇总</th>
                            </tr>
                            <tr>
                                <th className="text-align-center">身份证查询</th>
                                <th className="text-align-center">手机号查询</th>
                                <th className="text-align-center">身份证查询</th>
                                <th className="text-align-center">手机号查询</th>
                                <th className="text-align-center">身份证查询</th>
                                <th className="text-align-center">手机号查询</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <th rowSpan="6">银行</th>
                                <th>申请记录月份数</th>
                                <td>{applyCounts.m3IdApplyCount.bankTotMons}</td>
                                <td>{applyCounts.m3CellApplyCount.bankTotMons}</td>
                                <td>{applyCounts.m6IdApplyCount.bankTotMons}</td>
                                <td>{applyCounts.m6CellApplyCount.bankTotMons}</td>
                                <td>{applyCounts.m12IdApplyCount.bankTotMons}</td>
                                <td>{applyCounts.m12CellApplyCount.bankTotMons}</td>
                            </tr>
                            <tr>
                                <th>平均每月申请次数(有申请月份平均)</th>
                                <td>{applyCounts.m3IdApplyCount.bankAvgMonnum}</td>
                                <td>{applyCounts.m3CellApplyCount.bankAvgMonnum}</td>
                                <td>{applyCounts.m6IdApplyCount.bankAvgMonnum}</td>
                                <td>{applyCounts.m6CellApplyCount.bankAvgMonnum}</td>
                                <td>{applyCounts.m12IdApplyCount.bankAvgMonnum}</td>
                                <td>{applyCounts.m12CellApplyCount.bankAvgMonnum}</td>
                            </tr>
                            <tr>
                                <th>最大月申请次数</th>
                                <td>{applyCounts.m3IdApplyCount.bankMaxMonnum}</td>
                                <td>{applyCounts.m3CellApplyCount.bankMaxMonnum}</td>
                                <td>{applyCounts.m6IdApplyCount.bankMaxMonnum}</td>
                                <td>{applyCounts.m6CellApplyCount.bankMaxMonnum}</td>
                                <td>{applyCounts.m12IdApplyCount.bankMaxMonnum}</td>
                                <td>{applyCounts.m12CellApplyCount.bankMaxMonnum}</td>
                            </tr>
                            <tr>
                                <th>最小月申请次数</th>
                                <td>{applyCounts.m3IdApplyCount.bankMinMonnum}</td>
                                <td>{applyCounts.m3CellApplyCount.bankMinMonnum}</td>
                                <td>{applyCounts.m6IdApplyCount.bankMinMonnum}</td>
                                <td>{applyCounts.m6CellApplyCount.bankMinMonnum}</td>
                                <td>{applyCounts.m12IdApplyCount.bankMinMonnum}</td>
                                <td>{applyCounts.m12CellApplyCount.bankMinMonnum}</td>
                            </tr>
                            <tr>
                                <th>申请最大间隔天数</th>
                                <td>{applyCounts.m3IdApplyCount.bankMaxInteday}</td>
                                <td>{applyCounts.m3CellApplyCount.bankMaxInteday}</td>
                                <td>{applyCounts.m6IdApplyCount.bankMaxInteday}</td>
                                <td>{applyCounts.m6CellApplyCount.bankMaxInteday}</td>
                                <td>{applyCounts.m12IdApplyCount.bankMaxInteday}</td>
                                <td>{applyCounts.m12CellApplyCount.bankMaxInteday}</td>
                            </tr>
                            <tr>
                                <th>申请最小间隔天数</th>
                                <td>{applyCounts.m3IdApplyCount.bankMinInteday}</td>
                                <td>{applyCounts.m3CellApplyCount.bankMinInteday}</td>
                                <td>{applyCounts.m6IdApplyCount.bankMinInteday}</td>
                                <td>{applyCounts.m6CellApplyCount.bankMinInteday}</td>
                                <td>{applyCounts.m12IdApplyCount.bankMinInteday}</td>
                                <td>{applyCounts.m12CellApplyCount.bankMinInteday}</td>
                            </tr>
                            <tr>
                                <th rowSpan="6">非银行</th>
                                <th>申请记录月份数</th>
                                <td>{applyCounts.m3IdApplyCount.nBankTotMons}</td>
                                <td>{applyCounts.m3CellApplyCount.nBankTotMons}</td>
                                <td>{applyCounts.m6IdApplyCount.nBankTotMons}</td>
                                <td>{applyCounts.m6CellApplyCount.nBankTotMons}</td>
                                <td>{applyCounts.m12IdApplyCount.nBankTotMons}</td>
                                <td>{applyCounts.m12CellApplyCount.nBankTotMons}</td>
                            </tr>
                            <tr>
                                <th>平均每月申请次数(有申请月份平均)</th>
                                <td>{applyCounts.m3IdApplyCount.nBankAvgMonnum}</td>
                                <td>{applyCounts.m3CellApplyCount.nBankAvgMonnum}</td>
                                <td>{applyCounts.m6IdApplyCount.nBankAvgMonnum}</td>
                                <td>{applyCounts.m6CellApplyCount.nBankAvgMonnum}</td>
                                <td>{applyCounts.m12IdApplyCount.nBankAvgMonnum}</td>
                                <td>{applyCounts.m12CellApplyCount.nBankAvgMonnum}</td>
                            </tr>
                            <tr>
                                <th>最大月申请次数</th>
                                <td>{applyCounts.m3IdApplyCount.nBankMaxMonnum}</td>
                                <td>{applyCounts.m3CellApplyCount.nBankMaxMonnum}</td>
                                <td>{applyCounts.m6IdApplyCount.nBankMaxMonnum}</td>
                                <td>{applyCounts.m6CellApplyCount.nBankMaxMonnum}</td>
                                <td>{applyCounts.m12IdApplyCount.nBankMaxMonnum}</td>
                                <td>{applyCounts.m12CellApplyCount.nBankMaxMonnum}</td>
                            </tr>
                            <tr>
                                <th>最小月申请次数</th>
                                <td>{applyCounts.m3IdApplyCount.nBankMinMonnum}</td>
                                <td>{applyCounts.m3CellApplyCount.nBankMinMonnum}</td>
                                <td>{applyCounts.m6IdApplyCount.nBankMinMonnum}</td>
                                <td>{applyCounts.m6CellApplyCount.nBankMinMonnum}</td>
                                <td>{applyCounts.m12IdApplyCount.nBankMinMonnum}</td>
                                <td>{applyCounts.m12CellApplyCount.nBankMinMonnum}</td>
                            </tr>
                            <tr>
                                <th>申请最大间隔天数</th>
                                <td>{applyCounts.m3IdApplyCount.nBankMaxInteday}</td>
                                <td>{applyCounts.m3CellApplyCount.nBankMaxInteday}</td>
                                <td>{applyCounts.m6IdApplyCount.nBankMaxInteday}</td>
                                <td>{applyCounts.m6CellApplyCount.nBankMaxInteday}</td>
                                <td>{applyCounts.m12IdApplyCount.nBankMaxInteday}</td>
                                <td>{applyCounts.m12CellApplyCount.nBankMaxInteday}</td>
                            </tr>
                            <tr>
                                <th>申请最小间隔天数</th>
                                <td>{applyCounts.m3IdApplyCount.nBankMinInteday}</td>
                                <td>{applyCounts.m3CellApplyCount.nBankMinInteday}</td>
                                <td>{applyCounts.m6IdApplyCount.nBankMinInteday}</td>
                                <td>{applyCounts.m6CellApplyCount.nBankMinInteday}</td>
                                <td>{applyCounts.m12IdApplyCount.nBankMinInteday}</td>
                                <td>{applyCounts.m12CellApplyCount.nBankMinInteday}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                )
            }
        }
    }

    get firstAndLastApplies() {
        const {disabled} = this.props;
        if(disabled) {
            return (
                <table width="100%" className="report-table-sp">
                    <colgroup>
                        <col width="50"/>
                        <col width="15%"/>
                        <col/>
                        <col/>
                    </colgroup>
                    <thead>
                    <tr>
                        <th rowSpan="2" colSpan="2"></th>
                        <th colSpan="2" className="text-align-center">最近最早申请记录</th>
                    </tr>
                    <tr>
                        <th className="text-align-center">身份证查询</th>
                        <th className="text-align-center">手机号查询</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <th rowSpan="4">银行</th>
                        <th>距最早在银行机构申请的间隔天数</th>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <th>距最近在银行机构申请的间隔天数</th>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <th>最近开始在银行机构连续申请的次数</th>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <th>最近开始在银行机构连续申请的持续天数</th>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <th rowSpan="4">非银行</th>
                        <th>距最早在非银行机构申请的间隔天数</th>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <th>距最近在非银行机构申请的间隔天数</th>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <th>最近开始在非银行机构连申请的次数</th>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <th>最近开始在非银行机构连续申请的持续天数</th>
                        <td></td>
                        <td></td>
                    </tr>
                    </tbody>
                </table>
            )
        } else {
            const {code, firstAndLastApplies, message} = this.props.dataSource;
            if(code != 200) {
                return (
                    <div>
                        <h3>{message ? message : `code:${code}`}</h3>
                    </div>);
            }
            if(firstAndLastApplies && !disabled) {
                return (
                    <table width="100%" className="report-table-sp">
                        <colgroup>
                            <col width="50"/>
                            <col width="15%"/>
                            <col/>
                            <col/>
                        </colgroup>
                        <thead>
                        <tr>
                            <th rowSpan="2" colSpan="2"></th>
                            <th colSpan="2" className="text-align-center">最近最早申请记录</th>
                        </tr>
                        <tr>
                            <th className="text-align-center">身份证查询</th>
                            <th className="text-align-center">手机号查询</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <th rowSpan="4">银行</th>
                            <th>距最早在银行机构申请的间隔天数</th>
                            <td>{firstAndLastApplies.firstAndLastIdApply.firstBankInteday}</td>
                            <td>{firstAndLastApplies.firstAndLastCellApply.firstBankInteday}</td>
                        </tr>
                        <tr>
                            <th>距最近在银行机构申请的间隔天数</th>
                            <td>{firstAndLastApplies.firstAndLastIdApply.lastBankInteday}</td>
                            <td>{firstAndLastApplies.firstAndLastCellApply.lastBankInteday}</td>
                        </tr>
                        <tr>
                            <th>最近开始在银行机构连续申请的次数</th>
                            <td>{firstAndLastApplies.firstAndLastIdApply.lastBankConsnum}</td>
                            <td>{firstAndLastApplies.firstAndLastCellApply.lastBankConsnum}</td>
                        </tr>
                        <tr>
                            <th>最近开始在银行机构连续申请的持续天数</th>
                            <td>{firstAndLastApplies.firstAndLastIdApply.lastBankCsinteday}</td>
                            <td>{firstAndLastApplies.firstAndLastCellApply.lastBankCsinteday}</td>
                        </tr>
                        <tr>
                            <th rowSpan="4">非银行</th>
                            <th>距最早在非银行机构申请的间隔天数</th>
                            <td>{firstAndLastApplies.firstAndLastIdApply.firstNbankInteday}</td>
                            <td>{firstAndLastApplies.firstAndLastCellApply.firstNbankInteday}</td>
                        </tr>
                        <tr>
                            <th>距最近在非银行机构申请的间隔天数</th>
                            <td>{firstAndLastApplies.firstAndLastIdApply.lastNbankInteday}</td>
                            <td>{firstAndLastApplies.firstAndLastCellApply.lastNbankInteday}</td>
                        </tr>
                        <tr>
                            <th>最近开始在非银行机构连申请的次数</th>
                            <td>{firstAndLastApplies.firstAndLastIdApply.lastNbankConsnum}</td>
                            <td>{firstAndLastApplies.firstAndLastCellApply.lastNbankConsnum}</td>
                        </tr>
                        <tr>
                            <th>最近开始在非银行机构连续申请的持续天数</th>
                            <td>{firstAndLastApplies.firstAndLastIdApply.lastNbankCsinteday}</td>
                            <td>{firstAndLastApplies.firstAndLastCellApply.lastNbankCsinteday}</td>
                        </tr>
                        </tbody>
                    </table>
                )
            }
        }
    }
}