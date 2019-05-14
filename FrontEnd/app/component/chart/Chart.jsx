import React from "react"
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Scatter from './ScatterPlot';
import incomeData from '../../public/Correct_income.json';
import codeToName from '../../public/CodeToName.json';
import twitter from '../../public/couchdb.json';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
});

class Chart extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    componentDidMount() {
        // let viewURL = "http://172.26.38.36:5984/tagged_twit/_design/angerviewdoc/_view/anger-view?group=true";
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

    render() {
        const { classes } = this.props;

        let data = [];
        // if (this.state.stateData != undefined) {
        //     let incomes = [];
        //     this.state.stateData.rows.map(function (value, index) {
        //         for (var a in incomeData) {
        //             if (a == value.key) {
        //                 incomes = incomeData[a];
        //             }
        //         }
        //         let radio = value.value.sum / value.value.count;
        //         data.push({
        //             radio: radio,
        //             "0-499": incomes[0],
        //             "500-999": incomes[1],
        //             "1000-1499": incomes[2],
        //             "1500-1999": incomes[3],
        //             "2000-2999": incomes[4],
        //             "3000-": incomes[5],
        //         })
        //     })
        // }
        // let fields = ["0-499", "500-999", "1000-1499", "1500-1999","2000-2999","3000-"];

        
        if (this.state.stateData != undefined) {
            let incomes = [];
            this.state.stateData.rows.map(function (value, index) {
                for (var a in incomeData) {
                    if (a == value.key) {
                        incomes = incomeData[a];
                    }
                }
                let radio = value.value.sum / value.value.count;
                let total = incomes[0] + incomes[1] + incomes[2] + incomes[3]+ incomes[4];
                let avg = (250 * incomes[0] + 750 * incomes[1] + 1250* incomes[2] + 1750 * incomes[3] + 2500 * incomes[4] + 3000 * incomes[5]) / total;
                let names = codeToName.find(
                    item => item.code == value.key
                  );
                data.push({
                    code : value.key,
                    radio: radio,
                    avg : avg
                    // "0-499": incomes[0],
                    // "500-999": incomes[1],
                    // "1000-1499": incomes[2],
                    // "1500-1999": incomes[3],
                    // "2000-2999": incomes[4],
                    // "3000-": incomes[5],
                })
            })
        }

        return (
            <div className={classes.root}>
                <Grid container spacing={24}>
                    <Grid item xs={12}>
                        <Scatter data={data} />
                    </Grid>
                    <Grid item xs={6}>

                    </Grid>
                </Grid>
            </div>
        )
    }
}

Chart.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Chart);