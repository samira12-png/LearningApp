export const initialState = {
  user: null,
  courses: [],
  quizScore: 0
};

export const actionTypes = {
  LOGIN_USER: 'LOGIN_USER',
  LOGOUT_USER: 'LOGOUT_USER',
  SET_COURSES: 'SET_COURSES',
  SET_SCORE: 'SET_SCORE'
};

export const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_USER:
      return { ...state, user: action.payload };
    case actionTypes.LOGOUT_USER:
      return { ...state, user: null, quizScore: 0 };
    case actionTypes.SET_COURSES:
      return { ...state, courses: action.payload };
    case actionTypes.SET_SCORE:
      return { ...state, quizScore: action.payload };
    default:
      return state;
  }
};