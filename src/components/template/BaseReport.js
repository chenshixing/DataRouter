/**
 * Created by Ethan on 2017/1/24.
 * 11:55
 * 模版基类
 */
import React, {Component} from 'react';
import moment from 'moment';
import './style.less';
export class BaseReport extends Component {
    static defaultProps = {
        disabled: null,//是否模板
        dataSource: {}
    }

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div className="fn-pa-10">
                模版基类
                {/*更新时间*/}
                {this.update}
            </div>
        )
    }

    get css() {
        const {disabled} = this.props;
        return {
            table: {
                width: '100%'
            },
            center: {
                textAlign: 'center',
                margin: '10px 0'
            },
            color: {
                color: disabled ? '#ffffff' : '#999999'
            }
        }
    }

    get update() {
        const {disabled} = this.props;
        const {maxUpdateCircle, minUpdateCircle} = this.props.dataSource;
        if(disabled) return;
        if(typeof(maxUpdateCircle) != "undefined" && typeof(minUpdateCircle) != "undefined") {
            if(maxUpdateCircle == minUpdateCircle) {
                return (  //相同
                    <div className="fn-mt-20">
                        {`以上数据更新周期为${maxUpdateCircle}个自然日。`}
                    </div>
                )
            } else {   //不同
                return (
                    <div className="fn-mt-20">
                        {`以上数据更新周期为${minUpdateCircle}-${maxUpdateCircle}个自然日。`}
                    </div>
                )
            }
        }
    }


    /**
     * 模板转换日期格式
     * @return YYYY年MM月DD日
     * @param str 日期格式字符串
     */
    dateFormat(str,formatStr='LL'){
        if(str == '' || str == null) return '';
        moment.locale("zh-cn");
        return moment(str,'YYYY-MM-DD').format(formatStr);
    }

    /**
     * 返回美元符号 ￥xxx
     * @return ￥xxx
     */
    displayDollar(str){
        if(!str) return ''
        if(str == '' || str == null) return '';
        return `￥${str}`;
    }


    /**
     * 判断是否为空，如为空返回空值，有值按格式返回
     * @return xxx%
     */
    displayPercent(str){
        if(!str) return ''
        if(str == '' || str == null) return '';
        return str + '%';
    }

    /**
     * 判断是否为空，如为空返回空值，有值按格式返回
     * @return 前xxx%
     */
    displayRankingPercent(str){
        if(!str) return ''
        if(str == '' || str == null) return '';
        return `前${str}%`;
    }
    
}