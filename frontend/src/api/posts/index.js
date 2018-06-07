import { api, headers } from 'api/utils/constants'

/**
 * Busca posts por categoria
 *
 * @param {category} category - categoria para buscar os posts
 */
export const getForCategory = (category) =>
        fetch(`${api}/${category}/posts`, { headers })
            .then(res => res.json())

/**
 * Busca todos os posts
 */
export const getAll = () =>
    fetch(`${api}/posts`, { headers })
      .then(res => res.json())

/**
 * Adiciona novo post
 *
 * @param {post} post - post a ser adicionado
 */
export const add = (post) =>
    fetch(`${api}/posts`, {
        method: 'POST',
        headers: {
          ...headers,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(post)
    })
    .then(res => res.json())

/**
 * Busca detalhe de um post por codigo
 *
 * @param {number} id - id do post
 */
export const get = (id) =>
    fetch(`${api}/posts/${id}`, { headers })
    .then(res => res.json())

/**
 * Atualiza pontuação do post
 *
 * @param {number} id - Identificador do post
 * @param {string} option - upVote: caso voto positivo - downVote: caso voto negativo
 */
export const voting = (id, option) =>
    fetch(`${api}/posts/${id}`, {
        method: 'POST',
        headers: {
          ...headers,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(option)
    })
    .then(res => res.json())


/**
 * Editar o post
 *
 * @param {number} id - identificador do post que será editado
 * @param {post} post - post com informacoes que serao editadas
 */
export const edit = (id, post) =>
    fetch(`${api}/posts/${id}`, {
        method: 'PUT',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(post)
    })
    .then(res => res.json())

/**
 * Desabilita o post
 *
 * @param {number} id - identificador do post que será desabilitado
 */
export const disable = (id) =>
    fetch(`${api}/posts/${id}`, {
        method: 'DELETE',
        ...headers
    })
    .then(res => res.json())