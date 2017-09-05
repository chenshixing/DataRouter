/**
 * Created by Ethan on 2016/12/6.
 * 
 *
 */
import {BaseReport} from './BaseReport';
import React, {Component} from 'react';
import {Row, Col, Collapse} from 'antd';
import './style.less';
const Panel = Collapse.Panel;
export class AirTravelGrade extends BaseReport {
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
                    <span style={this.css.color}>航旅国内旅客价值等级评估</span>
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
                {/*模块A*/}
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
                id: base.id || '',
                homePhone: base.homeCell || '',
                companyPhone: base.companyCell || '',
                email: base.email || ''
            }
        }
        return {
            name: '',
            phone: '',
            id: '',
            homePhone: '',
            companyPhone: '',
            email: ''
        }
    }

    get score() {
        const {disabled} = this.props;
        if(disabled) {
            return (
                <div className="report-table fn-mb-20">
                    <Row>
                        <Col span={4}>国内航旅行为消费等级评分</Col>
                        <Col span={20}></Col>
                    </Row>
                </div>
            )
        } else {
            const {code, score, message} = this.props.dataSource;
            if(code != 200) {
                return (
                    <div>
                        <h3>{message ? message : `code:${code}`}</h3>
                    </div>);
            }
            if(score && !disabled) {
                return (
                    <div className="report-table fn-mb-20">
                        <Row>
                            <Col span={4}>国内航旅行为消费等级评分</Col>
                            <Col span={20}>{score}</Col>
                        </Row>
                    </div>
                )
            }
        }
    }
}
