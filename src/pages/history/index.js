import React, {Component} from 'react';
import {Router, History,Link} from 'react-router';
import {Row, Col, Menu, Icon, Breadcrumb} from 'antd';
import  {RouterContext}  from 'react-router'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {actionSource} from 'ACTION';
import moment from 'moment';
import MAP from 'STATIC';
import Auth from 'COM/authorization';
const SubMenu = Menu.SubMenu;
class HistoryQuery extends Component {
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };

    static defaultProps = {
        itemRender: (route, params, routes, paths) => {
            const last = routes.indexOf(route) === routes.length - 1;
            return last ? <span>{route.breadcrumbName}</span> :
                <Link to={paths.join('/')}>{route.breadcrumbName}</Link>;
        }
    };

    constructor(props) {
        super(props);
        this.state={};
    }

    componentDidMount() {
        //数据源查询记录 16
        this.props.action.fetchShuyouInstitutionsAll(MAP.INSTITUTIONS_TYPE_MAP["数据源查询记录"]);
        //点击查询记录的时候做下优化。
        const institutionsHistoryData = this.props.institutionsHistoryData || [];
        let historyData = (institutionsHistoryData.length > 0) && (this.props.location.pathname == "history/data");
        if(historyData) {
            let institutionsHistoryDataId = institutionsHistoryData[0].id;
            this.context.router.push(`/history/data/home/${institutionsHistoryDataId}`);
            //console.log("哥哥，你执行了嘛--1")
        }
    }
    componentDidUpdate(){
        const institutionsHistoryData = this.props.institutionsHistoryData || [];
        let historyData = (institutionsHistoryData.length > 0) && (this.props.location.pathname == "history/data");
        if(historyData) {
            let institutionsHistoryDataId = institutionsHistoryData[0].id;
            this.context.router.push(`/history/data/home/${institutionsHistoryDataId}`);
            // console.log("哥哥，你执行了嘛--2");
            // console.log("componentDidUpdate",institutionsHistoryData);
            // console.log(this)
        }

    }
    // componentWillUnmount(){
    //     console.log("componentWillUnmount");
    // }


    handleClick(e) {
        let url = e.keyPath[1] ? "/history/" + e.keyPath[1] + "/" + e.key : "/history/" + e.key;
        this.context.router.push(url);
    }

    render() {
        const institutionsHistoryData = this.props.institutionsHistoryData || [];
        var pathnameArr=this.props.location.pathname.split('/');
        var currentKey=`${pathnameArr[pathnameArr.length-2]}/${pathnameArr[pathnameArr.length-1]}`;
        var currentKey = ""
        if(this.props.location.pathname.indexOf('data') >= 0){
            if(this.props.location.pathname.indexOf('home') >= 0){
                currentKey = 'home/'+this.props.params.id;
            }else{
                currentKey = 'home/'+this.props.location.query.paramsid;
            }
        }else if(this.props.location.pathname.indexOf('internal') >= 0){
            currentKey = 'internal/home';
        }else if(this.props.location.pathname.indexOf('user') >= 0){
            currentKey = 'user/home';
        }
        return (
            <div className="fn-pa-10">
                <div className="panel">
                    <Row>
                        <Col xs={5} sm={5} md={5} lg={4}>
                            <Menu
                                onClick={this.handleClick.bind(this)}
                                selectedKeys={[currentKey]}
                                defaultOpenKeys={['data']}
                                mode="inline">
                                {Auth.js(MAP.AUTH_MAP['数据源查询记录']) ?
                                    <SubMenu key="data" title={<span>数据源查询记录</span>}>
                                        {
                                            institutionsHistoryData.map((item, index) => {
                                                return <Menu.Item
                                                    key={"home/" + item.id}>{item.proInfraName}</Menu.Item>
                                            })
                                        }
                                    </SubMenu> : null}
                                {Auth.js(MAP.AUTH_MAP['内部产品查询记录']) ?
                                    <Menu.Item key="internal/home">内部产品查询记录</Menu.Item> : null}
                                {Auth.js(MAP.AUTH_MAP['用户查询记录']) ?
                                    <Menu.Item key="user/home">用户查询记录</Menu.Item> : null}
                            </Menu>
                        </Col>
                        <Col xs={19} sm={19} md={19} lg={20}>
                            <div style={{padding: "0 0 0 20px"}}>
                                <div style={{margin: "0 0 20px 0"}}>
                                    {/*Breadcrumb*/}
                                    <Breadcrumb {...this.props} />
                                </div>
                                {/* 主内容区 */}
                                {this.props.children}
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}
function mapStateToProps(state, props) {
    return {
        institutionsHistoryData: state.sourceReducer.institutionsHistoryData
    }
}
function mapDispatchToProps(dispatch) {
    return {
        action: bindActionCreators(actionSource, dispatch)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(HistoryQuery);
