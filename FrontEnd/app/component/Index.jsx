import React from 'react';
import { Paper } from "@material-ui/core";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Map from "./map/Map"
import Home from "./home/Home"
import Chart from "./chart/Chart"


class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            view_type: "home"
        };
    }

    onTopLevelFilterChange = (value) => {
        this.setState({
            view_type: value
        })
    }


    render() {
        const { view_type } = this.state;
        return (
            <div>
                <Paper>
                    <Tabs
                        value={view_type}
                        // onChange={this.handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        variant="fullWidth"
                    >
                        <Tab
                            value="home"
                            label="Home"
                            onClick={() => {
                                this.onTopLevelFilterChange("home");
                            }}
                        />
                        <Tab
                            value="map"
                            label="Map"
                            onClick={() => {
                                this.onTopLevelFilterChange("map");
                            }}
                        />
                        <Tab
                            value="chart"
                            label="Chart"
                            onClick={() => {
                                this.onTopLevelFilterChange("chart");
                            }}
                        />
                    </Tabs>
                </Paper>
                {
                    view_type == "home" ? (<Home />) : null
                }
                {
                    view_type == "map" ? (<Map />) : null
                }
                {
                    view_type == "chart" ? (<Chart />) : null
                }
            </div>
        );
    }
}

export default Index;