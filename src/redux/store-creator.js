// import noteReducer,{CREATE_NOTE} from './note-reducer';

function validateAction(action){
    if(!(action && action.type)){
        throw new Error('Action should be valid');
    }
}

export function createStore(reducer,middleware){
    let state;
    let subscribers=[];
    let core_dispatch = function(action){
        validateAction(action);
        state = reducer(state,action);
        subscribers.forEach(cb=> cb());
    }
    const getState = () => state;

    const store = {
        getState,
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
    if(middleware){
        const dispatch = (action) => core_dispatch(action);
        var ff1 = middleware({
            dispatch,
            getState
        });
        store.dispatch = ff1(core_dispatch);

        // store.dispatch = middleware({
        //         dispatch,
        //         getState
        //     })(core_dispatch);
    }
    core_dispatch({type :'INIT STORE'});
    return store;
}

export const applyMiddleware = (...middlewares) => {
    console.log("applyMiddleware before store vala func");
    return function(store){
        console.log("applyMiddleware inside store vala func", store);
        if(!middlewares.length){
            console.log("applyMiddleware single length");
            return dispatch => dispatch;
        }else if(middlewares.length === 1){
            return middlewares[0](store);
        }else{
            const boundedMiddlewares = middlewares.map((el)=>{
                return el(store);
            });
            return boundedMiddlewares.reduce((a,b)=>{
                return next => a(b(next));
            })
        }
    }
}


// export const applyMiddleware = (...middlewares) => store =>{
//      Here write logic.
//      if(!middlewares.length){
//     console.log("applyMiddleware single length");
//     return dispatch => dispatch;
// }else if(middlewares.length === 1){
//     return middlewares[0](store);
// }
// }



