<template>
  <div id="app">

    <nav>
      <div class="nav-wrapper blue darken-1">
        <a href="#" class="brand-logo center">Recetas de cocina</a>
      </div>
    </nav>

    <div class="container">
      <ul>
        <li v-for="(erro,index) of errors" :key="index">
          Campo <b>{{erro.field}}</b> - {{erro.defaultMessage}}
        </li>
      </ul>

      <form @submit.prevent="guardar">

          <label>Nombre</label>
          <input type="text" v-model="receta.nombre">
          <label>Tipo de Plato</label>
          <input type="text" v-model="receta.tipoplato">
          <label>Porciones</label>
          <input type="text" v-model="receta.porciones">
          <label>Ingredientes</label>
          <input type="text" v-model="receta.ingredientes">
          <label>Preparacion</label>
          <input type="text" v-model="receta.preparacion">

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
              <button @click="editar(receta)" class="waves-effect btn-small blue darken-1"><i class="material-icons">create</i></button>
              <button @click="eliminar(receta)" class="waves-effect btn-small red darken-1"><i class="material-icons">delete_sweep</i></button>
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
        porciones: '',
        ingredientes: '',
        preparacion: ''
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
    },

    guardar () {
      if (!this.receta.idrecetas) {
        Receta.create(this.receta).then(response => {
          this.receta = {}
          alert('Guardado')
          this.listar()
          this.errors = []
        }).catch(e => {
          // console.log(e.response.data.errors)
          // this.errors = e.response.data.errors
            console.log(e)
        })
      } else {
        Receta.update(this.receta).then(response => {
          this.receta = {}
          alert('Actualizado')
          this.listar()
          this.errors = []
        }).catch(e => {
          // console.log(e.response.data.errors)
          // this.errors = e.response.data.errors
            console.log(e)
        })
      }
    },

    editar (receta) {
      this.receta = receta
    },

    eliminar (receta) {

      if(confirm('¿Desea eliminar la receta?')){
        Receta.delete(receta).then(response => {
          this.listar()
          this.errors = []
        }).catch(e => {
            // this.errors = e.response.data.errors
            console.log(e)
        })
      }


    }
  }
}
</script>
