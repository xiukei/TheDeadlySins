import React, { Component } from "react";
import {
    Chart,
    Geom,
    Axis,
    Tooltip,
    Coord,
    Label,
    Legend,
    View,
    Guide,
    Shape,
    G2
} from "bizcharts";
import DataSet from "@antv/data-set";
import incomeData from '../../public/income.json'

const colorConfiguration = [
    "#8884d8",
    "#82ca9d",
    "#ffc658",
    "#ff7300",
    "#3182bd",
    "#1890FF",
    "#73C9E6",
    "#13C2C2",
    "#6CD9B3",
    "#2FC25B",
    "#9DD96C",
    "#FACC14",
    "#E6965C",
    "#F04864",
    "#D66BCA",
    "#8543E0",
    "#8E77ED",
    "#3436C7",
    "#737EE6",
    "#223273",
    "#7EA2E6"
];

class Labelline extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: props.chartData
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            data: nextProps.chartData
        });
    }

    render() {
        const { DataView } = DataSet;
        // const data = [
        //     {
        //         item: "A",
        //         count: 40
        //     },
        //     {
        //         item: "B",
        //         count: 21
        //     },
        //     {
        //         item: "C",
        //         count: 17
        //     },
        //     {
        //         item: "D",
        //         count: 13
        //     },
        //     {
        //         item: "E",
        //         count: 9
        //     }
        // ];
        const data = this.props.data.data;
        const sum = this.props.data.sum;
        const dv = new DataView();
        dv.source(data).transform({
            type: "percent",
            field: "count",
            dimension: "item",
            as: "percent"
        });
        const cols = {
            percent: {
                formatter: val => {
                    val = (val * 100).toFixed(2) + "%";
                    return val;
                }
            }
        };
        return (
            <div>
                <Chart
                    width={400}
                    height={400}
                    data={dv}
                    scale={cols}
                    padding={[20, 30, 20, 20]}
                >
                    <Coord type="theta" radius={0.75} />
                    <Axis name="percent" />
                    <Tooltip
                        showTitle={false}
                        itemTpl='<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'
                    />
                    <Geom
                        type="intervalStack"
                        position="percent"
                        //color="item"
                        color={["item", colorConfiguration]}
                        tooltip={[
                            "item*percent",
                            (item, percent) => {
                                percent = (percent * 100).toFixed(4) + "%";
                                return {
                                    name: item,
                                    value: percent
                                };
                            }
                        ]}
                        style={{
                            lineWidth: 1,
                            stroke: "#fff"
                        }}
                    >
                        <Label
                            offset={-10}
                            content="percent"
                            formatter={(val, item, count) => {
                                return item.point.count + " (" + val + ") ";
                            }}
                        />
                    </Geom>
                </Chart>
            </div>
        )
    }
}

export default Labelline;
