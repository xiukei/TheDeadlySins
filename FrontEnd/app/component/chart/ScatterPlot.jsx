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
import codeToName from '../../public/CodeToName.json';

class Scatter extends React.Component {
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
    const {data } = this.state;
    return (
      <div>
        <Chart height={600} data={data} forceFit>
          <Tooltip
            showTitle={false}
            crosshairs={{
              type: "cross"
            }}
            itemTpl="<li data-index={index} style=&quot;margin-bottom:4px;&quot;><span style=&quot;background-color:{color};&quot; class=&quot;g2-tooltip-marker&quot;></span>{name}<br/>{value}</li>"
          />
          <Axis name="radio" />
          <Axis name="avg" />
          <Geom
            type="point"
            position="radio*avg"
            opacity={0.65}
            shape="circle"
            color="code"
            size={4}
            tooltip={[
              "code*radio*avg",
              (code, radio, avg) => {
              let stateNameDic = codeToName.find(
                item => item.code == code
              );
                return {
                  name: "SA4 Code:  " + code + ", SA4 Name:  " + stateNameDic.name,
                  value: "Proportion: " + radio.toFixed(2) + ", Avg Income: " + avg + ""
                };
              }
            ]}
          />
        </Chart>
        <p>X value: Proportion of Anger Twitter; Y value: Avg Income for Every State</p>
      </div>
    );
  }
}

export default Scatter;
