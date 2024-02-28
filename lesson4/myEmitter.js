class MyEmitter{
    listeners = {
        "event":[() =>{}, ()=>{}]
    }

    on(name, lister){
        this.listeners[name] = [].push(lister)
    }
    emit(name){
        this.listeners[name].forEach(l => l());
    }
}
