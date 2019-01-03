<template>
  <div id="app">

    <nav>
      <div class="nav-wrapper blue darken-1">
        <a href="#" class="brand-logo center">Recetas de cocina</a>
      </div>
    </nav>

    <div class="container">

      <form>

          <label>Nombre</label>
          <input type="text">
          <label>Tipo de Plato</label>
          <input type="text">

          <button class="waves-effect waves-light btn-small">Guardar<i class="material-icons left">save</i></button>

      </form>

      <table>

        <thead>
          <tr>
            <th>Nombre</th>
            <th>Tipo de Plato</th>
            <th>Porciones</th>
            <th>Ingredientes</th>            
            <th>Preparacion</th>
            <th>Opciones</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="receta of recetas" :key="receta.idrecetas">
            <td>{{receta.nombre}}</td>
            <td>{{receta.tipoplato}}</td>
            <td>{{receta.porciones}}</td>
            <td>{{receta.ingredientes}}</td>
            <td>{{receta.preparacion}}</td>
            <td>
              <button class="waves-effect btn-small blue darken-1"><i class="material-icons">create</i></button>
              <button class="waves-effect btn-small red darken-1"><i class="material-icons">delete_sweep</i></button>
            </td>
          </tr>
        </tbody>
      
      </table>

    </div>

  </div>
</template>

<script>
import Receta from './../services/recetas'

export default {

  data () {
    return {
      receta: {
        idrecetas: '',
        nombre: '',
        tipoplato: '',
        preparacion: '',
        porciones: '',
        ingredientes: ''
      },
      recetas: [],
      errors: []
    }
  },

  mounted () {
    this.listar()
  },

  methods: {

    listar () {
      Receta.get().then(response => {
        this.recetas = response.data
      })
    }
  }
}
</script>
