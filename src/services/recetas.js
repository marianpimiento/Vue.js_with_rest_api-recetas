import { http } from './config'

export default{
  
  get: (txtBusqueda) => {
    return http.get('recetas?count=50&txtBusqueda=' + txtBusqueda)
  },

  create: (receta) => {
    return http.post('receta', receta)
  },

  update: (receta) => {
    return http.put('receta/' + receta.idrecetas, receta)
  },

  delete: (receta) => {
    return http.delete('receta/' + receta.idrecetas)
  }
}