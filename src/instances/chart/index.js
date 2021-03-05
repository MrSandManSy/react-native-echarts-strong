'use strict'

import React, {Component, isValidElement} from 'react'
import {View} from 'react-native'
import {Loading, Empty, mergeOptions} from '../../common/index'
import BaseChart from '../base/index'

export default class ChartType extends Component {
    constructor(props) {
        super(props)
    }

    shouldComponentUpdate(nextProps) {
        if (JSON.stringify(nextProps.data) != JSON.stringify(this.props.data)) {
            return true
        }
        if (nextProps.isFetching != this.props.isFetching) {
            return true
        }
        return false
    }

    handleReceiveChildOption = (name, option) => {
        const newOptions = mergeOptions(this.options[name], option)
        if (newOptions) {
            this.options[name] = newOptions
            if (this.chart && this.state.isLoaded) {
                // 仅重新setOption变更部分
                this.chart.setOption({
                    [name]: newOptions
                })
            }
        }
    }

    toOptions = () => {
        {React.Children.map(this.props.children, children => {
            if (isValidElement(children)) {
                return React.cloneElement(children, {
                    triggerPushOption: this.handleReceiveChildOption
                })
            }
            return children
        })}
    }

    render() {
        const {width, height, title, legend, type, data, markLine, max, min, isFetching,} = this.props
        return isFetching? <Loading height={height}/>:
            data.length == 0? <Empty height={height}/>:
                <View style={{ margin: 10, width: width || '100%' }}>
                    <BaseChart 
                        height={height}
                        title={title}
                        legend={legend}
                        type={type}
                        xValues={data.map(rs => rs.xValues)}
                        yValues={data.map(rs => rs.yValues)}
                        markLine={markLine}
                        max={max}
                        min={min}
                    />
                </View>
    }

}
