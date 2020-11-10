/**
 * Created by paul on 21/05/2020.
 */



//todo think about it may be look for better solution
export const bindActionCreators = (actions, dispatch) => {
  return Object.keys(actions).reduce((acc, key) => {
    acc[key] = (...params) => dispatch(actions[key](...params));
    return acc;
  }, {})
};