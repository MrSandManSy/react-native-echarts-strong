'use strict'

import React, {Component} from 'react'
import {Dimensions, View, ActivityIndicator} from 'react-native'
import fastDeepEqual from 'fast-deep-equal'

const common = {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    style: {
        fontSize: 15,
        color: '#666666',
        marginLeft: 15,
        marginTop: 21
    },
    chartHeight: (height) => {
        return height || 250
    },
    markLineExample1: [
        {value: 35, color: 'rgba(22, 202, 176, 1)', title: '优'},
        {value: 75, color: 'rgba(230, 206, 25, 1)', title: '良'},
        {value: 115, color: 'rgba(247, 157, 82, 1)', title: '差'},
    ],
    markLineExample2: [
        {value: 40, color: '#F79D52', title: '干燥'},
        {value: 60, color: '#2D69FF', title: '潮湿'},
    ],
    baseMarkLine: {
        silent: true,
        symbol: 'none',
    },
    setLabel: (value, color, title) => {
        return {
            yAxis: value,
            itemStyle: {
                normal: {
                    show: true,
                    color: color
                }
            },
            label: {
                normal: {
                    show: true,
                    position: 'end',
                    formatter: title,
                    color: 'blue' //字颜色设置没有用
                }
            }
        }
    },
    option: (title, legend, type, xValues = [], yValues = [], markLine = null, yMax = null, yMin = null) => {
        const defaultYmax = Math.ceil((Math.max.apply(Math, yValues) + 5) / 10) * 10
        const defaultYmin = Math.floor((Math.min.apply(Math, yValues) - 5) / 10) * 10
        
        const mark = !markLine? null:{
            ...baseMarkLine,
            data: markLine.reduce((current, total = []) => {
                total.push(this.setLabel(current.values, current.color. current.title))
                return total
            }, [])
        }
    
        return {
            title: {
                text: title || '',
                textStyle: {
                    fontSize: 12,
                    fontWeight: '500',
                    color: '#383A3B'
                }
            },
            // color: ['#2D69FF'], // 线段颜色
            tooltip: {
                padding: [10, 14, 10, 14],
                textStyle: {
                    fontSize: 12,
                    color: '#ffffff',
                    fontWeight: 'bold'
                },
                borderRadius: 12,
                trigger: 'axis',
                // formatter: function (params) {
                //     let p = params[0]
                //     let res = p.data.tipx + '<br/>'
                //     res += p.seriesName + ' : ' + parseInt(p.value, 10) + '<br/>'
                //     return res
                // }
            },
            xAxis: {
                data: xValues
            },
            yAxis: {
                type: 'value',
                axisLabel: {
                    formatter: '{value}'
                },
                nameTextStyle: {
                    color: '#383A3B',
                    fontSize: 8,
                    fontWeight: '400'
                },
                min: yMin || defaultYmin,
                max: yMax || defaultYmax,
                splitNumber: 5
            },
            series: [
                {
                    name: legend,
                    type: type,
                    smooth: true,
                    data: yValues.map((item) => {
                        return {
                            value: item, //value字段为必须字段
                            tipx: 'x.tipx'
                        }
                    }),
                    markLine: mark
                }
            ]
        }
    },
    chartType: {
        line: 'line',
        bar: 'bar',
        scatter: 'scatter',
        map: 'map',
        category: 'category',
    }
}

// 子节点
const childrens = [
    // 普通配置项
    'title',
    'legend',
    'tooltip',
    'axisPointer',
    'label',
    'toolbox',
    'feature',
    'grid',
    'xAxis',
    'yAxis',
    'series',
    'dataZoom',
    'link',
    'visualMap',
    'markArea',
    'markLine',
    'graphic',
    'children',
    'splitLine',
    'axisLabel',
    'style',
    'lineStyle',
    'options',
    'baseOption',
    'textStyle',
    'rich',
    'subtextStyle',
    'polar',
    'radiusAxis',
    'angleAxis',
    'radar',
    'brush',
    'geo',
    'parallel',
    'parallelAxis',
    'singleAxis',
    'timeline',
    'calendar',
    'dataset',
    'aria',
    'pageIcons',
    'nameTextStyle',
    'axisLine',
    'axisTick',
    'splitArea',
    'shadowStyle',
    'name',
    'indicator',
    // 'data',
    'handleStyle',
    'inRange',
    'outOfRange',
    'controller',
    'handle',
    'saveAsImage',
    'iconStyle',
    'inBrush',
    'outOfBrush',
    'scaleLimit',
    'regions',
    'parallelAxisDefault',
    'areaSelectStyle',
    'checkpointStyle',
    'controlStyle',
    'elements',
    'dayLabel',
    'monthLabel',
    'yearLabel',
    'dimensions',
    'general',
    'multiple',
    'single',
    'separator',
    'markPoint',
    'rippleEffect',
    'levels',
    'upperLabel',
    'ellipsis',
    'breadcrumb',
    'detail',
    'hoverAnimation',

    // GL配置项
    'global',
    'realisticMaterial',
    'lambertMaterial',
    'colorMaterial',
    'light',
    'main',
    'ambient',
    'ambientCubemap',
    'postEffect',
    'bloom',
    'depthOfField',
    'SSAO',
    'colorCorrection',
    'FXAA',
    'temporalSuperSampling',
    'viewControl',
    'layers',
    'geo3D',
    'groundPlane',
    'mapbox3D',
    'grid3D',
    'xAxis3D',
    'yAxis3D',
    'zAxis3D',
    'wireframe',
    'forceAtlas2',
    'links'
]

const mergeOptions = (oldOption, newOption) => {
    if (oldOption) {
        // 当前配置是个数组
        if (Array.isArray(oldOption)) {
            for (let i = 0, l = oldOption.length; i < l; i++) {
                const option = oldOption[i]
                if (option.__rechartId === newOption.__rechartId) {
                    return isEqual(option, newOption) ? false : ((oldOption[i] = newOption), oldOption)
                }
            }
            return oldOption.concat(newOption)
        } else {
            if (oldOption.__rechartId !== newOption.__rechartId) {
                return [oldOption, newOption]
            }
        }
    }
    return newOption
}

const isEqual = (a, b, opt = {}) => {
    return fastDeepEqual(extract(a, opt), extract(b, opt))
}

const extract = (o, opt = {}) => {
    const _o = {}
    const { include, exclude } = opt
    if (include) {
        for (let i = 0, l = include.length; i < l; i++) {
            const key = include[i]
            _o[key] = o[key]
        }
    } else {
        Object.assign(_o, o)
    }
    if (exclude) {
        for (let i = 0, l = exclude.length; i < l; i++) {
            delete _o[exclude[i]]
        }
    }
    return _o
}


class Loading extends Component {

    render() {
        return (
            <View style={{padding: 20, height: common.chartHeight(this.props.height), justifyContent: 'center'}}>
                <ActivityIndicator color="black" animating={true} />
            </View>
        )
    }

}

class Empty extends Component {

    render() {
        return (
            <View style={{padding: 20, height: common.chartHeight(this.props.height), alignItems: 'center', justifyContent: 'center',}}>
                <Image source={require('../assets/empty.png')} />
            </View>
        )
    }

}

export {common, childrens, mergeOptions, Loading, Empty}
