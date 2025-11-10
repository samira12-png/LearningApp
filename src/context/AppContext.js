import { createContext, useContext, useReducer, useEffect } from 'react';
import { reducer, initialState, actionTypes } from './reducer.js';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Load from localStorage on mount
  useEffect(() => {
    const user = localStorage.getItem('user');
    const quizScore = localStorage.getItem('quizScore');
    if (user) dispatch({ type: actionTypes.LOGIN_USER, payload: user });
    if (quizScore) dispatch({ type: actionTypes.SET_SCORE, payload: parseInt(quizScore) });
  }, []);

  // Save to localStorage on state change
  useEffect(() => {
    if (state.user) localStorage.setItem('user', state.user);
    else localStorage.removeItem('user');
    localStorage.setItem('quizScore', state.quizScore);
  }, [state.user, state.quizScore]);

  const loginUser = (email) => {
    dispatch({ type: actionTypes.LOGIN_USER, payload: email });
  };

  const logoutUser = () => {
    dispatch({ type: actionTypes.LOGOUT_USER });
  };

  const setCourses = (courses) => {
    dispatch({ type: actionTypes.SET_COURSES, payload: courses });
  };

  const setQuizScore = (score) => {
    dispatch({ type: actionTypes.SET_SCORE, payload: score });
  };

  return (
    <AppContext.Provider value={{ state, loginUser, logoutUser, setCourses, setQuizScore }}>
      {children}
    </AppContext.Provider>
  );
};