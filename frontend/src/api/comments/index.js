import { api, headers } from 'api/utils/constants'

/**
 * Busca todos os comentários de um determinado post
 * 
 * @param {number} id - id do post que irá buscar os comentarios 
 */
export const getAll = (id) =>
    fetch(`${api}/posts/${id}/comments`, { headers })
    .then(res => res.json())

/**
 * Adiciona um novo comentário
 * 
 * @param {comment} comment - comentario que será inserido 
 */
export const add = (comment) => 
    fetch(`${api}/comments`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(comment)
    })
    .then(res => res.json())


/**
 * Busca detalhe de um comentário pelo código
 * 
 * @param {number} id - identificador do comentario 
 */
export const get = (id) => 
    fetch(`${api}/comments/${id}`, { headers })
    .then(res => res.json())

/**
 * Atualiza pontuação do comentario
 * 
 * @param {number} id - Identificador do comentario
 * @param {string} option - upVote: caso voto positivo - downVote: caso voto negativo
 */
export const voting = (id, option) =>
    fetch(`${api}/comments/${id}`, {
        method: 'POST',
        headers: {
          ...headers,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(option)
    })
    .then(res => res.json())

    
/**
 * Editar o comentario
 * 
 * @param {number} id - identificador do comentario que será editado 
 * @param {comment} comment - comentario com informacoes que serao editadas
 */
export const edit = (id, comment) => 
    fetch(`${api}/comments/${id}`, {
        method: 'PUT',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(comment)
    })
    .then(res => res.json())

/**
 * Desabilita o comentario
 * 
 * @param {number} id - identificador do comentario que será desabilitado
 */
export const disable = (id) => 
    fetch(`${api}/comments/${id}`, {
        method: 'DELETE',
        headers: {
            ...headers
        }
    })
    .then(res => res.json())
