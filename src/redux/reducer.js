import { CREATE, GET_ALL, MODIFY, DELETE, GET_ONE, THEME } from "../constants";

const initialState = {
  all: [],
  one: {},
  new: {},
  modify: {},
  delete: {},
  day: true,
};

export default function reducer(state = initialState, { type, payload }) {
  state = initialState;
  switch (type) {
    /*-------------- GET --------------*/

    case GET_ALL:
      return {
        ...initialState,
        all: payload,
      };

    case GET_ONE:
      const one = state.all.filter((e) => e.id === payload);
      return {
        one: one,
      };

    /*-------------- MODIFY --------------*/

    case MODIFY:
      return {
        ...state,
        modify: payload,
      };

    /*-------------- CREATE --------------*/

    case CREATE:
      return {
        ...state,
        new: payload,
      };

    /*-------------- DELETE --------------*/

    case DELETE:
      return {
        ...state,
        delete: payload,
      };

    /*-------------- THEME --------------*/

    case THEME:
      return {
        ...state,
        day: !state.day,
      };

    /*-------------- DEFAULT --------------*/

    default:
      return initialState.all;
  }
}
