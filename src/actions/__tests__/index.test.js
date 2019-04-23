/* eslint-disable no-undef */
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import {
  SORT_DATA,
  SortBy,
  SearchData,
  SEARCH_DATA,
  toggleGreenColor,
  TOGGLE_CLASS,
  SET_LOADING_STATUS,
  LOADING_STATUS,
  getUserData,
  GET_TODO_DATA
} from "../../actions";

// Set up mock middleware and store
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const data = [
  {
    id: 2,
    title: "this is test"
  },
  {
    id: 1,
    title: "delectus aut autem"
  },
  {
    id: 3,
    title: "quis ut nam facilis et officia qui"
  },
  {
    id: 4,
    title: "quo laboriosam deleniti aut qui"
  }
];

describe("Sort By is working", () => {
  it("sort by id is working asc order", () => {
    // The expected actions to receive.
    const keyToSort = "id";
    const order = "asc";
    const expectedPayload = [
      {
        id: 1,
        title: "delectus aut autem"
      },
      {
        id: 2,
        title: "this is test"
      },
      {
        id: 3,
        title: "quis ut nam facilis et officia qui"
      },
      {
        id: 4,
        title: "quo laboriosam deleniti aut qui"
      }
    ];
    const expectedAction = {
      type: SORT_DATA,
      sort_data: expectedPayload
    };

    expect(SortBy(keyToSort, data, order)).toEqual(expectedAction);
  });

  it("sort by id is working desc order", () => {
    // The expected actions to receive.
    const keyToSort = "id";
    const order = "dec";
    const expectedPayload = [
      {
        id: 4,
        title: "quo laboriosam deleniti aut qui"
      },
      {
        id: 3,
        title: "quis ut nam facilis et officia qui"
      },
      {
        id: 2,
        title: "this is test"
      },
      {
        id: 1,
        title: "delectus aut autem"
      }
    ];
    const expectedAction = {
      type: SORT_DATA,
      sort_data: expectedPayload
    };

    expect(SortBy(keyToSort, data, order)).toEqual(expectedAction);
  });

  it("sort by title is working asc order", () => {
    // The expected actions to receive.
    const keyToSort = "title";
    const order = "asc";
    const expectedPayload = [
      {
        id: 1,
        title: "delectus aut autem"
      },
      {
        id: 3,
        title: "quis ut nam facilis et officia qui"
      },
      {
        id: 4,
        title: "quo laboriosam deleniti aut qui"
      },
      {
        id: 2,
        title: "this is test"
      }
    ];
    const expectedAction = {
      type: SORT_DATA,
      sort_data: expectedPayload
    };

    expect(SortBy(keyToSort, data, order)).toEqual(expectedAction);
  });

  it("sort by title is working dec order", () => {
    // The expected actions to receive.
    const keyToSort = "title";
    const order = "dec";
    const expectedPayload = [
      {
        id: 2,
        title: "this is test"
      },
      {
        id: 4,
        title: "quo laboriosam deleniti aut qui"
      },
      {
        id: 3,
        title: "quis ut nam facilis et officia qui"
      },
      {
        id: 1,
        title: "delectus aut autem"
      }
    ];
    const expectedAction = {
      type: SORT_DATA,
      sort_data: expectedPayload
    };

    expect(SortBy(keyToSort, data, order)).toEqual(expectedAction);
  });
});

describe("Search is working", () => {
  it("search is working. searching title: test", () => {
    // The expected actions to receive.
    const dataToSearch = "test";
    const expectedPayload = [
      {
        id: 2,
        title: "this is test"
      }
    ];
    const expectedAction = {
      type: SEARCH_DATA,
      search_data: expectedPayload
    };

    expect(SearchData(dataToSearch, data)).toEqual(expectedAction);
  });

  it("search is working. searching title: test", () => {
    // The expected actions to receive.
    const dataToSearch = "delectus";
    const expectedPayload = [
      {
        id: 1,
        title: "delectus aut autem"
      }
    ];
    const expectedAction = {
      type: SEARCH_DATA,
      search_data: expectedPayload
    };

    expect(SearchData(dataToSearch, data)).toEqual(expectedAction);
  });

  it("search is working. searching title: dele", () => {
    // The expected actions to receive.
    const dataToSearch = "dele";
    const expectedPayload = [
      {
        id: 4,
        title: "quo laboriosam deleniti aut qui"
      },
      {
        id: 1,
        title: "delectus aut autem"
      }
    ];
    const expectedAction = {
      type: SEARCH_DATA,
      search_data: expectedPayload
    };

    expect(SearchData(dataToSearch, data)).toEqual(expectedAction);
  });
});
describe("Toggle class", () => {
  it("toggle to green is working", () => {
    // The expected actions to receive.
    const className = "red";
    const expectedAction = {
      type: TOGGLE_CLASS,
      className
    };

    expect(toggleGreenColor(className)).toEqual(expectedAction);
  });
});

/* it("creates actions, and stores get user data", () => {
  const recArray = data.map(id => ({ id }));
  const mockGetUserData = jest.fn().mockReturnValue(Promise.resolve(recArray));
  // The expected actions to receive.
  const expectedActions = [
    {
      type: SET_LOADING_STATUS,
      status: LOADING_STATUS.IN_PROGRESS
    },
    {
      type: SET_LOADING_STATUS,
      status: LOADING_STATUS.COMPLETE
    },
    {
      type: GET_TODO_DATA,
      payload: data
    }
  ];
  const store = mockStore({});
  expect.assertions(1);
  return store.dispatch(getUserData()).then(() => {
    // expect(mockGetUserData).toBeCalled();
    const actions = store.getActions();
    expect(actions).toEqual(expectedActions);
  });
});
*/
