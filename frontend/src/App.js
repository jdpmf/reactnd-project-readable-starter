import React, { Component } from 'react'
import 'App.css';
import { getAll } from 'api/categories'
import { Link } from 'react-router-dom'
import ListPosts from 'screens/ListPosts'

class App extends Component {

  state = {
    categories: [{"name":"todos","path":"/"}],
    categorySelected: "todos",
    ordenation: "1"
  }

  componentDidMount() {

    getAll().then((result) => {

      let categories = result.categories.map(cat => {
        return {
          name: cat.name,
          path: "/"+cat.path
        }})

      this.setState({
        categories: this.state.categories.concat(categories)
      })

    })

  }


  sortPostEvent = (event) => {

      this.setState({
        ordenation: event.target.value
      })

      this.props.posts.sort(this.sortPosts())

  }

  sortPosts = () => {

    if(this.state.ordenation === "1"){

        return this.sortByVoteScore

    }else{

      return this.sortByDate

    }

  }

  sortByVoteScore = (a,b) => {

    return a.voteScore > b.voteScore ? -1 : a.voteScore < b.voteScore ? 1 : 0

  }


  sortByDate = (a,b) => {

      return a.timestamp > b.timestamp ? -1 : a.timestamp < b.timestamp ? 1 : 0

  }

  render() {

    return (
      <div className="App">
        <div className="wrapper">

          <div className="header-wrapper">

            <div className="header">

              <div className="logo">

                <h1><Link to="/">URR BLOGGER</Link></h1>

                <p>Blog de Udacity, Redux e React</p>

              </div>

            </div>

          </div>

          <div className="menu">

            <ul>
              {
                this.state.categories.map(cat => {

                    const path = `/${cat.path}`

                    if(cat.name === this.state.categorySelected) {
                      return <li key={cat.path} className="current_page_item"><Link to={path}>{cat.name}</Link></li>
                    }else {
                      return <li key={cat.path} onClick={() => this.setState({categorySelected: cat.name})}><Link to={cat.path}>{cat.name}</Link></li>
                    }
                })
              }
            </ul>

            <select className="select" onChange={this.sortPostEvent} value={this.state.ordenation}>
              <option value="1">VoteScore</option>
              <option value="2">Data de criação</option>
            </select>

            <button className="addPostButton">Nova postagem</button>

          </div>

          <ListPosts category="react" />

        </div>
      </div>
    );
  }
}

export default App
