import React, { Component } from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Input from '@material-ui/core/Input';
import { getData } from '../api';




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


class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      results: null,

    };

    this.fetchResults = this.fetchResults.bind(this);
  }

  componentDidMount() {
    console.log('getting the data!');
    getData();
  }

  fetchResults() {
    let key = document.getElementById('searchBar').value.trim();
    console.log('this is the keyword: ', key);
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div className='container'>
          <div className='banner'>
            <div style={{ textAlign: 'center', width: '100%'}}>Toronto Waste Lookup</div>
          </div>

          <section className='searchContainer'>
            <Grid container spacing={40}>
              <Grid item xs={11}>
                  <input
                    id='searchBar'
                    type='text'
                    style={{
                      width: '100%',
                      height: '90%',
                      borderRadius: '3px',
                    }}
                    className='searchInput'
                    onKeyPress={e => {
                      if (e.key === 'Enter') {
                        this.fetchResults();
                      }
                    }}
                  />
              </Grid>

              <Grid item xs={1}>
                <div className='searchIcon pointer' onClick={() => {
                    this.fetchResults();
                  }}>
                  <FontAwesomeIcon icon={faSearch} size='lg' className='magIcon'/>
                </div>
              </Grid>
            </Grid>

          </section>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(styles)(Search);
