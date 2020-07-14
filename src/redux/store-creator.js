// import noteReducer,{CREATE_NOTE} from './note-reducer';

function validateAction(action){
    if(!(action && action.type)){
        throw new Error('Action should be valid');
    }
}

export function createStore(reducer){
    let state;
    let subscribers=[];
    let core_dispatch = function(action){
        validateAction(action);
        state = reducer(state,action);
        subscribers.forEach(cb=> cb());
    }

    const store = {
        getState : () => state,
        dispatch : core_dispatch,
        subscribe : (cb)=>{
            if(typeof cb === 'function'){
                subscribers.push(cb);
                return ()=>{
                    let ind = subscribers.indexOf(cb);
                    if(ind  !== -1){
                        subscribers.splice(ind,1);
                    }
                }
            }
        }
    }
    store.dispatch({type :'INIT STORE'});
    return store;
}



// const store = createStore(noteReducer);
// store.dispatch(CREATE_NOTE);



