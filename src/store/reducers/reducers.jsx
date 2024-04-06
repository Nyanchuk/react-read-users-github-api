import { SET_MAX_REPO, SET_MIN_REPO } from "../action/types";

const initialState = {
  max_repositories: false, // Сортировка по возрастанию репозиториев
  min_repositories: false, // Сортировка по убыванию репозиториев
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    // По возрастанию репозиториев
    case SET_MAX_REPO:
      return {
        ...state,
        max_repositories: action.payload,
      };
    // По убыванию репозиториев
    case SET_MIN_REPO:
      return {
        ...state,
        min_repositories: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
