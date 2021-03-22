import { Component } from 'react';
import { CoinListState, Coin as CoinType} from '../types';
import { observer } from 'mobx-react';
import { MainStoreInstance } from '../mainStore';
import {Coin} from './coin';
import _ from 'lodash';

@observer
export class CoinList extends Component<{}, CoinListState> {
    private intervalID: NodeJS.Timeout | null = null;
    constructor(props: any) {
        super(props);
        this.state = {
            list: [],
            error: null
        };
        this.updateCoins = this.updateCoins.bind(this);
    }

    componentDidMount() {
        this.updateCoins();
        this.intervalID = setInterval(this.updateCoins, 3000);
    }

    componentWillUnmount(){
        clearInterval(this.intervalID!);
    }

    componentDidCatch(error: any){
        this.setState({
            error: error
        });
    }

    private updateCoins() {
        this.getCoins().then((coins) => {
            this.setState({
                ...this.state,
                list: coins
            });
        });
    }

    private getCoins() {
        return fetch(
            `https://tstapi.cryptorank.io/v0/coins?limit=${MainStoreInstance.count || 10}`
        ).then((data) => {
            return data.json().then((data) => data.data);
        });
    }

    private coinSorting(): CoinType[]{
        this.state.list.sort((c1: CoinType, c2: CoinType) => {
            if(c1[MainStoreInstance.sorting] > c2[MainStoreInstance.sorting]) return 1;
            else if (c1[MainStoreInstance.sorting] < c2[MainStoreInstance.sorting]) return -1;
            return 0;
        });
        return this.state.list;
    }

    render() {
        return (
          <div className="list">
            {this.coinSorting().map((c: CoinType, idx: number) => (
                <Coin key={`coin-${c.id}-${c.name}`} name={c.name} rank={c.rank} symbol={c.symbol} id={c.id} price={c.price} volume24h={c.volume24h} icon={c.icon}/>
            ))}
          </div>
        );
    }
}
