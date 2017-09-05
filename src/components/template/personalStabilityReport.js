/**
 * Created by Ethan on 2016/12/6.
 * 个人稳定性评估报告 模版
 *
 */
import {BaseReport} from './BaseReport';
import React, {Component} from 'react';
import {Row, Col, Collapse} from 'antd';
import './style.less';
const Panel = Collapse.Panel;
export class PersonalStability extends BaseReport {
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
                    <span style={this.css.color}>稳定性评估</span>
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
                        <Col span={4}>邮箱</Col>
                        <Col span={8}>{this.base.email}</Col>
                    </Row>
                    <Row>
                        <Col span={4}>家庭座机号</Col>
                        <Col span={8}>{this.base.homePhone}</Col>
                        <Col span={4}>公司座机号</Col>
                        <Col span={8}>{this.base.companyPhone}</Col>
                    </Row>
                </div>
                {/*模块A*/}
                {this.stability}
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

    get stability() {
        const {disabled} = this.props;
        if(disabled) {
            return (
                <div className="report-table fn-mb-20">
                    <Row>
                        <Col span={5}>匹配身份证</Col>
                        <Col span={7}></Col>
                        <Col span={5}>匹配手机号</Col>
                        <Col span={7}></Col>
                    </Row>
                    <Row>
                        <Col span={5}>匹配电子邮箱</Col>
                        <Col span={7}></Col>
                        <Col span={5}>身份证号和手机号码是否有关联</Col>
                        <Col span={7}></Col>
                    </Row>
                    <Row>
                        <Col span={5}>身份证号和邮箱是否有关联</Col>
                        <Col span={7}></Col>
                        <Col span={5}>手机号码和邮箱是否有关联</Col>
                        <Col span={7}></Col>
                    </Row>
                    <Row>
                        <Col span={5}>匹配家庭座机</Col>
                        <Col span={7}></Col>
                        <Col span={5}>匹配公司座机</Col>
                        <Col span={7}></Col>
                    </Row>
                    <Row>
                        <Col span={5}>匹配姓名</Col>
                        <Col span={7}></Col>
                        <Col span={5}>输出身份证姓名一致检验</Col>
                        <Col span={7}></Col>
                    </Row>
                    <Row>
                        <Col span={5}>关联身份证个数</Col>
                        <Col span={7}></Col>
                        <Col span={5}>关联手机号最早使用时间</Col>
                        <Col span={7}></Col>
                    </Row>
                    <Row>
                        <Col span={5}>关联手机号个数</Col>
                        <Col span={7}></Col>
                        <Col span={5}>关联电子邮箱数</Col>
                        <Col span={7}></Col>
                    </Row>
                    <Row>
                        <Col span={5}>关联姓名数</Col>
                        <Col span={7}></Col>
                        <Col span={5}>关联座机数</Col>
                        <Col span={7}></Col>
                    </Row>
                    <Row>
                        <Col span={5}>关联地址数</Col>
                        <Col span={7}></Col>
                        <Col span={5}></Col>
                        <Col span={7}></Col>
                    </Row>
                </div>
            )
        } else {
            const {code, stability, message} = this.props.dataSource;
            if(code != 200) {
                return (
                    <div>
                        <h3>{message ? message : `code:${code}`}</h3>
                    </div>);
            }
            if(stability && !disabled) {
                return (
                    <div className="report-table fn-mb-20">
                        <Row>
                            <Col span={5}>匹配身份证</Col>
                            <Col span={7}>{stability.stabAuthId}</Col>
                            <Col span={5}>匹配手机号</Col>
                            <Col span={7}>{stability.stabAuthCell}</Col>
                        </Row>
                        <Row>
                            <Col span={5}>匹配电子邮箱</Col>
                            <Col span={7}>{stability.stabAuthMail}</Col>
                            <Col span={5}>身份证号和手机号码是否有关联</Col>
                            <Col span={7}>{stability.stabAuthIdAndCell}</Col>
                        </Row>
                        <Row>
                            <Col span={5}>身份证号和邮箱是否有关联</Col>
                            <Col span={7}>{stability.stabAuthIdAndMail}</Col>
                            <Col span={5}>手机号码和邮箱是否有关联</Col>
                            <Col span={7}>{stability.stabAuthCellAndMail}</Col>
                        </Row>
                        <Row>
                            <Col span={5}>匹配家庭座机</Col>
                            <Col span={7}>{stability.stabAuthHomeTel}</Col>
                            <Col span={5}>匹配公司座机</Col>
                            <Col span={7}>{stability.stabAuthBizTel}</Col>
                        </Row>
                        <Row>
                            <Col span={5}>匹配姓名</Col>
                            <Col span={7}>{stability.stabAuthName}</Col>
                            <Col span={5}>输出身份证姓名一致检验</Col>
                            <Col span={7}>{stability.stabAuthIdName}</Col>
                        </Row>
                        <Row>
                            <Col span={5}>关联身份证个数</Col>
                            <Col span={7}>{stability.stabIdNum}</Col>
                            <Col span={5}>关联手机号最早使用时间</Col>
                            <Col span={7}>{stability.stabCellFirsttime}</Col>
                        </Row>
                        <Row>
                            <Col span={5}>关联手机号个数</Col>
                            <Col span={7}>{stability.stabCellNum}</Col>
                            <Col span={5}>关联电子邮箱数</Col>
                            <Col span={7}>{stability.stabMailNum}</Col>
                        </Row>
                        <Row>
                            <Col span={5}>关联姓名数</Col>
                            <Col span={7}>{stability.stabNameNum}</Col>
                            <Col span={5}>关联座机数</Col>
                            <Col span={7}>{stability.stabTelNum}</Col>
                        </Row>
                        <Row>
                            <Col span={5}>关联地址数</Col>
                            <Col span={7}>{stability.stabAddrNum}</Col>
                            <Col span={5}></Col>
                            <Col span={7}></Col>
                        </Row>
                    </div>
                )
            }
        }
    }
}
