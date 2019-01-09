import React, { Component } from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Input from '@material-ui/core/Input';
import { getData } from '../api';
import ResultsCard from './ResultsCard';

const FuzzyMatching = require('fuzzy-matching');


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
      data: [],
      results: [],

    };

    this.fetchResults = this.fetchResults.bind(this);
  }

  componentDidMount() {
    console.log('getting the data!');
    getData().then(data => {
      this.setState({data});
      console.log('this is the state: ', this.state);
    })

  }

  async fetchResults() {
    this.setState({results: []}, () => {
      let key = document.getElementById('searchBar').value.trim().toLowerCase();
      console.log('this is the keyword: ', key);
      this.state.data.forEach(entry => {
        // console.log('this is the entry: ', entry.category.toLowerCase());
        // console.log('this is the logic check: ', !!this.state.results.indexOf(entry));
        if (!(this.state.results.indexOf(entry) + 1)) {
          // console.log('looking for match.')
          let keywords = entry.keywords.split(',');
          let fmKeyWords = new FuzzyMatching(keywords);
          let catSplit = entry.category.split(' ');
          let titleSplit = entry.title.split(' ');
          let fmCatKeys = new FuzzyMatching(catSplit);
          let fmTitleKeys = new FuzzyMatching(titleSplit);
          if (fmCatKeys.get(key, { maxChanges: 2 }).value || fmTitleKeys.get(key, { maxChanges: 2 }).value) {
            this.state.results.push(entry);
            console.log('this is the new matches array: ', this.state.results);
          } else {
            let match = fmKeyWords.get(key, { maxChanges: 3 }).value;
            if (match) {
              console.log('found a match!: ', match, 'and this is the entry: ', entry);
              this.state.results.push(entry);
              console.log('this is the new matches array: ', this.state.results);
            }
          }
        }
      })
    });

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
                    onKeyPress={async e => {
                      if (e.key === 'Enter') {
                        await this.fetchResults();
                        console.log('this is the new state: ', this.state);
                        this.forceUpdate();
                      }
                    }}
                  />
              </Grid>

              <Grid item xs={1}>
                <div className='searchIcon pointer' onClick={async () => {
                    await this.fetchResults();
                    console.log('this is the new state: ', this.state);
                    this.forceUpdate();
                  }}>
                  <FontAwesomeIcon icon={faSearch} size='lg' className='magIcon'/>
                </div>
              </Grid>
            </Grid>

          </section>

          <section>
            {this.state.results.length ?
              this.state.results.map(result => {
                return(
                  <ResultsCard data={result} />
                )
              })
              :
              null
            }
          </section>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(styles)(Search);
