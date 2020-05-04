import axios from 'axios';


export const getTweets = () => {
  return axios.get('/tweets')
};

export const getUserTweets = (id) => {
  return axios.get(`/api/tweets/user/${id}`)
};

export const writeTweet = (data) => {
  return axios.post('/api/tweets/', data)
};
