import { FETCH_GROCERS } from './index';

const fetchGrocers = () => async (dispatch, getState, api) => {
  const { latitude, longitude, distance } = getState();
  const res = await api.get(
    `/api/grocers?long=${longitude || ''}&latt=${latitude || ''}&dist=${distance || ''}`,
  );

  dispatch({
    type: FETCH_GROCERS,
    payload: res,
  });
};

export default fetchGrocers;
