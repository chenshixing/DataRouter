//不要乱改,否则枪毙 数据查询 需要查询的产品
export default {
    SEARCHSELECT_ID_MAP: {
        //个人类型
        PERSONAL: {
            '个人风险信息查询': 'QT010001', //1.0.0
            '个人信贷多次申请核查': 'QT020002', //1.0.0
            '消费及月度收支等级评估': 'QT010003', //1.0.0
            '稳定性评估': 'QT010004',   //1.0.0
            '百融评分': 'QT010006',  //1.0.2
            '特殊名单核查': 'QT020005',  //1.0.2
            '支付消费评估': 'QT010007', //1.0.2
            '航旅国内旅客价值等级评估': 'QT010008',  //1.0.2
            '企业信用查询': 'QT030009',  //1.0.2
            '商户经营分析': 'QT030010'  //1.0.2
        },
        //企业类型 //已废除
        COMPANY: {
            '企业风险信息查询': '1'
        }
    },
    //权限对应编码，不能修改，否则白天鹅见
    AUTH_MAP: {
        "数据源管理": "data_source",
        "内部产品管理": "inner_product",
        "查询记录": "search_record",
        "子账号管理": "sub_account",
        "系统管理": "system",
        "数据机构管理": "data_org",
        "源产品管理": "source_product",
        "源产品更新周期配置": "source_product_update_period",
        "百融金服产品": "bairong_product",
        "鹏元征信产品": "pengyuan_product",
        "内部产品类型管理": "inner_product_category",
        "内部产品模板管理": "inner_product_template",
        "数据源查询记录": "source_search_record",
        "内部产品查询记录": "inner_search_record",
        "用户查询记录": "user_search_record",
        "员工账号": "user_account",
        "角色权限": "role_permission",
        "账号信息": "account_info",
        "修改密码": "modify_password",
    },
    //后台接口约定ID
    INSTITUTIONS_TYPE_MAP:{
        "源产品管理":'10',
        "源产品更新周期配置":'11',
        "数据源查询记录":'16',
    },
    //查询原因
    QUERY_REASON_MAP:{
        101:"贷款审批",
        102:"贷款贷后管理",
        103:"贷款催收",
        104:"审核担保人信用",
        105:"担保/融资审批",
        999:"其他",
    }
}
