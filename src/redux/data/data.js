import {getQuestions} from "../../clients/data.js";

const initialState = {
  questions: [],
};

const ActionType = {
  LOAD_QUESTIONS: `LOAD_QUESTIONS`,
};

const ActionCreator = {
  loadQuestions: (questions) => {
    return {
      type: ActionType.LOAD_QUESTIONS,
      payload: questions,
    };
  },
};

const Operation = {
  loadQuestions: () => (dispatch, getState, api) => {
    return getQuestions(api)

      .then((response) => {
        dispatch(ActionCreator.loadQuestions(response.data));
      });
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_QUESTIONS:
      return Object.assign(state, {
        questions: action.payload.slice(0, 2),
      });
    default:
      return state;
  }
};

export {reducer, Operation, ActionType, ActionCreator};
