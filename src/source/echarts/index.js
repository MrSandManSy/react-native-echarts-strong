'use strict'

import React, {Component} from 'react'
import {View, Platform} from 'react-native'
import WebView from 'react-native-webview'
import renderChart from './renderChart'
import HtmlWeb from '../utils/htmlWeb'

export default class App extends Component {
    constructor(props) {
        super(props)
        this.setNewOption = this.setNewOption.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.option !== this.props.option) {
            this.refs.chart.reload()
        }
    }

    setNewOption(option) {
        this.refs.chart.postMessage(JSON.stringify(option))
    }

    onMessage(event) {
        const { onDataZoom, } = this.props
        if (event.nativeEvent.data == 'datazoom') {
            !onDataZoom ?  null: onDataZoom(event.nativeEvent.data)
        } else {
            !onPress ? null:onPress(JSON.parse(event.nativeEvent.data))
        }
    }

    render() {
        const { height, backgroundColor } = this.props
        return (
            <View style={{flex: 1, height: height || 400}}>
                <WebView
                    style={{ height: height || 400, backgroundColor: backgroundColor || 'transparent' }}
                    ref="chart"
                    textZoom={100}
                    scrollEnabled={true}
                    scalesPageToFit={Platform.OS !== 'ios'}
                    originWhitelist={['*']}
                    onMessage={this.onMessage.bind(this)}
                    source={{html: HtmlWeb}}
                    injectedJavaScript={renderChart(this.props)}
                />
            </View>
        )
    }
}
