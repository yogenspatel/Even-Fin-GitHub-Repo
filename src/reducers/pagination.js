/* eslint-disable no-case-declarations */
import { PAGINATED_DATA } from "../actions";

export default (state = null, action) => {
  switch (action.type) {
    case PAGINATED_DATA:
      const { payload, noOfItems, pageSize, searchData } = action;
      return { ...state, paginated_data: payload, noOfItems, pageSize, searchData };
    default:
      return state;
  }
};
