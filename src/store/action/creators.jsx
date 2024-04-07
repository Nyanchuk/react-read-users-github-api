import { SET_MAX_REPO, SET_MIN_REPO } from "./types";

export const setMaxRepositories = (exists) => {
  return {
    type: SET_MAX_REPO,
    payload: exists,
  };
};

export const setMinRepositories = (exists) => {
    return {
      type: SET_MIN_REPO,
      payload: exists,
    };
  };
