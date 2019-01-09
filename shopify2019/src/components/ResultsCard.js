import React, { Component } from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';



const Entities = require('html-entities').AllHtmlEntities;

const entities = new Entities();

function fixString(str) {
  return entities.decode(str);
}



const styles = {
  main: {
    height: '100%',
    marginBottom: 0,
    boxShadow: '0 5px 14px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22) inset',
    padding: '48px 24px',

  },
  paper: {
    padding: '32px',
    display: 'table-cell',
    verticalAlign: 'middle',
    background: 'transparent',
    color: 'white !important',
  },
  title: {
    textTransform: 'uppercase',
    letterSpacing: '1.25px',
    fontFamily: "'Open Sans', sans-serif",
  },
  text: {
    fontSize: '1rem',
    fontFamily: "'Open Sans', sans-serif",
  },
  container: {
    height: '10%',
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
    return(
    <MuiThemeProvider theme={theme}>
      <section style={{
          padding: '24px',
        }}>
        <Grid container spacing={24}>
          <Grid item xs={12} md={6}>
            <Typography>
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
      </section>
    </MuiThemeProvider>
  )
  }
}


export default withStyles(styles)(ResultsCard);
