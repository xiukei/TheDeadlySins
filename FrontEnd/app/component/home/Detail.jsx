import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import LayoutBody from './Layout';
import Typography from './Typography';
import curvy from '../../public/productCurvyLines.png';
import arch from '../../public/architecture.png';
import pro2 from '../../public/productValues2.svg';
import archIcon from '../../public/archIcon.svg';
import SwipeableViews from 'react-swipeable-views';

const styles = theme => ({
    root: {
        display: 'flex',
        overflow: 'hidden',
        height: "800px",
        backgroundColor: '#010101'
    },
    arch: {
        display: 'flex',
        overflow: 'hidden'
    },
    layoutBody: {
        marginTop: theme.spacing.unit * 10,
        display: 'flex',
        position: 'relative'
    },
    item: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `0px ${theme.spacing.unit * 5}px`
    },
    image: {
        height: 55,
    },
    title: {
        marginTop: theme.spacing.unit * 3,
        marginBottom: theme.spacing.unit * 3,
        color: '#fff'
    },
    titleBlack: {
        marginTop: theme.spacing.unit * 3,
        marginBottom: theme.spacing.unit * 3
    },
    curvyLines: {
        marginTop: "20px",
        pointerEvents: 'none',
        position: 'absolute',
        top: -180,
    },
    content: {
        color: '#fff',
        width: "700px"
    },
    foot: {
        textAlign: 'center',
        margin: '0',
        fontSize: '20px',
        color: '#fff',
        backgroundColor: '#010101'
    }
});

function Detail(props) {
    const { classes } = props;

    return (
        <div>
            <SwipeableViews enableMouseEvents>
                <div>
                    <section className={classes.root}>
                        <LayoutBody className={classes.layoutBody} width="large">
                            <img
                                src={curvy}
                                className={classes.curvyLines}
                                alt="curvy lines"
                            />
                            <Grid container spacing={24}>
                                <Grid item xs={12}>
                                    <div className={classes.item}>
                                        <img
                                            className={classes.image}
                                            src={pro2}
                                            alt="graph"
                                        />
                                        <Typography variant="h6" className={classes.title}>
                                            About The Research
                                </Typography>
                                        <Typography variant="h5" className={classes.content}>
                                            Sentiment analysis on social media is in great demand these years for business, social studies, health research and many other purposes. We built a system which is reliable, flexible and scalable to automatically performs sentiment analysis and shows results by utilizing Twitter data and Total Personal Income (weekly) census data available from AURIN. We implement several prevalent technologies to deploy our system to automate our services. <br />
                                            The main focus of the project was to build a robust, scalable and reusable system architecture and  automatic Front End visualization with various sentiment analysis scenarios. In other words, each components in our cloud ecosystem co-work concordantly and is capable to give some insights on sentiment analysis without modifying the harvesting part.
                                </Typography>
                                    </div>
                                </Grid>
                            </Grid>
                        </LayoutBody>
                    </section>
                </div>



                <div>
                    <section className={classes.root}>
                        <LayoutBody className={classes.layoutBody} width="large">
                            <img
                                src={curvy}
                                className={classes.curvyLines}
                                alt="curvy lines"
                            />
                            <Grid container spacing={24}>
                                <Grid item xs={12}>
                                    <div className={classes.item}>
                                        <img
                                            className={classes.image}
                                            src={archIcon}
                                            alt="graph"
                                        />
                                        <Typography variant="h6" className={classes.title}>
                                            System Architecture
                                        </Typography>
                                        <img style={{ textAlign: 'center', width: '900px', zIndex: 99 }}
                                            src={arch}
                                        />
                                    </div>
                                </Grid>
                            </Grid>
                        </LayoutBody>
                    </section>
                </div>
            </SwipeableViews>
            <p className={classes.foot}>© Built by Group 41.</p>
        </div>
    );
}

Detail.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Detail);