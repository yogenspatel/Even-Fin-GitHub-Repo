/* eslint-disable no-case-declarations */
import { PAGINATED_DATA } from "../actions";

export default (state = null, action) => {
  switch (action.type) {
    case PAGINATED_DATA:
      const { payload, noOfitems, pageSize } = action;
      return { ...state, paginated_data: payload, noOfitems, pageSize };
    default:
      return state;
  }
};
