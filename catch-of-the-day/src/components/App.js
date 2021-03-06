import React from "react";
import PropTypes from "prop-types";
import Header from "./Header";
import Order from "./Order";
import Inventory from "./Inventory";
import Fish from "./Fish";
import sampleFishes from "../sample-fishes";
import base from "../base";

class App extends React.Component {
  state = {
    fishes: {},
    order: {}
  };

  static propTypes = {
    match: PropTypes.object
  };

  componentDidMount() {
    const { params } = this.props.match;

    // reinstate localstorage
    const localStorageRef = localStorage.getItem(params.storeId);
    if (localStorageRef) {
      this.setState({
        order: JSON.parse(localStorageRef)
      });
    }

    this.ref = base.syncState(`${params.storeId}/fishes`, {
      context: this,
      state: "fishes"
    });
  }

  componentDidUpdate() {
    localStorage.setItem(
      this.props.match.params.storeId,
      JSON.stringify(this.state.order)
    );
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  loadSampleFishes = () => {
    this.setState({ fishes: sampleFishes });
  };

  addFish = fish => {
    // copy existing state
    const fishes = { ...this.state.fishes };
    // add new fish
    fishes[`fish${Date.now()}`] = fish;
    // replace state
    this.setState({ fishes });
  };

  updateFish = (key, updatedFish) => {
    // copy fish
    const fishes = { ...this.state.fishes };
    // update state
    fishes[key] = updatedFish;
    // set to state
    this.setState({ fishes });
  };

  addToOrder = key => {
    // copy existing state
    const order = { ...this.state.order };
    // add to order or update order number
    order[key] = order[key] + 1 || 1;
    // replace state
    this.setState({ order });
  };

  removeFromOrder = key => {
    // copy existing state
    const order = { ...this.state.order };
    // remove from order or update order number
    order[key] = order[key] - 1;
    if (order[key] === 0) {
      delete order[key];
    }
    // replace state
    this.setState({ order });
  };

  deleteFish = key => {
    // copy state
    const fishes = { ...this.state.fishes };
    // update state
    fishes[key] = null;
    // replace state
    this.setState({ fishes });
  };

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul className="fishes">
            {Object.keys(this.state.fishes).map(key => (
              <Fish
                key={key}
                index={key}
                details={this.state.fishes[key]}
                addToOrder={this.addToOrder}
              />
            ))}
          </ul>
        </div>
        <Order
          fishes={this.state.fishes}
          order={this.state.order}
          removeFromOrder={this.removeFromOrder}
        />
        <Inventory
          storeId={this.props.match.params.storeId}
          addFish={this.addFish}
          updateFish={this.updateFish}
          deleteFish={this.deleteFish}
          loadSampleFishes={this.loadSampleFishes}
          fishes={this.state.fishes}
        />
      </div>
    );
  }
}

export default App;
