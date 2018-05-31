import { api, headers } from 'api/utils/constants'

/**
 * Busca todas as categorias
 */
export const getAll = () =>
    fetch(`${api}/categories`, { headers })
      .then(res => res.json())