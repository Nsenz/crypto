import {Component} from 'react';
import {MainStoreProvider, MainStoreInstance} from './mainStore';
import {SelectorContainer} from './components/selectorContainer';
import {CoinList} from './components/coinList';
import './styles.css';
import { observer } from 'mobx-react-lite';

const SelectedCoins: React.FC = observer(()=>{
    return(
      <div>
        {MainStoreInstance.getCoins().map(coin=>{
          return <div key={coin+new Date()}>{coin}</div>
        })}
      </div>
    )
});

export default class App extends Component {
    render(){
        return(
          <div className="App">
            <MainStoreProvider store={MainStoreInstance}>
              <SelectorContainer name="Sorting" field="sorting">
                <option value="name">Name</option>
                <option value="rank">Rank</option>
                <option value="volume24h">Volume</option>
                <option value="priceUsd">Price</option>
                <option value="">No sorting</option>
              </SelectorContainer>
              <SelectorContainer name="Count" field="count">
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
              </SelectorContainer>
              <div>
                <SelectedCoins />
              </div>
              <br />
              <CoinList />
            </MainStoreProvider>
          </div>
        )
      }
}

