import React, { Component } from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faStar } from '@fortawesome/free-solid-svg-icons';
import { getData } from '../api';
import ResultsCard from './ResultsCard';
import Fade from 'react-reveal/Fade';
import Typography from '@material-ui/core/Typography';

const FuzzyMatching = require('fuzzy-matching');

const styles = {
  title: {
    fontFamily: "'Open Sans', sans-serif",
    margin: 'auto',
    textAlign: 'left',
    padding: '24px',
    paddingBottom: '8px',
    fontWeight: '700',
    color: '#22965E',
  },
  text: {
    fontSize: '1rem',
    fontFamily: "'Open Sans', sans-serif",
    padding: '24px',
  },
  headerContainer: {
    backgroundColor: 'white'
  }
};

const theme = createMuiTheme({
  palette: {
    type: 'light',
  },
});


class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      results: [],
      favorites: [],
      searchClicked: false,

    };

    this.fetchResults = this.fetchResults.bind(this);
    this.setFavorite = this.setFavorite.bind(this);
  }

  componentDidMount() {
    getData().then(data => {
      this.setState({data});
    })

  }

  async fetchResults() {
    this.setState({results: [], searchClicked: true}, () => {
      let key = document.getElementById('searchBar').value.trim().toLowerCase();
      this.state.data.forEach(entry => {
        if (!(this.state.results.indexOf(entry) + 1)) {
          let keywords = entry.keywords.split(',');
          let fmKeyWords = new FuzzyMatching(keywords);
          let catSplit = entry.category.split(' ');
          let titleSplit = entry.title.split(' ');
          let fmCatKeys = new FuzzyMatching(catSplit);
          let fmTitleKeys = new FuzzyMatching(titleSplit);
          if (fmCatKeys.get(key, { maxChanges: 2 }).value || fmTitleKeys.get(key, { maxChanges: 2 }).value) {
            this.state.results.push(entry);
          } else {
            let match = fmKeyWords.get(key, { maxChanges: 3 }).value;
            if (match) {
              this.state.results.push(entry);
            }
          }
        }
      })
    });
  }

  setFavorite(entry) {
    let favIndex = this.state.favorites.indexOf(entry);
    if (favIndex >= 0) {
      this.state.favorites.splice(favIndex, 1);
    } else {
      this.state.favorites.push(entry);
    }
    this.forceUpdate();
  }

  render() {
    const {classes} = this.props;
    return (
      <MuiThemeProvider theme={theme}>
        <div className='container'>
          <div className='banner'>
            <div style={{ textAlign: 'center', width: '100%'}}>Toronto Waste Lookup</div>
          </div>

          <section className='searchContainer'>
            <Grid container spacing={40}>
              <Grid item xs={8} md={11}>
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
                        this.forceUpdate();
                      }
                    }}
                  />
              </Grid>

              <Grid item xs={4} md={1}>
                <div className='searchIcon pointer' onClick={async () => {
                    await this.fetchResults();
                    this.forceUpdate();
                  }}>
                  <FontAwesomeIcon icon={faSearch} size='lg' className='magIcon'/>
                </div>
              </Grid>
            </Grid>

          </section>

          <section >
            {this.state.results.length ?
              (<div className='cardContainer'>
                {this.state.results.map(result => {
                  return(
                    <Fade bottom>
                      <ResultsCard data={result} page={this} setFavorite={this.setFavorite} favorite={(this.state.favorites.indexOf(result) >= 0)}/>
                    </Fade>
                  )
                })}
              </div>)

              :
              <div style={{
                  height: '50vh',
                  width: '100%',
                  alignItems: 'center',
                  alignContent: 'center',
                  fontSize: '2rem',
                  textAlign: 'center',
                  fontfamily: "'Open Sans', sans-serif",
                }}
              >
              <span style={{
                  textAlign: 'center',
                  margin: 'auto',
                  fontWeight: '700',
                }}>
                {this.state.searchClicked ? 'No Results Found' : ''}
              </span>
            </div>
            }
          </section>

          <div className='favoritesSection'>
            <Grid container spacing={24}>
              <Grid item xs={12} className={classes.headerContainer}>
                <Typography variant='h4' className={classes.title}>
                  Favorites
                </Typography>
              </Grid>
              {
                this.state.favorites.length
                ?
                this.state.favorites.map(fav => {
                  return(
                    <Grid item xs={12}>
                      <ResultsCard data={fav} page={this} setFavorite={this.setFavorite} favorite={(this.state.favorites.indexOf(fav) >= 0)}/>
                    </Grid>
                )
                })
                :
                (<Grid item xs={12}>
                  <Typography variant='h5' className={classes.text}>
                    Click the <FontAwesomeIcon icon={faStar} size='1x' className='nonFavorite'/> next to the search results to save them to your favorites list.
                  </Typography>
                </Grid>)
              }
            </Grid>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(styles)(Search);
