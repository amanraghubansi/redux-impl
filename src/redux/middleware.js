export const setTimeoutMiddleware = ({getState,dispatch}) => next => action =>{
    setTimeout(function(){
        console.log('before action setTimeoutMiddleware',getState(),action);
        next(action);
        console.log('after action setTimeoutMiddleware',getState(),action);
    },100);
}

export const setTimeoutMiddleware2 = ({getState,dispatch}) => next => action =>{
    setTimeout(function(){
        console.log('before action setTimeoutMiddleware2',getState(),action);
        next(action);
        console.log('after action setTimeoutMiddleware2',getState(),action);
    },200);
}

export const loggingMiddleware = ({getState,dispatch}) => next => action =>{
    console.log('before action loggingMiddleware',getState(),action);
    next(action);
    console.log('after action loggingMiddleware',getState());
}

export const thunkMiddleware = ({getState,dispatch}) => next => action =>{
    if(typeof action === 'function'){
        return action(getState,dispatch);
    }else{
        next(action);
    }
}

