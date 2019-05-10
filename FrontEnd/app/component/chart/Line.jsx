import React from "react";
import {
    G2,
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
    Facet,
    Util
} from "bizcharts";
import DataSet from "@antv/data-set";

class Curved extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: props.data,
            fields: props.fields
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            data: nextProps.data,
            fields: nextProps.fields
        });
    }

    render() {
        const data = this.state.data;
        const ds = new DataSet();
        const dv = ds.createView().source(data);
        dv.transform({
            type: "fold",
            fields: this.state.fields,
            key: "type",
            value: "count" // value字段
        });
        console.log(dv);
        const cols = {
            radio: {
                type: "linear",
                nice: true,
                min : 0,
                max : 1,
            }
        };
        return (
            <div>
                <Chart height={600} data={dv} scale={cols} forceFit>
                    <Legend />
                    <Axis name="radio" />
                    <Axis
                        name="count"
                        label={{
                            formatter: val => `${val}`
                        }}
                    />
                    <Tooltip
                        crosshairs={{
                            type: "y"
                        }}
                    />
                    <Geom
                        type="line"
                        position="radio*count"
                        size={2}
                        color={"type"}
                        shape={"smooth"}
                    />
                    <Geom
                        type="point"
                        position="radio*count"
                        size={4}
                        shape={"circle"}
                        color={"type"}
                        style={{
                            stroke: "#fff",
                            lineWidth: 1
                        }}
                    />
                </Chart>
            </div>
        );
    }
}

export default Curved; 