/**
 * 常用工具类
 * wuyongquan
 */
import MAP from "STATIC";
import React from 'react';
let helper = {
    //隐藏中间部分的手机号码
    hidenPhoneNumber(phoneNumber) {
        //手机号码隐藏处理
        const reg = new RegExp("(\\d{3})(\\d{5})(\\d{3})");
        return phoneNumber.replace(reg, "$1*****$3");
    },
    /**
     * 平衡关系转成树型关系
     * @return
     * @param arr 对象
     * @param clrParChk 清除父节点选中状态
     *  "checkStatus": true/false,
     *  "id": 10,
     *  "name": "风险预警查询",
     *  "pid": 9
     */
    formatListForTree(arr, clrParChk = false) {
        if (!arr)
            return;
        var newArray = [];
        var selectedKeys = [];
        var expandedKeys = [];
        var oldArray = arr;
        //formatToTree
        for (var i = 0; i < oldArray.length; i++) {
            var objA = oldArray[i];
            for (var j = 0; j < oldArray.length; j++) {
                var objB = oldArray[j];
                if (objA === objB)
                    continue; //相同退出遍历
                if (objA.id == objB.pid) {
                    if (!objA.children) {
                        objA.children = []
                    }
                    objA.children.push(objB);
                }
            }
        }
        for (var i = 0; i < oldArray.length; i++) {
            var item = oldArray[i];
            if (item.pid == '0') {
                newArray.push(item);
            }
        }
        // find expandedKeys
        const loop = data => {
            for (var i = 0; i < data.length; i++) {
                if (data[i].children) {
                    expandedKeys.push(`${data[i].id}`);
                    loop(data[i].children);
                }
            }
        }
        loop(newArray);
        //find selectedKeys
        for (var i = 0; i < oldArray.length; i++) {
            if (oldArray[i].checkStatus) {
                const isClrParChk = oldArray[i].children && oldArray[i].children.length > 0 && clrParChk;
                if (isClrParChk)
                    continue;
                selectedKeys.push(`${oldArray[i].id}`);
            }
        }
        //console.log(newArray)
        return {data: newArray, selectedKeys, expandedKeys};
        // return newArray;
    },
    //定位元素的错误并提示错误信息
    /**
     * form  :this.props.form
     * data: {filedName1:message1,filedName2:message2}
     */
    focusError(form, data) {
        var errorObj = {};
        for (var key in data) {
            errorObj[key] = {
                "errors": [new Error(data[key])],
                "value": form.getFieldValue(key)
            }
        }
        form.setFields(errorObj);
    },
    /*
     * 为list加上displayId
     * */
    addDisplayId(list, pageNum, pageSize) {
        return list.map((item, index) => {
            var displayId = (pageNum - 1) * pageSize + index + 1;
            return item.displayId = displayId;
        });
    },
    //模板转换数组,对象的时候变成数组，字符串或者没数组的时候，变成空数组。
    templateToArray(value) {
        if (value instanceof Array)
            return value;
        if (value instanceof Object)
            return [value];
        return [];
    },
    //查询记录-查询对象
    templateQueryObject(resord) {
        /**
         *  百融 ["QT01","QT02"]
         *  queryObjectId 身份证ID
         *  queryObjectName 个人名字
         *
         *  鹏元 ["QT03"]
         *  queryCorpName 企业名字
         *  queryOrgCode 组织机构代码/社会信用代码
         *  queryRegisterNo 工商注册号
         */
        let queryObject = JSON.parse(resord.queryObject) || {},
            //百融
            queryObjectId = null,
            queryObjectName = null,
            //鹏元
            queryCorpName = null,
            queryOrgCode = null,
            queryRegisterNo = null,
            //返回值
            queryResult = null;

        if( resord.queryCode.indexOf("QT03")!=-1 ){
            queryCorpName = queryObject.corpName?queryObject.corpName:"";
            queryOrgCode = queryObject.orgCode?"组织机构代码/社会信用代码："+queryObject.orgCode:"";
            queryRegisterNo = queryObject.registerNo?"工商注册号："+queryObject.registerNo:"";
            queryResult = queryCorpName+queryOrgCode+queryRegisterNo || "没有数据";
            return (
                queryResult
            )
        }else if( resord.queryCode.indexOf("QT01")!=-1 || resord.queryCode.indexOf("QT02")!=-1 ){
            queryObjectName = queryObject.name?queryObject.name:"";
            queryObjectId = queryObject.id?queryObject.id.replace(/^(.{6}).*(.{2})$/,"（$1**********$2）"):"没有数据";
            queryResult = queryObjectName+queryObjectId
            return (
                queryResult
            )
        }
        return "没有数据"

        //return React.createElement("div");

    }
}
export default helper;
