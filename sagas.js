import {delay} from 'redux-saga'
import {all, put, takeEvery} from 'redux-saga/effects'

export function* helloSaga() {
    console.log("I'm a saga, hi");
}

export function* incrementAsync() {
    yield delay(1000);
    yield put({type: 'INCREMENT'})
}

export function* watchIncrementAsync() {
    let {done, value} = yield takeEvery('INCREMENT_ASYNC', incrementAsync);
}

export default function* rootSaga() {
    const [one, two] = yield all([
        helloSaga(),
        watchIncrementAsync()
    ]);
}