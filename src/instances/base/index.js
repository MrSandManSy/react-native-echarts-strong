'use strict'

import React, {Component} from 'react'
import {View} from 'react-native'
import Echarts from '../../source/index'
import {common} from '../../common/index'

export default class BaseChart extends Component {
    constructor(props) {
        super(props)
        this.height = common.chartHeight(props.height)
        this.options = common.option(props.title, props.legend, props.type, props.xValues, props.yValues, props.markLine, props.max, props.min)
    }

    render() {
        return (
            <View style={{padding: 10}}>
                <Echarts option={this.options} height={this.height} />
            </View>
        )
    }
}
