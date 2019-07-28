import React from "react";
import ReactDOM from "react-dom";
import shuffle from "lodash.shuffle";

import "./styles.css";

import Card from "./Card";

const src = "https://picsum.photos/500";

export default class App extends React.Component {
  constructor() {
    super();
    this.CARD_COUNT = 6;
    this.state = {
      cards: [],
      started: false,
      activeCards: [],
      matched: []
    };
    this.getCards = this.getCards.bind(this);
    this.startGame = this.startGame.bind(this);
    this.resetGame = this.resetGame.bind(this);
    this.timeout = null;
  }
  componentDidMount() {
    // this.getCards();
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.cards.length === this.CARD_COUNT / 2) {
      this.duplicateCards();
    }
    if (this.state.activeCards.length === 2) {
      // Check for matches
      this.checkMatches();
    }
  }
  checkMatches() {
    // Need a better way to check
    if (this.state.activeCards[0].url === this.state.activeCards[1].url) {
      console.log("match");
      clearTimeout(this.timeout);
      this.setState(prevState => {
        return {
          matched: prevState.matched.concat([
            this.state.activeCards[0],
            this.state.activeCards[1]
          ]),
          activeCards: []
        };
      });
      return;
    }

    this.timeout = setTimeout(() => {
      // Not a match
      this.setState({
        activeCards: []
      });
    }, 750);
  }
  getCards() {
    for (let i = 0; i < this.CARD_COUNT / 2; i++) {
      this.setState(prevState => ({
        cards: prevState.cards.concat([
          { id: i, url: `${src}?random=${Date.now()}-${i}` }
        ])
      }));
    }
  }
  duplicateCards() {
    this.setState(prevState => ({
      cards: shuffle(
        prevState.cards.reduce((all, card, i) => {
          all.push(card);
          all.push({ ...card, id: (i + 1) * prevState.cards.length });
          return all;
        }, [])
      )
    }));
  }
  startGame() {
    this.getCards();
    this.setState({ started: true });
  }
  resetGame() {
    this.setState({
      started: false,
      cards: [],
      activeCards: [],
      matched: []
    });
  }
  toggleCard(cardId) {
    this.setState(prevState => {
      const card = prevState.cards.find(c => c.id === cardId);
      return { activeCards: prevState.activeCards.concat([card]) };
    });
  }
  isActive(cardId) {
    return [this.state.activeCards, this.state.matched].some(arr => {
      return arr.some(ac => ac.id === cardId);
    });
  }
  render() {
    console.log("rend");
    return (
      <div>
        <h1 className="uk-heading-small">Matching Game</h1>
        {!this.state.started && (
          <button
            className="uk-button uk-button-primary uk-button-large"
            onClick={this.startGame}
          >
            Start Game
          </button>
        )}
        {this.state.started && (
          <div>
            <div
              className="uk-grid uk-text-center uk-child-width-1-2"
              uk-grid="true"
            >
              {this.state.cards.map((c, i) => (
                <Card
                  src={c.url}
                  key={i}
                  onClick={this.toggleCard.bind(this, c.id)}
                  active={this.isActive(c.id)}
                />
              ))}
            </div>
            <button
              className="uk-button uk-button-primary uk-button-large"
              onClick={this.resetGame}
            >
              Play Again?
            </button>
          </div>
        )}
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
