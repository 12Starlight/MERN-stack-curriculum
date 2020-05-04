import React from 'react';
import TweetBox from '../tweets/tweet_box';


class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tweets: []
    }
  }

  componentWillMount() {
    console.log(this.props.currentUser.id)
    this.props.fetchUserTweets(this.props.currentUser.id);
  }

  componentWillReceiveProps(newState) {
    this.setState({
      tweets: newState.tweets
    });
  }


  render() {
    debugger; 
    if (this.state.tweets.length === 0) {
      return (<div>This usesr has no Tweets</div>)
    } else {
      return (
        <div>
          <h2>All of this user's Tweets</h2>
          {this.state.tweets.map(tweet => (
            <TweetBox key={tweet._id} text={tweet.text} />
          ))}
        </div>
      );
    }
  }
}


export default Profile; 