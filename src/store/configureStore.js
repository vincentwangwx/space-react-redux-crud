import {createStore,applyMiddleware} from 'redux';
import rootReducer from '../reducers';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';
 
export default function configureStore(initiallState){
    return createStore(
        rootReducer,
        initiallState,
        applyMiddleware(thunk,reduxImmutableStateInvariant())
    );
} 