import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Typography from './Typography.jsx';
import Detail from './Detail.jsx';
import ProductHeroLayout from './HomeLayout.jsx';
import Background from '../../public/15564477025.jpg';


const styles = theme => ({
    background: {
        backgroundImage: `url(${Background})`,
        backgroundColor: '#7fc7d9', // Average color of the background image.
        backgroundPosition: 'center',
    },
    h5: {
        marginBottom: theme.spacing.unit * 4,
        marginTop: theme.spacing.unit * 4,
        [theme.breakpoints.up('sm')]: {
            marginTop: theme.spacing.unit * 10,
        },
    },
    more: {
        marginTop: theme.spacing.unit * 2,
    }
});

function ProductHero(props) {
    const { classes } = props;

    return (
        <div>
            <ProductHeroLayout backgroundClassName={classes.background}>
                {/* Increase the network loading priority of the background image. */}
                <img style={{ display: 'none' }} src={Background} alt="" />
                <Typography color="inherit" align="center" variant="h2" marked="center">
                    Wrath Research in Australia
                </Typography>
                <Typography color="inherit" align="center" variant="h4" className={classes.h5}>
                    Group 41<br />
                </Typography>
                <Typography color="inherit" align="center" variant="h5">
                    Junyi Shi<br />
                    Ruitong Liu<br />
                    Xi Yang<br />
                    Yinbo Li<br />
                    Zhaoqi Fang<br />
                </Typography>
            </ProductHeroLayout>
            <Detail />
        </div>
    );
}

ProductHero.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductHero);