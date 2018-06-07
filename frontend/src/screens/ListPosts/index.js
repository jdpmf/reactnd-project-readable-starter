import React, { Component } from 'react';
import { connect } from 'react-redux'
import Post from 'components/Post'
import actions from 'actions'

class ListPosts extends Component {

    state = {}

    componentDidMount() {

        const { category, getAllPost, getPostForCategory } = this.props

        category === "todos" ? getAllPost() : getPostForCategory(category)
      .then(result => {
       result.posts.map(p => this.props.getAllComment(p.id))
       })

    }

    render() {

        const { posts } = this.props

        return (
            <div className="page">

            <div className="page-bgtop">
              <div className="page-bgbtm">
                <div className="content">
                {
                  posts.map(post => <Post post={post} key={post.id} />)
                }
                </div>
              <div className="espace">&nbsp;</div>
              </div>
            </div>
          </div>
         )
    }

}

    const mapStateToProps = ({comments, posts}) => {

        return {
          posts : posts.allIds.map(p => {
            return {
                    ...posts.byId[p],
                    comments:
                      comments.allIds
                      .filter(c => p === comments.byId[c].parentId)
                      .map(c => comments.byId[c])
                    }
          })
        }

    }

    const mapDispatchToProps = (dispatch) => {

      return {

        getAllComment: (id) => dispatch(actions.comment.getAllComment(id)),
        //disableComment: (id) => dispatch(actions.comment.disableComment(id)),
        //addComment: (comment) => dispatch(actions.comment.addComment(comment)),
       // editComment: (id, comment) => dispatch(actions.comment.editComment(id, comment)),
        //upComment: (id) => dispatch(actions.comment.upVoteComment(id)),
        //downComment: (id) => dispatch(actions.comment.downVoteComment(id)),
        getAllPost: () => dispatch(actions.post.getAllPost()),
        getPostForCategory: (category) => dispatch(actions.post.getPostForCategory(category))

      }

    }

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(ListPosts)