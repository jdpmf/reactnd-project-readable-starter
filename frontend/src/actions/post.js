import * as api from 'api/posts'
import * as constants from 'actions/constants'

/**
 * Action para buscar todos os posts
 *
 * @param {Post[]} posts - lista de todos os posts
 */
const getAll = (posts) => ({
    type: constants.GET_ALL,
    posts
  });

/**
 * Despacha a action de buscar todos os posts
 */
export const getAllPost = () => dispatch => (
    api.getAll()
    .then(posts => dispatch(getAll(posts)))
)

/**
 * Action para buscar um post por ID
 *
 * @param {Post} post -  post a ser buscado por ID
 */
const get = (post) => ({
    type: constants.GET,
    post
})

/**
 * Despacha a action de buscar post por ID
 *
 * @param {number} id - id do post a ser buscado
 */
export const getPost = (id) => dispatch => (
    api.get(id)
    .then(post => dispatch(get(post)))
)

/**
 * Action para buscar posts de determinada categoria
 *
 * @param {Post[]} posts -  posts buscado de determinada categoria
 */
const getForCategory = (posts) => ({
    type: constants.GET_FOR_CATEGORY,
    posts
})

/**
 * Despacha a action de buscar posts por categoria
 *
 * @param {String} category - categoria que será buscado os posts
 */
export const getPostForCategory = (category) => dispatch => (
    api.getForCategory(category)
    .then(posts => dispatch(getForCategory(posts)))
)

/**
 * Action para adicionar um novo post
 *
 * @param {Post} post - post a ser adicionado
 */
const add = (post) => ({
    type: constants.ADD,
    post
})

/**
 * Despacha a action de adicionar um novo post
 *
 * @param {Post} post - post a ser adicionado
 */
export const addPost = (post) => dispatch => (
    api.add(post)
    .then(post => dispatch(add(post)))
)

/**
 * Action para adicionar voto ao post
 *
 * @param {Post} post - post a ser adicionado voto
 */
const upVote = (post) => ({
    type: constants.UP_VOTE,
    post
})

/**
 * Despacha a action de adicionar voto ao post
 *
 * @param {number} id - id do post que será adicionado voto
 */
export const upVotePost = (id) => dispatch => (
    api.voting(id, 'upVote')
    .then(post => dispatch(upVote(post)))
)

/**
 * Action para remover voto do post
 *
 * @param {Post} post -  post que será removido voto
 */
const downVote = (post) => ({
    type: constants.DOWN_VOTE,
    post
})

/**
 * Despacha a action de remover voto do post
 *
 * @param {number} id - id do post que será removido voto
 */
export const downVotePost = (id) => dispatch => (
    api.voting(id, 'downVote')
    .then(post => dispatch(downVote(post)))
)

/**
 * Action de editar post
 *
 * @param {Post} post - post que será editado
 */
const edit = (post) => ({
    type: constants.EDIT,
    post
})

/**
 * Despacha a action de editar post
 *
 * @param {number} id - id do post que será editado
 * @param {Post} post - post que será editado
 */
export const editPost = (id, post) => dispatch => (
    api.edit(id, post)
    .then(post => dispatch(edit(post)))
)

/**
 * Action para remover um post
 *
 * @param {Post} post - post a ser removido
 */
const disable = (post) => ({
    type:  constants.DISABLE,
    post
})

/**
 * Despacha a action de remover um post
 *
 * @param {string} id - ID do post a ser removido
 */
export const disablePost = (id) => dispatch => (
    api.disable(id)
    .then(post => dispatch(disable(post)))
)