/**
 * Created by Ethan on 2017/2/14.
 * 9:55
 * 百融评分
 */

import {BaseReport} from "./BaseReport";
import React from "react";
import {Row, Col, Popover, Tooltip, Icon} from "antd";
import "./style.less";
export class BrMark extends BaseReport {
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
                    <span style={this.css.color}>百融评分</span>
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
                        <Col span={4}></Col>
                        <Col span={8}></Col>
                    </Row>
                </div>
                {this.score}
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

    get score() {
        const {disabled} = this.props;
        if(disabled) {
            return (
                <div className=" fn-mt-10">
                    <table width="100%" className="report-table-sp">
                        <colgroup>
                            <col width="17%"/>
                        </colgroup>
                        <tbody>
                        <tr>
                            <th>非银消费贷线下评分
                                <Popover placement="topRight" content={<span>适用于消费金融的线下消费贷业务客群评分</span>} trigger="hover">
                                    <Icon type="exclamation-circle-o"/>
                                </Popover>
                            </th>
                            <td></td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            )
        } else {
            const {code, bairongScore, message} = this.props.dataSource;
            if(code && code != 200) {
                return (
                    <div>
                        <h3>{message ? message : `code:${code}`}</h3>
                    </div>);
            }
            if(bairongScore && !disabled) {
                return (
                    <div className=" fn-mt-10">
                        <table width="100%" className="report-table-sp">
                            <colgroup>
                                <col width="17%"/>
                            </colgroup>
                            <tbody>
                            <tr>
                                <th>非银消费贷线下评分
                                    <Popover placement="topRight" content={<span>适用于消费金融的线下消费贷业务客群评分</span>} trigger="hover">
                                        <Icon type="exclamation-circle-o"/>
                                    </Popover>
                                </th>
                                <td>{bairongScore.scoreconsoffv2}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                )
            }
        }
    }
}
