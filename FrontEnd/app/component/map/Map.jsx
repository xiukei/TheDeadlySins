import React from "react"
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { compose, withProps, lifecycle } from "recompose";
import { withScriptjs, withGoogleMap, GoogleMap, InfoWindow, Polygon, Marker } from "react-google-maps";
import geoData from '../../public/SA4_2016_AUST.json';
import incomeData from '../../public/Correct_income.json';
import { relative } from "path";
import Labelline from "../chart/Pie"
import twitter from '../../public/couchdb.json';


// const paths = [{ lng: 145.001292608, lat: -37.795597669 }, { lng: 145.001945248, lat: -37.79665894 }, { lng: 145.001527872, lat: -37.797168023 }, { lng: 144.999500896, lat: -37.797004021 }, { lng: 144.999388896, lat: -37.79765905 }, { lng: 145.007269856, lat: -37.80297806 }, { lng: 145.007666848, lat: -37.803904059 }, { lng: 145.004588864, lat: -37.805342101 }, { lng: 145.001617952, lat: -37.804250101 }, { lng: 145.000149952, lat: -37.804289118 }, { lng: 144.999283968, lat: -37.805218114 }, { lng: 144.999963968, lat: -37.806600138 }, { lng: 145.000790944, lat: -37.807219129 }, { lng: 145.008068832, lat: -37.807408107 }, { lng: 145.00896384, lat: -37.807996092 }, { lng: 145.009381856, lat: -37.810401129 }, { lng: 145.015504736, lat: -37.810504081 }, { lng: 145.015406816, lat: -37.812144865 }, { lng: 144.991351072, lat: -37.809731244 }, { lng: 144.9936, lat: -37.796054397 }, { lng: 144.997628768, lat: -37.796422048 }, { lng: 145.001292608, lat: -37.795597669 }]

const styles = {
    card: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    gradient: {
        marginLeft: '50px',
        marginRight: '20px',
        height: '200px',
        width: '10px',
        background: 'linear-gradient(#ffffff, #ff142c)',
        display:'inline-block'
    },
    word:{
        fontSize: '16px'
    }
};

const MyMapComponent = compose(
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyBzePKpJhMUNanb890R2sYaUF6zDWJGUcI&v=3.exp&libraries=geometry,drawing,places&language=en-US",
        // googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `800px` }} />,
        mapElement: <div style={{ height: `100%` }} />,
    }),
    withScriptjs,
    withGoogleMap
)(
    (props) =>
        <GoogleMap
            defaultZoom={5}
            defaultCenter={{ lat: -26.08525376372465, lng: 133.7342084883146 }}
        >
            {
                props.pathsArray.map(function (value, index) {
                    let start = "#ffffff";
                    let end = "#ff142c";
                    let max = props.max;
                    let min = props.min;

                    let color = start;
                    if(value.count != 0){
                        // color = start - (value.sum / value.count - min) / (max - min) * (start - end);
                        let s_r =parseInt(start.substr(1,2), 16);
                        let s_g =parseInt(start.substr(3,2), 16);
                        let s_b =parseInt(start.substr(5,2), 16);
                        let e_r =parseInt(end.substr(1,2), 16);
                        let e_g =parseInt(end.substr(3,2), 16);
                        let e_b =parseInt(end.substr(5,2), 16);
                        let radio = (value.sum / value.count - min) / (max - min);
    
                        let c_r = s_r + radio * (e_r - s_r);
                        let c_g = s_g + radio * (e_g - s_g);
                        let c_b = s_b + radio * (e_b - s_b);
    
                        color = "#" + Math.round(c_r).toString(16) + Math.round(c_g).toString(16) + Math.round(c_b).toString(16)
                    } 
                    // color = "#" + Math.round(color).toString(16);
                    // console.log(value.code + "   " + color);
                

                    return (
                        <div>
                            <Polygon
                                paths={value.paths}
                                onClick={props.polygonClick.bind(this, value)}
                                options={{
                                    strokeColor: color,
                                    fillColor: color,
                                    strokeOpacity: "0.5",
                                    strokeWeight: '2'
                                }}
                            >
                            </Polygon>
                        </div>
                    )
                })
            }
            {props.show &&
                <InfoWindow
                    options={{
                        position: props.position
                    }}
                    onCloseClick={props.closeWindow}
                >
                    <div>
                        {props.showInfo}
                    </div>
                </InfoWindow>
            }
        </GoogleMap>
)


class Map extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isMarkerShown: true,
            show: false,
            position: { lng: 145.001292608, lat: -37.795597669 }
        };
    }

    polygonDraw = () => {
        this.setState({
            pathsArray: pathsArray
        })
    }

    componentDidMount() {
        // let viewURL ="http://172.26.38.36:5984/tagged_twit/_design/angerviewdoc/_view/anger-view?group=true";
        // fetch(viewURL).then(res => {
        //     res.json().then((dataJson) => {
        //         this.setState({
        //             stateData: dataJson
        //         });
        //     })
        // })
        this.setState({
            stateData: twitter
        });
    }

    polygonClick = (state, e) => {
        console.log(state.code);

        let value = [];
        for(var a in incomeData){
            if(a == state.code){
                value = incomeData[a];
            }
        }
        let sum = value[0] + value[1] + value[2] +value[3] +value[4] +value[5];
        const data = {data: [
            {
                item: "Lower than 500 (0 - 499)",
                count: value[0]
            }, 
            {
                item: "Lower than 1000 (500 - 999)",
                count: value[1]
            }, 
            {
                item: "Lower than 1500 (1000 - 1499)",
                count: value[2]
            }, 
            {
                item: "Lower than 2000 (1499 - 1999)",
                count: value[3]
            }, 
            {
                item: "Lower than 3000 (2000 - 2999)",
                count: value[4]
            }, 
            {
                item: "Higher than 3000 (3000 - )",
                count: value[5]
            }, 
        ], sum : sum};
        
        let ilat = e.latLng.lat();
        let ilng = e.latLng.lng();
        const { classes } = this.props;
        let info = (
        <div>
            <p className={classes.word}>SA4 Code: {state.code}</p>
            <p className={classes.word}>SA4 Name: {state.name}</p>
            <p className={classes.word}>Anger proportion : {((state.sum / state.count)*100).toFixed(2) + "%"}</p>
            <p className={classes.word}>Total Income: {sum}</p>
            <Labelline 
                data = {data}
            />
            <p className={classes.word} style={{textAlign:'center'}}>Pie Chart : Distribution of Weekly Income</p>
        </div>);
        this.setState({
            show: true,
            code : state.code,
            showInfo : info,
            position: { lng: ilng, lat: ilat }
        })
    }

    closeWindow = () => {
        this.setState({
            show: false
        })
    }
    
    calculatCount = (stateData, code) =>{
        let count = 0;
        let sum = 0;
        if(stateData != undefined){
            stateData.rows.map(function(stateValue,stateIndex){
                if(stateValue.key == code){
                    count = stateValue.value.count;
                    sum = stateValue.value.sum;
                }
            })
        }
        return {count: count, sum: sum};
    }

    render() {
        let { show, position,showInfo } = this.state;
        const { classes } = this.props;

        let pathsArray = [];
        let tempJson = [];
        let min = 1;
        let max = 0;

        let stateData = this.state.stateData;
        console.log(stateData);

        let _this = this;
        geoData.features.map(function (value, index) {
            if (value.geometry) {
                if (value.geometry.type == "Polygon") {
                    let geoPath = [];
                    value.geometry.coordinates[0].map(function (valueC, indexC) {
                        let geo = { lng: valueC[0], lat: valueC[1] };
                        geoPath.push(geo);
                    })
                    let code = value.properties.SA4_CODE16;
                    let name = value.properties.SA4_NAME;
                    let twidata = _this.calculatCount(stateData,code);
                    if(twidata.sum / twidata.count < min){
                        min = twidata.sum / twidata.count 
                    }
                    if(twidata.sum / twidata.count > max){
                        max = twidata.sum / twidata.count 
                    }
                    pathsArray.push({code : code, paths: geoPath, name : name,  sum : twidata.sum, count: twidata.count});
                    tempJson.push({code: code, name, name});
                } else if (value.geometry.type == "MultiPolygon") {
                    let code = value.properties.SA4_CODE16;
                    let twidata = _this.calculatCount(stateData,code);
                    let name = value.properties.SA4_NAME;
                    if(twidata.sum / twidata.count < min){
                        min = twidata.sum / twidata.count 
                    }
                    if(twidata.sum / twidata.count > max){
                        max = twidata.sum / twidata.count 
                    }
                    value.geometry.coordinates.map(function (valueC, indexC) {
                        let geoPath = [];
                        valueC[0].map(function (valueMC, indexMC) {
                            let geo = { lng: valueMC[0], lat: valueMC[1] };
                            geoPath.push(geo);
                        })
                        pathsArray.push({code : code, paths: geoPath, name : name, sum : twidata.sum, count: twidata.count});
                    })
                    tempJson.push({code: code, name, name});
                }
            }
        })
        console.log(pathsArray);
        console.log( JSON.stringify(tempJson));

        return (
            <div stle={{ positon: 'relative' }}>
                <MyMapComponent
                    show={show}
                    pathsArray={pathsArray}
                    polygonClick={this.polygonClick}
                    showInfo={showInfo}
                    position={position}
                    closeWindow={this.closeWindow}
                    min = {min}
                    max = {max}
                />
                <div style={{ position: 'absolute', top: '50px', right: '300px', width: '50px', height: '50px' }}>
                    <Card className={classes.card}>
                        <CardContent>
                            <div>
                                <table>
                                    <tr>
                                        <td rowSpan="4">
                                        <div className={classes.gradient}>
                                        </div>
                                        </td>
                                        <td valign="top">{min * 100 + "%"}</td>
                                    </tr>
                                    <tr><td></td></tr>
                                    <tr><td></td></tr>
                                    <tr>
                                        <td valign="bottom">{(max * 100).toFixed(2) + "%"}</td>
                                    </tr>
                                </table>
                            </div>
                        </CardContent>
                        <CardActions>
                        </CardActions>
                    </Card>
                </div>
            </div>
        )
    }
}

Map.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Map);