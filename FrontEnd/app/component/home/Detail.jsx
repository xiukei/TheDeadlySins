import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import LayoutBody from './Layout';
import Typography from './Typography';
import curvy from '../../public/productCurvyLines.png';
import pro2 from '../../public/productValues2.svg';

const styles = theme => ({
    root: {
        display: 'flex',
        overflow: 'hidden',
        backgroundColor: '#010101',
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
    curvyLines: {
        pointerEvents: 'none',
        position: 'absolute',
        top: -180,
    },
    content: {
        color: '#fff',
    },
    foot: {
        marginTop: theme.spacing.unit * 20,
        textAlign: 'center',
        margin: '0',
        fontSize: '10px',
        color: '#fff',
    }
});

function Detail(props) {
    const { classes } = props;

    return (
        <div>
            <section className={classes.root}>
                <LayoutBody className={classes.layoutBody} width="large">
                    <img
                        src={curvy}
                        className={classes.curvyLines}
                        alt="curvy lines"
                    />
                    <Grid container spacing={28}>
                        <Grid item xs={8} md={4}>
                        </Grid>
                        <Grid item xs={12} md={4}>
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
                                    TODO
                                </Typography>
                            </div>
                            <p className={classes.foot}>© Built by Group 41.</p>
                        </Grid>
                    </Grid>
                </LayoutBody>
            </section>
        </div>
    );
}

Detail.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Detail);