import React, { Component } from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import Paper from '@material-ui/core/Paper';



const Entities = require('html-entities').AllHtmlEntities;

const entities = new Entities();

function fixString(str) {
  return entities.decode(str);
}



const styles = {
  card: {
    padding: '24px',
    minHeight: '20vh',
    borderRadius: '5px',
    backgroundColor: '#e8e9ea'
  }
};

const theme = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#1D5A94',
    },
    secondary: {
      main:'#22965E'
    }
  },
});

class ResultsCard extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    const { classes } = this.props;
    return(
    <MuiThemeProvider theme={theme}>
        <section style={{
            padding: '24px',
          }}>
          <div className={`${classes.card} hoverCard`} elevation='2'>
            <Grid container spacing={24}>
              <Grid item xs={12} md={6}>
                <Typography className='resultTitle'>
                  <FontAwesomeIcon icon={faStar} size='lg' className={this.props.favorite ? 'favorite pointer ease' : 'nonFavorite pointer ease'} onClick={() => {
                      console.log('setting Fav');
                      this.props.setFavorite(this.props.data);
                    }}/> {this.props.data.title}
                </Typography>
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography>
                  { ReactHtmlParser(fixString(this.props.data.body)) }
                </Typography>
              </Grid>
            </Grid>
          </div>
        </section>

    </MuiThemeProvider>
  )
  }
}


export default withStyles(styles)(ResultsCard);
