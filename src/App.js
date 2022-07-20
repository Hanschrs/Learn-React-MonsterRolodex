import { Component } from "react";

import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  constructor() {
    super();

    this.state = {
      monsters: [],
      searchField: ""
    };
  }

  // NOTE: Happens only once at the beginning of page load
  // NOTE: API calls should happen here
  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((users) =>
        this.setState(
          () => {
            return { monsters: users };
          },
          () => {
            console.log(this.state);
          }
        )
      );
  }

  // NOTE: this METHOD is extracted from the onChange event inside render to optimize performance.
  // ------else the function will be created everytime the screen re-renders and in the case there are a lot of functions it will slows down the web
  onSearchChange = (event) => {
    console.log(event.target.value);
    const searchField = event.target.value.toLocaleLowerCase();
    this.setState(() => {
      return { searchField };
    })
  };

  render() {

    // NOTE: This is to make we do not need to write "this.state.xxxx" each time we call the state variable.
    const { monsters, searchField } = this.state;
    const { onSearchChange } = this;

    // NOTE: This object is put here so as to be accessible from anywhere in "render", instead of just in the onchange event.
    const filteredMonsters = monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(searchField);
    })

    return (
      <div className="App">
        <input
          className="search-box"
          type="search"
          placeholder="search monsters"
          onChange={onSearchChange}
        />
        {filteredMonsters.map((monster) => {
          return (
            <div key={monster.id}>
              <h1>{monster.name}</h1>
            </div>
          );
        })}
      </div>
    );
  }
}

export default App;
