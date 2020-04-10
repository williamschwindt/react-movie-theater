import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getMovieDetails } from '../../../actions/movieActions/getMovieDetails';
import { getMovieConfig } from '../../../actions/movieActions/getMovieConfig';
import { getMovieCast } from '../../../actions/movieActions/getMovieCast';
import { getMovieReview } from '../../../actions/movieActions/getMovieReview';
import { ActorCarousel } from '../ActorCarousel/ActorCarousel';

const Movie = (props) => {
    const { id } = props.match.params;
    const { getMovieDetails } = props;
    const { getMovieConfig } = props;
    const { getMovieCast } = props;
    const { getMovieReview } = props;
    const { config } = props;
    const { details } = props;
    const { cast } = props;
    const { reviews } = props;
    console.log(reviews);

    useEffect(() => {
        getMovieDetails(id);
        getMovieConfig();
        getMovieCast(id);
        getMovieReview(id);
    }, [getMovieDetails, id, getMovieConfig, getMovieCast ,getMovieReview])

    const viewSummary = () => {
        document.querySelector('.summary-container').classList.toggle('view');
    }

    const shortendText = (text, maxLength) => {
        if(text.length > maxLength) {
            text = text.substr(0,maxLength) + '...';
        }
        return text;
    }

    const goBack = () => {
        props.history.goBack();
    }

    if(props.isFetchingMovieDetails === 'fetched' && props.isFetchingMovieCast === 'fetched' && props.isFetchingMovieReviews === 'fetched' && config !== '' && props.errorMovieDetails === '') {
        let movieCast = cast.splice(0, 5);

        return(
            <div className="movie">
                <a onClick={goBack} className="m-back"><ion-icon name="ios-arrow-back"/></a>
                <div className="movie-background" style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 9)), url(${config}w1280${details.backdrop_path})`}}></div> 
                <div className="movie-details">
                    <h1>{details.title}</h1>
                    <div className="info-box">
                        <p className="rating">{details.vote_average}</p>
                        <div className="genres">
                            {details.genres.map(genre => {
                                return (
                                    <p key={genre.id}>{genre.name}</p>
                                )
                            })}
                        </div>
                        <p className="runtime">{details.runtime} minutes</p>
                    </div>
                    <button onClick={viewSummary} className="view-summary"><p>Summary</p></button>
                </div>
                <div className="summary-container">
                    <p>{details.overview}</p>
                </div>
                <h2>Cast</h2>
                <ActorCarousel config={config} movieCast={movieCast}/>
                <div className="reviews">
                    <h2>Reviews</h2>
                    {reviews.map(review => {
                        return (
                            <div key={review.id} className="review">
                                <h3>{review.author}</h3>
                                <p>{shortendText(review.content, 400)}</p>
                                <a href={review.url}>See Full Review</a>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }

    return(
        <h1>waiting</h1>
    )
}

const mapStateToProps = state => {
    return {
        details: state.movieDetailsRuducer.details,
        isFetchingMovieDetails: state.movieDetailsRuducer.isFetching,
        errorMovieDetails: state.movieDetailsRuducer.error,

        cast : state.movieCastReducer.cast,
        isFetchingMovieCast: state.movieCastReducer.isFetching,
        errorMovieCast: state.movieCastReducer.error,

        reviews: state.movieReviewReducer.reviews,
        isFetchingMovieReviews: state.movieReviewReducer.isFetching,
        errorMovieReviews: state.movieReviewReducer.error,

        config: state.movieConfigReducer.config
    }
}

export default connect(mapStateToProps, {getMovieDetails, getMovieConfig, getMovieCast, getMovieReview})(Movie);