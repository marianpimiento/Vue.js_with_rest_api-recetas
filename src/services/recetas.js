import { http } from './config'

export default{
  
  get: () => {
    return http.get('recetas?count=50')
  },

  create: (receta) => {
    return http.post('receta/' + receta.idrecetas, receta)
  },

  update: (receta) => {
    return http.put('receta/' + receta.idrecetas, receta)
  },

  delete: (receta) => {
    return http.delete('receta/' + receta.idrecetas)
  }
}