import { makeObservable, observable } from 'mobx';

export default class CounterStore {
    tittle = 'Counter store';
    count = 0;

    construct() {
        makeObservable(this, {
            tittle: observable,
            count: observable
        })
    }
}