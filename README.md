# react-native-echarts-strong

1.扩展echarts组件, 支持 Map类型地图图表 / MarkLine / 图表类型参数化配置

2.解决android tpl.html文件引入问题

3.组件式更直观，相对于配置便于维护

4.开发思维不同，将 option 数据分散到各组件中，动态数据存放在 state 中，不用关心动态数据与静态数据的合并操作

# 安装

```js
npm install react-native-echarts-strong
```

# 使用

```js
import {Chart, ChartType} from 'react-native-echarts-strong'

class Example extends Component {

    render() {
        return (
            <Chart
                width={400}
                height={400}
                title={'示例标题'}
                legend={}
                type={ChartType.line}
                data={[{xValues: 1, yValues: 98}, {xValues: 2, yValues: 99}, {xValues: 3, yValues: 100}]}
                markLine={[ { value: 1, color: 'red', title: '标记线1' } ]}
                max={100}
                min={10}
                isFetching={true}
                theme={'vintage'} // vintage || dark || macarons || infographic || shine || roma
            />
        )
    }

}

```

# 属性

- width
    - 宽度
- height
    - 高度
- title
    - 图表标题
- legend
    - 图例文字
- type
    - 图表类型 
        为枚举类型 ChartType（line, bar, pie, scatter, effectScatter, radar, tree, treemap, sunburst, boxplot, 
        candlestick, heatmap, map, parallel, lines, graph, sankey, funnel, gauge, pictorialBar, themeRiver, 
        custom, category）
- data
    - 数据 
        格式为 [ { xValue: value, yValue: value } ]
- markLine
    - 标记线
- max
    - y轴最大值
- min
    - y轴最小值
- isFetching
    - 请求状态
- backgroundColor
    - 图表背景色
- themeName
    - 主题 （vintage || dark || macarons || infographic || shine || roma）
