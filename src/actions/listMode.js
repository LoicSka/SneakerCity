export const TOGGLE_LIST_DISPLAY_MODE = 'TOGGLE_LIST_DISPLAY_MODE';

export const toggleListDisplayMode = () => (dispatch, getState) => {
  const{ listDisplayMode }  = getState();
  dispatch({
    type: TOGGLE_LIST_DISPLAY_MODE,
    data: listDisplayMode === 'grid' ? 'list' : 'grid'
  })
}