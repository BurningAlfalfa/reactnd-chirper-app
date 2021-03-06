import { receiveUsers } from "../actions/users";
import { receiveTweets } from "../actions/tweets";
import { getInitialData } from "../utils/api";
import { setAuthedUser } from "../actions/authedUser";
import { showLoading, hideLoading } from "react-redux-loading";
const AUTHED_ID = "tylermcginns";

export function handleInitalData() {
  return (dispatch) => {
    dispatch(showLoading);
    return getInitialData().then(({ users, tweets }) => {
      dispatch(receiveUsers(users));
      dispatch(receiveTweets(tweets));
      dispatch(setAuthedUser(AUTHED_ID));
      dispatch(hideLoading());
    });
  };
}
