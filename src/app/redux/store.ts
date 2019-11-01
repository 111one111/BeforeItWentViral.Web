import { LOGIN, LOGOUT, LOADFONTS, SELECTEDPLAN,  } from './app.actions';
import { AuthResponse } from '../interfaces/auth-response.interface';
import { DictionaryKeyValue } from '../interfaces/dictionary-key-value.interface';
//import { PlanDetails } from '../interfaces/plan-details.interface';

/**
 * Define the shape of global storage.
 */
export interface IAppState {
  loggedIn: boolean;
  loggedInUser: AuthResponse;
  fonts: DictionaryKeyValue[];
  //selectedPlan: PlanDetails;
}

/**
 * intialize the state so it isnt null.
 */
export const INITIAL_STATE: IAppState = {
    loggedIn: false,
    loggedInUser: { id: 0, auth_token: '', expires_in: null },
    fonts: null,
    //selectedPlan: null,
};

/**
 * Typical reducer for app state, updates the global store with supplied data.
 * @param state the store where all info is held.
 * @param action contains thetype and the payload.
 */
export function rootReducer(state: IAppState, action): IAppState {
    switch (action.type) {
        case LOGIN:
            return Object.assign({}, state, {loggedIn: true, loggedInUser: action.data});
        case LOGOUT:
            return Object.assign({}, state, {loggedIn: false, loggedInUser: null});
        case LOADFONTS:
            return Object.assign({}, state, {fonts: action.data});
     //   case SELECTEDPLAN:
     //       return Object.assign({}, state, {selectedPlan: action.data});
        default:
            return state;
    }
}
