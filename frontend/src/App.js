import React, { Component } from 'react'
import logo from 'logo.svg';
import 'App.css';
import { getAll } from 'api/categories'
import { connect } from 'react-redux'
import actions from 'actions'

class App extends Component {

  state = {
    categories: []
  }

  componentDidMount() {

    getAll().then((result) => this.setState({
      categories: result.categories
    }))

    this.props.getAllPost()
    .then(result => {
      result.posts.map(p => this.props.getAllComment(p.id))
    })

  }


  render() {

    const { comments, disableComment, addComment, editComment, upComment, downComment, getAllPost, getAllComment } = this.props

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          {
            JSON.stringify(this.state.categories)
          }
          To get started, edit <code>src/App.js</code> and save to reload.
            <ul>
              {
                  this.props.posts.map(post => {
                    return <li>
                      <div>
                      {post.id} : { JSON.stringify(post.comments)}
                      {post.comments.map(comment => comment.body)}
                      </div>
                    </li>

                  })
              }
             </ul>
             <button onClick={(event) => (disableComment('894tuq4ut84ut8v4t8wun89g'))}>Excluir</button>

             <button onClick={(event) => {addComment({
                                                parentId: "8xf0y6ziyjabvozdd253nd",
                                                timestamp: 1468166872634,
                                                body: 'Hi there! I am a COMMENT.',
                                                author: 'thingtwo',
                                                voteScore: 6,
                                                deleted: false,
                                                parentDeleted: false
                                              })

                                            }}>Adicionar</button>


             <button onClick={(event) => (editComment('894tuq4ut84ut8v4t8wun89g',{author: 'jessica'}))}>Editar</button>

              <button onClick={(event) => (upComment('894tuq4ut84ut8v4t8wun89g'))}>UP</button>

              <button onClick={(event) => (downComment('894tuq4ut84ut8v4t8wun89g'))}>Down</button>

              <button onClick={(event) => (getAllPost())}>get all</button>

        </p>
      </div>
    );
  }
}

const mapStateToProps = ({comments, posts}) => {

    return {
      posts : posts.allIds.map(p => {
        return {
                ...posts.byId[p],
                comments: comments.allIds.filter(c => {
                  if(p === comments.byId[c].parentId)
                    return c
                }).map(c => comments.byId[c])
                }
      })
    }
   /* post: Object.values(posts).map((post) => ({
      post,
      comments: comments.map((comment) => ({
        [comment.id]: comment
      }))
    }))*/

}

const mapDispatchToProps = (dispatch) => {

  return {

    getAllComment: (id) => dispatch(actions.comment.getAllComment(id)),
    disableComment: (id) => dispatch(actions.comment.disableComment(id)),
    addComment: (comment) => dispatch(actions.comment.addComment(comment)),
    editComment: (id, comment) => dispatch(actions.comment.editComment(id, comment)),
    upComment: (id) => dispatch(actions.comment.upVoteComment(id)),
    downComment: (id) => dispatch(actions.comment.downVoteComment(id)),
    getAllPost: () => dispatch(actions.post.getAllPost())

  }

}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
