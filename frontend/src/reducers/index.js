import {
  GET_ALL_COMMENT, GET_COMMENT,
  ADD_COMMENT, EDIT_COMMENT, DISABLE_COMMENT,
  UP_VOTE_COMMENT, DOWN_VOTE_COMMENT, GET_ALL, GET, GET_FOR_CATEGORY,
  ADD, EDIT, DISABLE,
  UP_VOTE, DOWN_VOTE
} from 'actions/constants'

import { combineReducers } from 'redux'

/**
 * Estado inicial
 */
const inicialState = {

      byId : {

      },
      allIds : []

}

/**
 * Reducer dos posts
 *
 * @param {object} state estado do aplicativo
 * @param {object} action ação que será executada
 */
export const posts = (state=inicialState, action) => {

  switch(action.type) {

      case GET_ALL :
      case GET_FOR_CATEGORY :
        let newState = { ...state };

        action.posts.map(p => {
          newState = {
            ...newState,
            byId : {
              ...newState.byId,
              [p.id] : p
            },
            allIds : action.posts.map(p => p.id)
          }
          return newState
        })
        return newState;

      case GET :
          return {
            ...state,
            byId : {
              ...action.post
            },
            allIds : [ action.post.id ]
          }

      case DISABLE :
          return {
            ...state,
            byId : {
              ...state.byId,
              [action.post.id] : action.post
            },
            allIds : state.allIds.filter(p => p.id !== action.post.id)
          }

      case ADD :
          return {
            ...state,
            byId : {
              ...state.byId,
              [action.post.id] : action.post
            },
            allIds : [ ...state.allIds, action.post.id ]
          }

      case EDIT :
      case UP_VOTE :
      case DOWN_VOTE :
        return {
          ...state,
          byId : {
            ...state.byId,
            [action.post.id] : action.post
          }
        }

      case ADD_COMMENT :
        const postAddComment = state.byId[action.comment.parentId]

        return {
          ...state,
          byId : {
            ...state.byId,
            [action.comment.parentId] : {
              ...postAddComment,
              commentCount : postAddComment.commentCount + 1
            }
          }
        }

      case DISABLE_COMMENT :
        const postRemoveComment = state.byId[action.comment.parentId]

        return {
          ...state,
          byId : {
            ...state.byId,
            [action.comment.parentId] : {
              ...postRemoveComment,
              commentCount : postRemoveComment.commentCount - 1
            }
          }
        }

      default :
          return state

  }

}

/**
 * Reducer dos comentários
 *
 * @param {object} state estado do aplicativo
 * @param {object} action ação que será executada
 */
export const comments = (state=inicialState, action) => {

  switch(action.type) {

      case GET_ALL_COMMENT :
        let newState = { ...state };

        action.comments.map(c => {
            newState = {
              ...newState,
              byId : {
                ...newState.byId,
                [c.id] : c
              },
              allIds : action.comments.map(c => c.id)
            }
            return newState;
          })
        return newState;

      case GET_COMMENT :
        return {
          ...state,
          byId : {
            [action.comment.id] : action.comment
          },
          allIds : [ action.comment.id ]
        }

      case DISABLE_COMMENT :
        return {
          ...state,
          byId : {
            ...state.byId,
            [action.comment.id] : action.comment
          },
          allIds : state.allIds.filter(c => c !== action.comment.id)
        }

      case ADD_COMMENT :
        return {
          ...state,
          byId : {
            ...state.byId,
            [action.comment.id] : action.comment
          },
          allIds : [ ...state.allIds, action.comment.id ]
        }

      case EDIT_COMMENT :
      case UP_VOTE_COMMENT :
      case DOWN_VOTE_COMMENT :
        return {
          ...state,
          byId : {
            ...state.byId,
            [action.comment.id] : action.comment
          }
        }

      default :
          return state

  }

}

const reducer = combineReducers({
    comments,
    posts,
  })

export default reducer