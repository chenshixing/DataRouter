// create by wuyq 12/5
/*
 *封装一个fetch处理公用全局的逻辑
 * url ：api接口
 * method ： get post put
 * data：{}
 * return: promise
 * */
import fetch from "isomorphic-fetch";
import {message} from "antd";
import store from "../store/configureStore";
export default (url, method, data) => {
    if(!url || !method) return;
    let config = {
        method: method,
        headers: {
            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest"
        },
        // 设置同源cookies
        credentials: 'same-origin',
        // 跨域资源共享
        // credentials: 'include'
    }
    if(method == 'post' || method == 'put') {
        config = Object.assign({}, config, {
            body: JSON.stringify(data),
        });
    }
    store.dispatch({type: "showLoading", payload: '', meta: '显示loading'});
    return new Promise(function(resolve, reject) {
        fetch(url, config).then(response => response.json()).then(res => {
            store.dispatch({type: "hideLoading", meta: '隐藏loading'});
            if(res.status && res.status.code == 200) {
                resolve(res);
            } else {
                if(res.status.message) {
                    message.error(`错误：${ res.status && res.status.message }`, 3);
                }
                if(res.status && res.status.code == 1200) {
                    return store.dispatch(push('/userLogin/noLogin'));
                }
                reject(res);
            }
        }).catch(err => {
            store.dispatch({type: "hideLoading", meta: '隐藏loading'});
            console.error('Fetch Error: %s', err);
        })
    });
}

