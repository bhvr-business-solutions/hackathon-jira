export const RECEIVE_DATA = 'RECEIVE_DATA';

export function getData() {
  return async (dispatch) => {
    const result = await fetch('/api');
    return dispatch({
      type: RECEIVE_DATA,
      data: await result.json()
    });
  };
}
