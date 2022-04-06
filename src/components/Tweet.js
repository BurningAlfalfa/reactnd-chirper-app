import React, { Component } from "react";
import { connect } from "react-redux";
import { formatDate, formatTweet } from "../utils/helpers";
/*import TiArrowBackOutline from "react-icons/lib/ti/arrow-back-outline";
import TiHeartOutline from "react-icons/lib/ti/heart-outline";
import TiHeartFullOutline from "react-icons/lib/ti/heart-full-outline";
*/
import { AiFillHeart } from "react-icons/ai";
import { AiOutlineHeart } from "react-icons/ai";
import { BsReply } from "react-icons/bs";
import { handleInitalData } from "../actions/shared";
import { handleToggleTweet } from "../actions/tweets";
class Tweet extends Component {
  handleLike = (e) => {
    e.preventDefault();
    const { dispatch, tweet, authedUser } = this.props;
    dispatch(
      handleToggleTweet({
        id: tweet.id,
        hasLiked: tweet.hasLiked,
        authedUser,
      })
    );
  };
  toParent = (e, id) => {
    e.preventDefault();
    //redirect to parent
  };
  render() {
    const { tweet } = this.props;
    if (tweet === null) {
      return <p>This Tweet doesn't exist</p>;
    }
    const {
      name,
      avatar,
      timestamp,
      text,
      hasLiked,
      likes,
      replies,
      id,
      parent,
    } = tweet;

    return (
      <div>
        <div className="tweet">
          <div>
            <img src={avatar} alt={"Avatar of ${name}"} className="avatar" />
          </div>
          <div className="tweet-info">
            <span>{name}</span>
            <div>{formatDate(timestamp)}</div>
            {parent && (
              <button
                className="replying-to"
                onClick={(e) => this.toParent(e, parent, id)}
              >
                Replying to @{parent.author}
              </button>
            )}
            <p>{text}</p>
          </div>
          <div className="tweet-icons">
            <BsReply className="tweet-icon" />
            <span>{replies !== 0 && replies}</span>
            <button className="heart-button" onClick={this.handleLike}>
              {hasLiked === true ? (
                <AiFillHeart color="#e0245e" className="tweet-icon" />
              ) : (
                <AiOutlineHeart className="tweet-icon" />
              )}
            </button>
            <span>{likes !== 0 && likes}</span>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ authedUser, users, tweets }, { id }) {
  const tweet = tweets[id];
  const parentTweet = tweet ? tweets[tweet.replyingTo] : null;
  return {
    authedUser,
    tweet: tweet
      ? formatTweet(tweet, users[tweet.author], authedUser, parentTweet)
      : null,
  };
}

export default connect(mapStateToProps)(Tweet);
