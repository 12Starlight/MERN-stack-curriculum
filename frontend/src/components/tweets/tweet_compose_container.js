import { connect } from 'react-reddux';
import { compoeseTweet } from '../../actions/tweet_actions';
import TweetCompose from './tweet_compose';


const mapStateToProps = (state) => {
  return {
    currentUser: state.sesssion.user,
    newTweet: state.tweets.new
  };
};

const mapDipatchToProps = (dispatch) => {
  return {
    compoeseTweet: data => dispatch(compoeseTweet(data))
  };
};


export default connect(mapStateToProps, mapDipatchToProps)(TweetCompose); 