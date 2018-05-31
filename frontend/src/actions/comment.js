import * as api from 'api/comments'
import * as constants from 'actions/constants'
const uuidv1 = require('uuid/v1');

/**
 * Action de buscar todos os comentários
 * 
 * @param {Comment[]} comments -  todos os comentários 
 */
const getAll = (comments) => ({
    type: constants.GET_ALL_COMMENT,
    comments
  });

/**
 * Despacha a action de buscar todos os comentários de determinado post 
 * 
 * @param {number} postId - id do post o qual o comentário pertence 
 */
export const getAllComment = (postId) => dispatch => (
    api.getAll(postId)
    .then(comments => dispatch(getAll(comments)))
)

/**
 * Action para buscar um comentário pelo id
 * 
 * @param {Comment} comment - Comentário que será buscado 
 */
const get = (comment) => ({
    type: constants.GET_COMMENT,
    comment
})

/**
 * Despacha a action de buscar comentário por ID
 * 
 * @param {number} id  - id do comentário a ser buscado
 */
export const getComment = (id) => dispatch => (
    api.get(id)
    .then(comment => dispatch(get(comment)))
)

/**
 * Action para adicionar um novo comentário
 * 
 * @param {Comment} comment - comentário a ser adicionado 
 */
const add = (comment) => ({
    type: constants.ADD_COMMENT,
    comment
})

/**
 * Despacha a action de adicionar um novo comentário
 * 
 * @param {Comment} comment -  Comentário a ser adicionado 
 */
export const addComment = (comment) => dispatch => {

    comment = {
        ...comment,
        id: uuidv1()
    }

    api.add(comment)
    .then(comment => dispatch(add(comment)))
}

/**
 * Action para adicionar ponto ao comentário
 * 
 * @param {Comment} comment -  comentário que foi votado 
 */
const upVote = (comment) => ({
    type: constants.UP_VOTE_COMMENT,
    comment
})

/**
 * Despacha a action de adicionar ponto ao comentário
 * 
 * @param {number} id - id do comentario 
 */
export const upVoteComment = (id) => dispatch => (
    api.voting(id, {option: 'upVote'})
    .then(comment => dispatch(upVote(comment)))
)

/**
 * Action para remover ponto do comentário
 * 
 * @param {Comment} comment - comentário a ser removido ponto
 */
const downVote = (comment) => ({
    type: constants.DOWN_VOTE_COMMENT,
    comment
})

/**
 * Despacha a action de remover ponto do comentário
 * 
 * @param {number} id -  id do comentário a ser removido ponto 
 */
export const downVoteComment = (id) => dispatch => (
    api.voting(id, {option: 'downVote'})
    .then(comment => dispatch(downVote(comment)))
)

/**
 * Action para editar comentário 
 * 
 * @param {Comment} comment - comentário a ser editado 
 */
const edit = (comment) => ({
    type: constants.EDIT_COMMENT,
    comment
})

/**
 * Despacha a action de editar comentário
 * 
 * @param {number} id - id do comentário a ser editado
 * @param {Comment} comment  - comentário a ser editado
 */
export const editComment = (id, comment) => dispatch => (
    api.edit(id, comment)
    .then(comment => dispatch(edit(comment)))
)

/**
 * Action para remover um comentário
 * 
 * @param {Comment} coment - comentário a ser removido 
 */
const disable = (comment) => ({
    type:  constants.DISABLE_COMMENT,
    comment
}) 

/**
 * Despacha a action de remover um comentário
 * 
 * @param {string} id - ID do comentário a ser removido
 */
export const disableComment = (id) => dispatch => (
    api.disable(id)
    .then(comment => dispatch(disable(comment)))
)