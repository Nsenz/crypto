import React, {useContext} from "react";
import { makeAutoObservable } from "mobx";
import { Coin } from "./types";
  
class MainStore{
    sorting: string = "rank";
    count: string = "10";
    private selectedCoins: string[] = [];
    constructor(){
        makeAutoObservable(this);
    };
    getCoins(): string[]{
        return this.selectedCoins;
    }
    addCoin(coin: Coin["name"]): void{
        if(!this.selectedCoins.find(c=>c==coin)) this.selectedCoins.push(coin);
    }
    removeCoin(coin: Coin["name"]): void{
        this.selectedCoins = this.selectedCoins.filter(c => c !== coin);
    }
};

const MainStoreInstance = new MainStore();

const MainStoreContext = React.createContext<MainStore>(MainStoreInstance);

const MainStoreProvider: React.FC<{store: MainStore}> = ({store, children}) => {
    return (
        <MainStoreContext.Provider value={store}>
            {children}
        </MainStoreContext.Provider>
    )
};

const useMainStore = () => {
    return useContext(MainStoreContext);
};

export {MainStoreInstance, useMainStore, MainStoreProvider};
