// Import Local Directory Files
import { getTweets, getUserTweets, writeTweet } from '../util/tweet_api_util';

// Constants
export const RECEIVE_TWEETS = 'RECEIVE_TWEETS';
export const RECEIVE_USER_TWEETS = 'RECEIEVE_USER_TWEETS';
export const RECEIVE_NEW_TWEET = 'RECEIVE_NEW_TWEET';


// Build Regular Actions
export const receiveTweets = (tweets) => ({
  type: RECEIVE_TWEETS,
  tweets 
});

export const receiveUserTweets = (tweets) => ({
  type: RECEIVE_USER_TWEETS,
  tweets
});

export const receiveNewTweet = (tweet) => ({
  type: RECEIVE_NEW_TWEET,
  tweet
});

// Build Thunk Action Creators
export const fetchTweets = () => (dispatch) => (
  getTweets()
    .then(tweets => dispatch(receiveTweets(tweets)))
    .catch(err => console.log(err))
);

export const fetchUserTweets = (id) => (dispatch) => (
  getUserTweets(id)
    .then(tweets => dispatch(receiveUserTweets(tweets)))
    .catch(err => console.log(err))
);

export const composeTweet = (data) => (dispatch) => (
  writeTweet(data)
    .then(tweet => dispatch(receiveNewTweet(tweet)))
    .catch(err => console.log(err))
);

