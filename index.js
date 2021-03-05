'use strict'

import React, {Component} from 'react'
import Echarts from './src/instances/index'
import { common } from './src/common/index'

const ChartType = common.chartType

class Chart extends Component {
    setNewOption(option) {
        this.chart.setNewOption(option)
    }

    render() {
        return (
            <Echarts {...this.props} ref={(e) => (this.chart = e)} >
                {this.props.children}
            </Echarts>
        )
    }
}

export {
    Chart,
    ChartType,
}
