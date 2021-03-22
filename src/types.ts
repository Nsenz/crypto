export type SelectorProps = {
    name: string;
    field: 'sorting' | 'count';
}

export type State = {
    [key: string]: any;
}

export type Coin = {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    [key: string]: any;
};

export interface CoinListState {
    list: Coin[];
    error: any;
};