'use strict'

import worldJson from './map/worldJson'
import toString from '../utils/toString'

export default function renderChart(props) {
    const height = `${props.height || 400}px`
    const width = props.width ? `${props.width}px` : 'auto'
    return `
        const eChartsContainer = document.getElementById('main')
        eChartsContainer.style.height = "${height}";
        eChartsContainer.style.width = "${width}";
        eChartsContainer.style.background = "${props.backgroundColor}";
        echarts.registerMap('world', ${JSON.stringify(worldJson)});
        const myChart = echarts.init(eChartsContainer, '${props.themeName}');
        let clickName = {}
        myChart.on('mousedown', (params)=>{
            clickName = {
                name: params.name || '',
                value: params.value || 0
            }
        });
        myChart.on('dataZoom', (params)=>{
            window.ReactNativeWebView.postMessage(params.type);
        });
        myChart.getZr().on('click', (params)=>{
            clickName = {}
        });
        // 借助dom click获取点击目标
        eChartsContainer.onclick = ()=>{
            if(clickName.name || clickName.value){
                window.ReactNativeWebView.postMessage(JSON.stringify(clickName));
            }
        };
        var postEvent = params => {
        var seen = [];
        var paramsString = JSON.stringify(params, function(key, val) {
            if (val != null && typeof val == "object") {
            if (seen.indexOf(val) >= 0) {
                return;
            }
            seen.push(val);
            }
            return val;
        });
        }
        myChart.setOption(${toString(props.option)});
        
        //判断是否是iOS
        let u = navigator.userAgent;
        let isiOS = !!u.match(/\\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        if(isiOS){
            window.addEventListener("message", function(event) {
                if(!event.isTrusted){
                    // 非图表类点击则执行刷新数据操作
                    var option = JSON.parse(event.data);
                    myChart.setOption(option);
                }
            });
        } else {
            // android监听
            window.document.addEventListener('message', function(event) {
                var option = JSON.parse(event.data);
                myChart.setOption(option);
            });
        }
        myChart.on('mapselectchanged', postEvent);
    `
}
