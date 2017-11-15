function updateState(state, action) {
    if(action.type==='INCREMENT'){
        return state + action.amount;
    } else if(action.type==='DECREMENT'){
        return state - action.amount;
    } else {
        return state;
    }
}

class Store {
    constructor(updateState,state){
        this._state=state;
        this._updateState=updateState;
        this._callbacks=[];
    }

    get state() {
        return this._state;
    }

    update(action){
        this._state= this._updateState(this._state,action);
        this._callbacks.forEach(callback=>callback());
    }

    subscrube(callback){
        this._callbacks.push(callback);
        return ()=> this._callbacks=this._callbacks.filter(cb => cb !==callback);
    }
}

const store = new Store(updateState,0);

const incrementAction = {type: 'INCREMENT', amount: 5};
const decrementAction = {type: 'DECREMENT', amount: 3};

const unsubscribe=store.subscrube(()=>console.log(`Store changed ${store.state}`));

store.update(incrementAction);
unsubscribe();
store.update(decrementAction);
store.update({});
