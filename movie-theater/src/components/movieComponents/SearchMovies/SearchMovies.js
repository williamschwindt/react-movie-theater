import React, { useEffect } from 'react';
import NavBar from '../../navbar/NavBar';
import { Footer } from '../../Footer/Footer';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getSearchMovies } from '../../../actions/movieActions/getSearchMovies';
import { getMovieConfig } from '../../../actions/movieActions/getMovieConfig';

const SearchMovies = (props) => {
    const { getSearchMovies } = props;
    const { getMovieConfig } = props;
    const { query } = props.match.params;
    const { movies } = props;
    const { config } = props;
    const { isFetching } = props;
    const { error } = props;

    useEffect(() => {
        getSearchMovies(query);
        getMovieConfig();
    }, [query, getSearchMovies, getMovieConfig])
    if (isFetching === 'fetched') {
        return (
            <div className="discover">
                    <NavBar />
                    <h1 id="search-title">Search Results for "{query}"</h1>
                    <div className="discover-movies">
                        {movies.map(movie => {
                            return(
                                <Link to={`/movie/${movie.id}`}key={movie.id} className="discover-movie">
                                    <img src={`${config}w200${movie.poster_path}`} alt={movie.title} />
                                </Link>
                            )
                        })}
                    </div>
                    <Footer />
                </div>
        )
    }

    if (error !== '') {
        return (
            <div style={{height: '94vh'}}>
                <h1>There was a problem loading this page</h1>
            </div>
        )
    }

    return (
        <div style={{height: '94vh'}}>
            <div className="lds-ring">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        movies: state.searchMoviesReducer.movies,
        isFetching: state.searchMoviesReducer.isFetching,
        error: state.searchMoviesReducer.error,

        config: state.movieConfigReducer.config
    }
}

export default connect(mapStateToProps, {getSearchMovies, getMovieConfig})(SearchMovies);