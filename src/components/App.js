import React, { Component } from 'react';
import Navbar from './Navbar'
import RecipeItem from './RecipeItem'
import recipes from '../sample_data/recipes.json'

class App extends Component {
  constructor(props){
    super(props)

    this.state = {
      searchString : "",
      Recipes : recipes.results,
      inicialRecipes: recipes.results
    }

  }

  onchange = search => {
    const { inicialRecipes } = this.state

    this.setState({
      searchString: search,
      Recipes : inicialRecipes.filter(x => x.title.indexOf(search) > -1 || x.ingredients.indexOf(search) > -1 )
    })

  }

  highlightText = (text,mark) => {
    if (typeof mark !== "undefined" && mark !== "") {

      const result = text.replace(mark,"$"+mark+"$")
      const array = result.split("$")    

        if (array !== null) {
            return (
              array.map((value,index) =>
              value !== mark?value:<mark key={index}>{mark}</mark>)
            );
        }
    }

    return text;
  };

  render() {
    const { Recipes,searchString } = this.state   

    return (
      <div className="App">
        <Navbar value={searchString} onChange={(e) => this.onchange(e.target.value)} />
        <div className="container mt-10">
          <div className="row">
            {
              Recipes.map((value,index) =>
                  <RecipeItem 
                    key={index}
                    title={this.highlightText(value.title,searchString)}
                    href={value.href}
                    ingredients={this.highlightText(value.ingredients,searchString)}
                    thumbnail={value.thumbnail}
                  /> )
            }
          </div>
        </div>
      </div>
    );
  }
}

export default App;
