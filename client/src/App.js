import "./App.css";
import { Route, Switch } from "react-router-dom";
import Home from "./Components/Home/Home";
import LandingPage from "./Components/LandingPage/LandingPage";
import PokeDetail from "./Components/PokeDetail/PokeDetail";
import About from "./Components/About/About";
import CreatePokemon from "./Components/CreatePokemon/CreatePokemon";
// import NavBar from './Components/NavBar/NavBar';
//rutas del front
function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route path="/home" component={Home} />
        <Route path="/pokemons/:id" component={PokeDetail} />
        <Route path="/about" component={About} />
        <Route exact path="/createPokemon" component={CreatePokemon} />
        <Route path="/createPokemon/:id" component={CreatePokemon} />
      </Switch>
    </div>
  );
}

export default App;
