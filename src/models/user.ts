import {ApiGetUserInfoFunction} from '@/services';

export interface userModelStateProps {
    currentUser: FRID.CurrentUser | undefined
}

const userModelState: userModelStateProps = {
    currentUser: undefined
};
export default {
    namespace: 'user',
    state: userModelState,
    effects: {
        * fetchCurrentUser({payload}: any, {call, put}: any) {
             const {data, err}: FRID.Generator = yield call(ApiGetUserInfoFunction, payload);
            if (err) return;
            yield put({
                type: 'updateCurrentUser',
                payload: data
            });
        },
    },
    reducers: {
        updateCurrentUser(state: any, action: any) {
            return {
                ...state, currentUser: action.payload
            };
        }
    }
};