import { http } from './config'

export default{
  
  get: (txtBusqueda) => {
    var JSONbig = require('json-bigint')({"storeAsString": true})
    return http.get('/recetas', {
      params: {
        txtBusqueda: txtBusqueda
      },
      transformResponse: data => JSONbig.parse(data)
    })
  },

  create: (receta) => {
    return http.post('receta', receta)
  },

  update: (receta, idrecetaActualizar) => {
    return http.put('receta/' + idrecetaActualizar, receta)
  },

  delete: (receta) => {
    return http.delete('receta/' + receta.idrecetas)
  }
}