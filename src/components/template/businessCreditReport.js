/**
 * Created by Ethan on 2017/2/14.
 * 9:56
 * 企业信用查询
 */
import {BaseReport} from './BaseReport';
import React, {Component} from 'react';
import {Row, Col, Collapse} from 'antd';
import {helper} from 'UTILS';
import './style.less';
const Panel = Collapse.Panel;


export class BusinessCredit extends BaseReport {
    static defaultProps = {
        disabled: null, //是否模板
        dataSource: {}
    }

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        const {disabled, dataSource} = this.props;
        return (
            <div className="fn-pa-10">
                <h2 style={this.css.center}>
                    <span style={this.css.color}>企业信用报告</span>
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
                        <Col span={4}>企业名称</Col>
                        <Col span={8}>{this.base.corpName}</Col>
                        <Col span={4}>查询原因</Col>
                        <Col span={8}>{this.base.queryReasonID}</Col>
                    </Row>
                    <Row>
                        <Col span={4}>组织机构代码/社会信用代码</Col>
                        <Col span={8}>{this.base.orgCode}</Col>
                        <Col span={4}>工商注册号</Col>
                        <Col span={8}>{this.base.registerNo}</Col>
                    </Row>
                </div>
                {/*模块A*/}
                <Collapse bordered={false} defaultActiveKey={[
                    '1',
                    '2',
                    '3',
                    '4',
                    '5',
                    '6',
                    '7',
                    '8',
                    '9'
                ]}>
                    <Panel header="企业基本信息" key="1">
                        {/*模块A 企业基本信息*/}
                        {this.corpBaseNationalInfo}
                    </Panel>
                    <Panel header="企业注册地址及电话信息" key="2">
                        {/*模块A 企业注册地址及电话信息*/}
                        {this.registerContactInfos}
                    </Panel>
                    <Panel header="企业经营地址及电话信息" key="3">
                        {/*模块A 企业经营地址及电话信息*/}
                        {this.manageContactInfos}
                    </Panel>
                    <Panel header="企业股东信息" key="4">
                        {/*模块A 企业股东信息*/}
                        {this.nationalCorpShareholderInfo}
                    </Panel>
                    <Panel header="企业高管信息" key="5">
                        {/*模块A 企业高管信息*/}
                        {this.corpTopManagerInfo}
                    </Panel>
                    <Panel header="企业对外投资信息" key="6">
                        {/*模块A 企业对外投资信息*/}
                        {this.nationalCorpOtherShareholderInfo}
                    </Panel>
                    <Panel header="法定代表人对外投资信息" key="7">
                        {/*模块A 法定代表人对外投资信息*/}
                        {this.nationalFrOtherCorpShareholderInfo}
                    </Panel>
                    <Panel header="企业工商变更信息" key="8">
                        {/*模块A 企业工商变更信息*/}
                        {this.saicAlterInfo}
                    </Panel>
                    <Panel header="企业工商行政处罚信息" key="9">
                        {/*模块A 企业工商变更信息*/}
                        {this.saicCaseInfo}
                    </Panel>
                </Collapse>
                {/*更新时间*/}
                {this.update}
            </div>
        )
    }

    get base() { //基础数据
        const {disabled} = this.props;
        if (this.props.dataSource && !disabled) {
            const {base} = this.props.dataSource;
            return {
                corpName: base.corpName || '',
                queryReasonID: base.queryReasonID || '',
                orgCode: base.orgCode || '',
                registerNo: base.registerNo || '',

            }
        }
        return {
            corpName: '',
            queryReasonID: '',
            orgCode: '',
            registerNo: '',
        }
    }

    //企业基本信息
    get corpBaseNationalInfo() {
        const {disabled} = this.props;
        if (disabled) {
            return (

                    <table width="100%" className="report-table-sp">
                        <colgroup>
                            <col width="25%"/>
                            <col width="25%"/>
                            <col width="25%"/>
                            <col/>
                        </colgroup>
                        <thead></thead>
                        <tbody>
                            <tr>
                                <th>企业（机构）名称</th>
                                <td colSpan={3}></td>
                            </tr>

                            <tr>
                                <th>组织机构代码/社会信用代码</th>
                                <td></td>
                                <th>代码证有效期</th>
                                <td></td>
                            </tr>
                            <tr>
                                <th>法定代表人</th>
                                <td></td>
                                <th>企业状态</th>
                                <td></td>
                            </tr>
                            <tr>
                                <th>注册资本（单位：万元）</th>
                                <td></td>
                                <th>币种</th>
                                <td></td>
                            </tr>
                            <tr>
                                <th>注册日期</th>
                                <td></td>
                                <th>机构类型</th>
                                <td></td>
                            </tr>
                            <tr>
                                <th>开业日期</th>
                                <td></td>
                                <th>经营期限</th>
                                <td></td>
                            </tr>
                            <tr>
                                <th>工商注册号</th>
                                <td></td>
                                <th>最后年检年度</th>
                                <td></td>
                            </tr>
                            <tr>
                                <th>企业类型</th>
                                <td></td>
                                <th>最后年检日期</th>
                                <td></td>
                            </tr>
                            <tr>
                                <th>经济类型</th>
                                <td></td>
                                <th>注销日期</th>
                                <td></td>
                            </tr>
                            <tr>
                                <th>员工人数</th>
                                <td></td>
                                <th>吊销日期</th>
                                <td></td>
                            </tr>

                            <tr>
                                <th>工商登记机关</th>
                                <td colSpan={3}></td>
                            </tr>
                            <tr>
                                <th>企业网址</th>
                                <td colSpan={3}></td>
                            </tr>
                            <tr>
                                <th>所属行业代码</th>
                                <td colSpan={3}></td>
                            </tr>
                            <tr>
                                <th>所属行业门类</th>
                                <td colSpan={3}></td>
                            </tr>
                            <tr>
                                <th>所属行业大类</th>
                                <td colSpan={3}></td>
                            </tr>
                            <tr>
                                <th>所属行业中类</th>
                                <td colSpan={3}></td>
                            </tr>
                            <tr>
                                <th>所属行业小类</th>
                                <td colSpan={3}></td>
                            </tr>
                            <tr>
                                <th>经营范围</th>
                                <td colSpan={3}></td>
                            </tr>
                            <tr>
                                <th>经营许可项目</th>
                                <td colSpan={3}></td>
                            </tr>
                            <tr>
                                <th>一般经营项目</th>
                                <td colSpan={3}></td>
                            </tr>
                            <tr>
                                <th>经营范围及方式</th>
                                <td colSpan={3}></td>
                            </tr>

                        </tbody>
                    </table>

            )
        } else {
            const {corpBaseNationalInfo} = this.props.dataSource.map.cisReport;
            const {code, item, message} = corpBaseNationalInfo;
            if (code != 200) {
                return (
                    <div>
                        <h3>{message
                                ? message
                                : `code:${code}`}</h3>
                    </div>
                );
            }
            if (item && !disabled) {

                //判断对象或者数组
                const items = helper.templateToArray(item);

                var arr = [];
                for (var i = 0; i < items.length; i++) {
                    var data = items[i];
                    arr.push(
                        <table width="100%" key={i} className="report-table-sp">
                            <colgroup>
                                <col width="25%"/>
                                <col width="25%"/>
                                <col width="25%"/>
                                <col/>
                            </colgroup>
                            <thead></thead>
                            <tbody>
                                <tr>
                                    <th>企业（机构）名称</th>
                                    <td colSpan={3}>{data.corpName}</td>
                                </tr>

                                <tr>
                                    <th>组织机构代码/社会信用代码</th>
                                    <td>{data.orgCode}</td>
                                    <th>代码证有效期</th>
                                    <td>
                                        {
                                            data.handleDate && data.handleDate
                                            ?
                                            this.dateFormat(data.handleDate)
                                            +"至"+
                                            this.dateFormat(data.cancelDate)
                                            :
                                            null
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <th>法定代表人</th>
                                    <td>{data.artificialName
                                            ? data.artificialName
                                            : data.artificialName2}</td>
                                    <th>企业状态</th>
                                    <td>{data.flag
                                            ? data.flag
                                            : data.statusCaption2}</td>
                                </tr>
                                <tr>
                                    <th>注册资本（单位：万元）</th>
                                    <td>{data.registFund
                                            ? data.registFund
                                            : data.registFund2}</td>
                                    <th>币种</th>
                                    <td>{data.fundCurrency
                                            ? data.fundCurrency
                                            : data.fundCurrency2}</td>
                                </tr>
                                <tr>
                                    <th>注册日期</th>
                                    <td>{this.dateFormat(data.registDate)}</td>
                                    <th>机构类型</th>
                                    <td>{data.organType}</td>
                                </tr>
                                <tr>
                                    <th>开业日期</th>
                                    <td>{this.dateFormat(data.openDate)}</td>
                                    <th>经营期限</th>
                                    <td>
                                        {
                                            data.manageBeginDate && data.manageEndDate
                                            ?
                                            this.dateFormat(data.manageBeginDate)
                                            +"至"+
                                            this.dateFormat(data.manageEndDate)
                                            :
                                            null
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <th>工商注册号</th>
                                    <td>{data.registerNo}</td>
                                    <th>最后年检年度</th>
                                    <td>
                                        {
                                            data.lastCheckYear
                                            ?
                                            data.lastCheckYear+"年"
                                            :
                                            null
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <th>企业类型</th>
                                    <td>{data.corpTypeCaption}</td>
                                    <th>最后年检日期</th>
                                    <td>{this.dateFormat(data.lastCheckDate)}</td>
                                </tr>
                                <tr>
                                    <th>经济类型</th>
                                    <td>{data.economicType}</td>
                                    <th>注销日期</th>
                                    <td>{this.dateFormat(data.logoutDate)}</td>
                                </tr>
                                <tr>
                                    <th>员工人数</th>
                                    <td>{data.staffNumber}</td>
                                    <th>吊销日期</th>
                                    <td>{this.dateFormat(data.revokeDate)}</td>
                                </tr>

                                <tr>
                                    <th>工商登记机关</th>
                                    <td colSpan={3}>{data.registerDepartment}</td>
                                </tr>
                                <tr>
                                    <th>企业网址</th>
                                    <td colSpan={3}>{data.url}</td>
                                </tr>
                                <tr>
                                    <th>所属行业代码</th>
                                    <td colSpan={3}>{data.tradeCode}</td>
                                </tr>
                                <tr>
                                    <th>所属行业门类</th>
                                    <td colSpan={3}>{data.tradeName1}</td>
                                </tr>
                                <tr>
                                    <th>所属行业大类</th>
                                    <td colSpan={3}>{data.tradeName2}</td>
                                </tr>
                                <tr>
                                    <th>所属行业中类</th>
                                    <td colSpan={3}>{data.tradeName3}</td>
                                </tr>
                                <tr>
                                    <th>所属行业小类</th>
                                    <td colSpan={3}>{data.tradeName4}</td>
                                </tr>
                                <tr>
                                    <th>经营范围</th>
                                    <td colSpan={3}>{data.manageRange}</td>
                                </tr>
                                <tr>
                                    <th>经营许可项目</th>
                                    <td colSpan={3}>{data.allowManageProject}</td>
                                </tr>
                                <tr>
                                    <th>一般经营项目</th>
                                    <td colSpan={3}>{data.generalManageProject}</td>
                                </tr>
                                <tr>
                                    <th>经营范围及方式</th>
                                    <td colSpan={3}>{data.manageRangeFashion}</td>
                                </tr>

                            </tbody>
                        </table>
                    )
                }
                return (
                    <div>
                        {arr}
                    </div>


                );
            }

        }
    }

    //企业注册地址及电话信息
    get registerContactInfos() {
        const {disabled} = this.props;
        if (disabled) {
            return (

                    <table width="100%" className="report-table-sp">
                        <colgroup>
                            <col width="10%" />
                            <col/>
                            <col/>
                            <col/>
                            <col/>
                        </colgroup>
                        <thead>
                            <tr>
                                <th>序号</th>
                                <th>行政区划</th>
                                <th>注册地址</th>
                                <th>注册电话</th>
                                <th>邮编</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>

            )
        } else {
            const {registerContactInfos} = this.props.dataSource.map.cisReport;
            const { code,item,message } = registerContactInfos;
            if (code != 200) {
                return (
                    <div>
                        <h3>{message
                                ? message
                                : `code:${code}`}</h3>
                    </div>
                );
            }
            if (item && !disabled) {
                //判断对象或者数组
                const items = helper.templateToArray(item);

                var arr = [];
                for (var i = 0; i < items.length; i++) {
                    var data = items[i];
                    arr.push(
                        <tr key={i}>
                            <td>{i+1}</td>
                            <td>{data.areaDesc}</td>
                            <td>{data.address}</td>
                            <td>{data.tel}</td>
                            <td>{data.postCode}</td>
                        </tr>
                    )
                }
                return (

                            <table width="100%" className="report-table-sp">
                                <colgroup>
                                    <col width="10%" />
                                    <col/>
                                    <col/>
                                    <col/>
                                    <col/>
                                </colgroup>
                                <thead>
                                    <tr>
                                        <th>序号</th>
                                        <th>行政区划</th>
                                        <th>注册地址</th>
                                        <th>注册电话</th>
                                        <th>邮编</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {arr}
                                </tbody>
                            </table>

                );
            }
        }
    }

    //企业经营地址及电话信息
    get manageContactInfos() {
        const {disabled} = this.props;
        if (disabled) {
            return (

                    <table width="100%" className="report-table-sp">
                        <colgroup>
                            <col width="10%" />
                            <col/>
                            <col/>
                            <col/>
                            <col/>
                        </colgroup>
                        <thead>
                            <tr>
                                <th>序号</th>
                                <th>行政区划</th>
                                <th>经营地址</th>
                                <th>经营电话</th>
                                <th>邮编</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>


            )
        } else {
            const {manageContactInfos} = this.props.dataSource.map.cisReport;
            const {code, item, message} = manageContactInfos;
            if (code != 200) {
                return (
                    <div>
                        <h3>{message
                                ? message
                                : `code:${code}`}</h3>
                    </div>
                );
            }
            if (item && !disabled) {
                //判断对象或者数组
                const items = helper.templateToArray(item);

                var arr = [];
                for (var i = 0; i < items.length; i++) {
                    var data = items[i];
                    arr.push(
                        <tr key={i}>
                            <td>{i+1}</td>
                            <td>{data.areaDesc}</td>
                            <td>{data.address}</td>
                            <td>{data.tel}</td>
                            <td>{data.postCode}</td>
                        </tr>
                    )
                }
                return (

                        <table width="100%" className="report-table-sp">
                            <colgroup>
                                <col width="10%" />
                                <col/>
                                <col/>
                                <col/>
                                <col/>
                            </colgroup>
                            <thead>
                                <tr>
                                    <th>序号</th>
                                    <th>行政区划</th>
                                    <th>经营地址</th>
                                    <th>经营电话</th>
                                    <th>邮编</th>
                                </tr>
                            </thead>
                            <tbody>
                                {arr}
                            </tbody>
                        </table>

                );
            }
        }
    }

    //企业股东信息
    get nationalCorpShareholderInfo() {
        const {disabled} = this.props;
        if (disabled) {
            return (

                    <table width="100%" className="report-table-sp">
                        <colgroup>
                            <col width="10%" />
                            <col/>
                            <col/>
                            <col/>
                            <col/>
                            <col/>
                        </colgroup>
                        <thead>
                            <tr>
                                <th>序号</th>
                                <th>股东名称</th>
                                <th>认缴出资额（单位：万元）</th>
                                <th>出资比例(%)</th>
                                <th>币种</th>
                                <th>出资日期</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>2</td>
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
            const {nationalCorpShareholderInfo} = this.props.dataSource.map.cisReport;
            const {code, item, message} = nationalCorpShareholderInfo;
            if (code != 200) {
                return (
                    <div>
                        <h3>{message
                                ? message
                                : `code:${code}`}</h3>
                    </div>
                );
            }
            if (item && !disabled) {
                //判断对象或者数组
                const items = helper.templateToArray(item);

                var arr = [];
                for (var i = 0; i < items.length; i++) {
                    var data = items[i];
                    arr.push(
                        <tr key={i}>
                            <td>{i+1}</td>
                            <td>{data.name}</td>
                            <td>{data.contributiveFund}</td>
                            <td>
                                {
                                    data.contributivePercent
                                    ?
                                    data.contributivePercent+"%"
                                    :
                                    null
                                }
                            </td>
                            <td>{data.currency}</td>
                            <td>{this.dateFormat(data.contributiveDate)}</td>
                        </tr>
                    )
                }
                return (
                    <table width="100%" className="report-table-sp">
                        <colgroup>
                            <col width="10%" />
                            <col/>
                            <col/>
                            <col/>
                            <col/>
                            <col/>
                        </colgroup>
                        <thead>
                            <tr>
                                <th>序号</th>
                                <th>股东名称</th>
                                <th>认缴出资额（单位：万元）</th>
                                <th>出资比例(%)</th>
                                <th>币种</th>
                                <th>出资日期</th>
                            </tr>
                        </thead>
                        <tbody>
                            {arr}
                        </tbody>
                    </table>
                );
            }
        }
    }

    //企业高管信息
    get corpTopManagerInfo() {
        const {disabled} = this.props;
        if (disabled) {
            return (

                    <table width="100%" className="report-table-sp">
                        <colgroup>
                            <col width="10%" />
                            <col/>
                            <col/>
                        </colgroup>
                        <thead>
                            <tr>
                                <th>序号</th>
                                <th>姓名</th>
                                <th>职务</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td></td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>


            )
        } else {
            const {corpTopManagerInfo} = this.props.dataSource.map.cisReport;
            const {code, item, message} = corpTopManagerInfo;
            if (code != 200) {
                return (
                    <div>
                        <h3>{message
                                ? message
                                : `code:${code}`}</h3>
                    </div>
                );
            }
            if (corpTopManagerInfo && !disabled) {
                //判断对象或者数组
                const items = helper.templateToArray(item);

                var arr = [];
                for (var i = 0; i < items.length; i++) {
                    var data = items[i];
                    arr.push(
                        <tr key={i}>
                            <td>{i+1}</td>
                            <td>{data.name}</td>
                            <td>{data.positionCaption}</td>
                        </tr>
                    )
                }
                return (
                    <table width="100%" className="report-table-sp">
                        <colgroup>
                            <col width="10%" />
                            <col />
                            <col />
                        </colgroup>
                        <thead>
                            <tr>
                                <th>序号</th>
                                <th>姓名</th>
                                <th>职务</th>
                            </tr>
                        </thead>
                        <tbody>
                            {arr}
                        </tbody>
                    </table>
                );
            }

        }
    }

    //企业对外投资信息
    get nationalCorpOtherShareholderInfo() {
        const {disabled} = this.props;
        if (disabled) {
            return (
                <div className="report-table fn-mb-20">
                    <table width="100%" className="report-table-sp">
                        <colgroup>
                            <col width="25%"/>
                            <col width="25%"/>
                            <col width="25%"/>
                            <col/>
                        </colgroup>
                        <thead></thead>
                        <tbody>
                            <tr>
                                <th>被投资机构名称</th>
                                <td colSpan={3}></td>
                            </tr>
                            <tr>
                                <th>工商注册号</th>
                                <td></td>
                                <th>企业类型</th>
                                <td></td>
                            </tr>
                            <tr>
                                <th>注册资金（单位：万元）</th>
                                <td></td>
                                <th>机构状态</th>
                                <td></td>
                            </tr>
                            <tr>
                                <th>认缴出资额（单位：万元）</th>
                                <td></td>
                                <th>出资比例</th>
                                <td></td>
                            </tr>
                            <tr>
                                <th>币种</th>
                                <td></td>
                                <th>工商登记机关</th>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                    <table width="100%" className="report-table-sp">
                        <colgroup>
                            <col width="25%"/>
                            <col width="25%"/>
                            <col width="25%"/>
                            <col/>
                        </colgroup>
                        <thead></thead>
                        <tbody>
                            <tr>
                                <th>被投资机构名称</th>
                                <td colSpan={3}></td>
                            </tr>
                            <tr>
                                <th>工商注册号</th>
                                <td></td>
                                <th>企业类型</th>
                                <td></td>
                            </tr>
                            <tr>
                                <th>注册资金（单位：万元）</th>
                                <td></td>
                                <th>机构状态</th>
                                <td></td>
                            </tr>
                            <tr>
                                <th>认缴出资额（单位：万元）</th>
                                <td></td>
                                <th>出资比例</th>
                                <td></td>
                            </tr>
                            <tr>
                                <th>币种</th>
                                <td></td>
                                <th>工商登记机关</th>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>

                </div>
            )
        } else {
            const {nationalCorpOtherShareholderInfo} = this.props.dataSource.map.cisReport;
            const {code, item, message} = nationalCorpOtherShareholderInfo;
            if (code != 200) {
                return (
                    <div>
                        <h3>{message
                                ? message
                                : `code:${code}`}</h3>
                    </div>
                );
            }
            if (item && !disabled) {
                //判断对象或者数组
                const items = helper.templateToArray(item);

                var arr = [];
                for (var i = 0; i < items.length; i++) {
                    var data = items[i];
                    arr.push(
                        <table key={i} width="100%" className="report-table-sp">
                            <colgroup>
                                <col width="25%"/>
                                <col width="25%"/>
                                <col width="25%"/>
                                <col/>
                            </colgroup>
                            <thead></thead>
                            <tbody>
                                <tr>
                                    <th>被投资机构名称</th>
                                    <td colSpan={3}>{data.corpName}</td>
                                </tr>
                                <tr>
                                    <th>工商注册号</th>
                                    <td>{data.registNo}</td>
                                    <th>企业类型</th>
                                    <td>{data.corpTypeCaption}</td>
                                </tr>
                                <tr>
                                    <th>注册资金（单位：万元）</th>
                                    <td>{data.registFund}</td>
                                    <th>机构状态</th>
                                    <td>{data.statusCaption}</td>
                                </tr>
                                <tr>
                                    <th>认缴出资额（单位：万元）</th>
                                    <td>{data.contributiveFund}</td>
                                    <th>出资比例</th>
                                    <td>
                                        {
                                            data.contributivePercent
                                            ?
                                            data.contributivePercent+"%"
                                            :
                                            null
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <th>币种</th>
                                    <td>{data.currency}</td>
                                    <th>工商登记机关</th>
                                    <td>{data.registerDepartment}</td>
                                </tr>
                            </tbody>
                        </table>
                    )
                }
                return (
                    <div className="fn-mb-20">
                        {arr}
                    </div>
                );
            }
        }
    }

    //法定代表人对外投资信息
    get nationalFrOtherCorpShareholderInfo() {
        const {disabled} = this.props;
        if (disabled) {
            return (
                <div className="fn-mb-20">
                    <table width="100%" className="report-table-sp">
                        <colgroup>
                            <col width="25%"/>
                            <col width="25%"/>
                            <col width="25%"/>
                            <col/>
                        </colgroup>
                        <thead></thead>
                        <tbody>
                            <tr>
                                <th>被投资机构名称</th>
                                <td colSpan={3}></td>
                            </tr>
                            <tr>
                                <th>工商注册号</th>
                                <td></td>
                                <th>企业类型</th>
                                <td></td>
                            </tr>
                            <tr>
                                <th>注册资金（单位：万元）</th>
                                <td></td>
                                <th>机构状态</th>
                                <td></td>
                            </tr>
                            <tr>
                                <th>认缴出资额（单位：万元）</th>
                                <td></td>
                                <th>出资比例</th>
                                <td></td>
                            </tr>
                            <tr>
                                <th>币种</th>
                                <td></td>
                                <th>工商登记机关</th>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )
        } else {
            const {nationalFrOtherCorpShareholderInfo} = this.props.dataSource.map.cisReport;
            const {code, item, message} = nationalFrOtherCorpShareholderInfo;
            if (code != 200) {
                return (
                    <div>
                        <h3>{message
                                ? message
                                : `code:${code}`}</h3>
                    </div>
                );
            }
            if (item && !disabled) {
                //判断对象或者数组
                const items = helper.templateToArray(item);

                var arr = [];
                for (var i = 0; i < items.length; i++) {
                    var data = items[i];
                    arr.push(
                        <table key={i} width="100%" className="report-table-sp">
                            <colgroup>
                                <col width="25%"/>
                                <col width="25%"/>
                                <col width="25%"/>
                                <col/>
                            </colgroup>
                            <thead></thead>
                            <tbody>
                                <tr>
                                    <th>被投资机构名称</th>
                                    <td colSpan={3}>{data.corpName}</td>
                                </tr>
                                <tr>
                                    <th>工商注册号</th>
                                    <td>{data.registNo}</td>
                                    <th>企业类型</th>
                                    <td>{data.corpTypeCaption}</td>
                                </tr>
                                <tr>
                                    <th>注册资金（单位：万元）</th>
                                    <td>{data.registFund}</td>
                                    <th>机构状态</th>
                                    <td>{data.statusCaption}</td>
                                </tr>
                                <tr>
                                    <th>认缴出资额（单位：万元）</th>
                                    <td>{data.contributiveFund }</td>
                                    <th>出资比例</th>
                                    <td>
                                        {
                                            data.contributivePercent
                                            ?
                                            data.contributivePercent+"%"
                                            :
                                            null
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <th>币种</th>
                                    <td>{data.currency}</td>
                                    <th>工商登记机关</th>
                                    <td>{data.registerDepartment}</td>
                                </tr>
                            </tbody>
                        </table>
                    )
                }
                return (
                    <div className="fn-mb-20">
                        {arr}
                    </div>
                );
            }
        }
    }

    //企业工商变更信息
    get saicAlterInfo() {
        const {disabled} = this.props;
        if (disabled) {
            return (
                    <table width="100%" className="report-table-sp">
                        <colgroup>
                            <col width="10%" />
                            <col width="10%" />
                            <col width="10%" />
                            <col width="35%" />
                            <col width="35%" />
                        </colgroup>
                        <thead></thead>
                        <tbody>
                            <tr>
                                <th>序号</th>
                                <th>变更事项</th>
                                <th>变更日期</th>
                                <th>变更前内容</th>
                                <th>变更后内容</th>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
            )
        } else {
            const {saicAlterInfo} = this.props.dataSource.map.cisReport.saicAlertAndCaseInfo;
            const {code, item, message} = saicAlterInfo;
            if (code != 200) {
                return (
                    <div>
                        <h3>{message
                                ? message
                                : `code:${code}`}</h3>
                    </div>
                );
            }
            if (item && !disabled) {
                //判断对象或者数组
                const items = helper.templateToArray(item);

                var arr = [];
                for (var i = 0; i < items.length; i++) {
                    var data = items[i];
                    arr.push(
                        <tr key={i}>
                            <td>{i+1}</td>
                            <td>{data.altitem}</td>
                            <td>{this.dateFormat(data.altDate)}</td>
                            <td>{data.altBe}</td>
                            <td>{data.altAf}</td>
                        </tr>
                    )
                }
                return (
                    <table width="100%" className="report-table-sp">
                        <colgroup>
                            <col width="10%" />
                            <col width="10%" />
                            <col width="10%" />
                            <col width="35%" />
                            <col width="35%" />
                        </colgroup>
                        <thead>
                            <tr>
                                <th>序号</th>
                                <th>变更事项</th>
                                <th>变更日期</th>
                                <th>变更前内容</th>
                                <th>变更后内容</th>
                            </tr>
                        </thead>
                        <tbody>
                            {arr}
                        </tbody>
                    </table>
                );
            }
        }
    }

    //企业工商处罚信息
    get saicCaseInfo() {
        const {disabled} = this.props;
        if (disabled) {
            return (
                <div className="report-table fn-mb-20">
                    <table width="100%" className="report-table-sp">
                        <colgroup>
                            <col width="25%"/>
                            <col width="25%"/>
                            <col width="25%"/>
                            <col/>
                        </colgroup>
                        <thead></thead>
                        <tbody>
                            <tr>
                                <th>案件类型名称</th>
                                <td colSpan={3}></td>
                            </tr>
                            <tr>
                                <th>案发时间</th>
                                <td></td>
                                <th>处罚决定书签发日期</th>
                                <td></td>
                            </tr>
                            <tr>
                                <th>处罚种类</th>
                                <td></td>
                                <th>处罚机关</th>
                                <td></td>
                            </tr>
                            <tr>
                                <th>执行类型</th>
                                <td></td>
                                <th>处罚金额（单位：万元）</th>
                                <td></td>
                            </tr>
                            <tr>
                                <th>处罚结果</th>
                                <td></td>
                                <th>案件结果</th>
                                <td></td>
                            </tr>
                            <tr>
                                <th>案由</th>
                                <td colSpan={3}></td>
                            </tr>
                            <tr>
                                <th>主要违法事实</th>
                                <td colSpan={3}></td>
                            </tr>
                            <tr>
                                <th>处罚依据</th>
                                <td colSpan={3}></td>
                            </tr>
                            <tr>
                                <th>处罚执行情况</th>
                                <td colSpan={3}></td>
                            </tr>
                        </tbody>
                    </table>

                    <table width="100%" className="report-table-sp">
                        <colgroup>
                            <col width="25%"/>
                            <col width="25%"/>
                            <col width="25%"/>
                            <col/>
                        </colgroup>
                        <thead></thead>
                        <tbody>
                            <tr>
                                <th>案件类型名称</th>
                                <td colSpan={3}></td>
                            </tr>
                            <tr>
                                <th>案发时间</th>
                                <td></td>
                                <th>处罚决定书签发日期</th>
                                <td></td>
                            </tr>
                            <tr>
                                <th>处罚种类</th>
                                <td></td>
                                <th>处罚机关</th>
                                <td></td>
                            </tr>
                            <tr>
                                <th>执行类型</th>
                                <td></td>
                                <th>处罚金额（单位：万元）</th>
                                <td></td>
                            </tr>
                            <tr>
                                <th>处罚结果</th>
                                <td></td>
                                <th>案件结果</th>
                                <td></td>
                            </tr>
                            <tr>
                                <th>案由</th>
                                <td colSpan={3}></td>
                            </tr>
                            <tr>
                                <th>主要违法事实</th>
                                <td colSpan={3}></td>
                            </tr>
                            <tr>
                                <th>处罚依据</th>
                                <td colSpan={3}></td>
                            </tr>
                            <tr>
                                <th>处罚执行情况</th>
                                <td colSpan={3}></td>
                            </tr>
                        </tbody>
                    </table>

                </div>
            )
        } else {
            const {saicCaseInfo} = this.props.dataSource.map.cisReport.saicAlertAndCaseInfo;
            const {code, item, message} = saicCaseInfo;
            if (code != 200) {
                return (
                    <div>
                        <h3>{message
                                ? message
                                : `code:${code}`}</h3>
                    </div>
                );
            }
            if (item && !disabled) {
                //判断对象或者数组
                const items = helper.templateToArray(item);

                var arr = [];
                for (var i = 0; i < items.length; i++) {
                    var data = items[i];
                    arr.push(
                        <table key={i} width="100%" className="report-table-sp">
                            <colgroup>
                                <col width="25%"/>
                                <col width="25%"/>
                                <col width="25%"/>
                                <col/>
                            </colgroup>
                            <thead></thead>
                            <tbody>
                                <tr>
                                    <th>案件类型名称</th>
                                    <td colSpan={3}>{data.caseTypeCaption}</td>
                                </tr>
                                <tr>
                                    <th>案发时间</th>
                                    <td>{this.dateFormat(data.caseTime)}</td>
                                    <th>处罚决定书签发日期</th>
                                    <td>{this.dateFormat(data.penDecissDate)}</td>
                                </tr>
                                <tr>
                                    <th>处罚种类</th>
                                    <td>{data.penTypeCaption}</td>
                                    <th>处罚机关</th>
                                    <td>{data.penAuth}</td>
                                </tr>
                                <tr>
                                    <th>执行类型</th>
                                    <td>{data.exesortCaption}</td>
                                    <th>处罚金额（单位：万元）</th>
                                    <td>{data.penAm}</td>
                                </tr>
                                <tr>
                                    <th>处罚结果</th>
                                    <td>{data.penResultCaption}</td>
                                    <th>案件结果</th>
                                    <td>{data.caseResultCaption}</td>
                                </tr>
                                <tr>
                                    <th>案由</th>
                                    <td colSpan={3}>{data.caseReason}</td>
                                </tr>
                                <tr>
                                    <th>主要违法事实</th>
                                    <td colSpan={3}>{data.illegFact}</td>
                                </tr>
                                <tr>
                                    <th>处罚依据</th>
                                    <td colSpan={3}>{data.penBasis}</td>
                                </tr>
                                <tr>
                                    <th>处罚执行情况</th>
                                    <td colSpan={3}>{data.penExest}</td>
                                </tr>
                            </tbody>
                        </table>
                    )
                }
                return (
                    <div className="fn-mb-20">
                        {arr}
                    </div>
                );
            }
        }
    }

}
