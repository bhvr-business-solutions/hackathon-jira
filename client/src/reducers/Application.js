import { RECEIVE_DATA } from '../actions/Application';

const initialState = {
  totalIssues: 0,
  totalScores: 0,
  completedIssues: 0,
  completedScores: 0,
  topUsers: []
}

export function Application(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_DATA: return action.data;
    default: return state;
  }
}