import React from "react";
import { Coin as CoinType } from "../types";
import _ from "lodash";
import { MainStoreInstance } from "../mainStore";
import { observer } from "mobx-react";

@observer
export class Coin extends React.Component<CoinType, {selected: boolean}>{
    constructor(props: any){
      super(props);
      this.state = {
        selected: false
      }
    }
    render(){
      return(
        <div
        className={"item " + (this.state.selected ? "selected" : "")}
        onClick={() => {
          !this.state.selected?MainStoreInstance.addCoin(this.props.name):MainStoreInstance.removeCoin(this.props.name);
          this.setState({selected: !this.state.selected});
        }}
      >
        <div className="rank">{this.props.rank}</div>
        <div className="name">
          <img src={this.props.icon} alt="" />
          {this.props.name} [{this.props.symbol}]
        </div>
        <div className="price">Price: {this.props.price.USD.toFixed(2)}$</div>
        <div className="vol">
          Vol:{" "}
          {_.chain(this.props.volume24h * this.props.price.USD)
            .toInteger()
            .split("")
            .reverse()
            .chunk(3)
            .map((ch) => ch.reverse().join(""))
            .reverse()
            .join(",")
            .value()}
          $
        </div>
      </div>
      )
    }
}