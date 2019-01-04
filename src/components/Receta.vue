<template>
  <div id="app">

    <!-- <div class="jumbotron" style="background-color:#fca758 !important; padding: 0em inherit !important;"> -->
    <div class="jumbotron" style="
        background-image: url(https://static.wixstatic.com/media/441212_640c1cb265cc4e42b8375c30206b4ba5~mv2.jpg);
        background-size: cover;
        padding: 20px !important;">
      <div class="container align-center">
        <h3 class="display-4 text-center text-white"><b>Recetas de Cocina</b></h3>
      </div>
    </div>

    <!-- '../assets/background_comida.jpg' -->

    <div class="container">
      <ul>
        <li v-for="(erro,index) of errors" :key="index">
          Campo <b>{{erro.field}}</b> - {{erro.defaultMessage}}
        </li>
      </ul>

      <!-- <form @submit.prevent="guardar">

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

      </form> -->

      <div class="card">
      <h5 class="card-header">Crear receta</h5>

      <div class="card-body">
        <form @submit.prevent="guardar">

          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="inputNombre">Nombre</label>
              <input type="text" class="form-control" id="inputNombre" v-model="receta.nombre">
            </div>
            <div class="form-group col-md-4">
              <label for="inputTipo">Tipo de plato</label>
              <select id="inputTipo" class="form-control" v-model="receta.tipoplato">
                <option selected></option>
                <option>Sopa</option>
                <option>Ensalada</option>
                <option>Postre</option>
                <option>Otro</option>
              </select>
            </div>
            <div class="form-group col-md-2">
              <label for="inputPorciones">Porciones</label>
              <input type="text" class="form-control" id="inputPorciones" v-model="receta.porciones">
            </div>
          </div>

          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="textareaIngredientes">Ingredientes</label>
              <textarea class="form-control" id="textareaIngredientes" rows="3" v-model="receta.ingredientes"></textarea>
            </div>
            <div class="form-group col-md-6">
              <label for="textareaPreparacion">Preparación</label>
              <textarea class="form-control" id="textareaPreparacion" rows="3" v-model="receta.preparacion"></textarea>
            </div>
          </div>

          <button type="submit" class="btn btn-info">Guardar</button>
        </form>
      </div>

    </div>
  
      <br>
      <form @submit.prevent="listar">

          <div class="input-group mb-3">
            <input type="text" class="form-control" aria-label="Buscar por nombre" aria-describedby="basic-addon2" v-model="txtBusqueda">
            <!-- <input type="text" class="form-control" aria-label="Buscar por nombre" aria-describedby="basic-addon2" v-model="txtBusqueda"  @input="listar"> -->
            <div class="input-group-append">
              <button class="btn btn-info" type="button">Buscar</button>
            </div>
          </div>

      </form>

      <br><br>


      <div class="card border-dark mb-3" v-for="receta of recetas" :key="receta.idrecetas">
        <div class="card-header " style="background-color: #bbf7e5;">
          {{receta.nombre}} ({{receta.porciones}} porciones) - {{receta.tipoplato}}
          <button @click="eliminar(receta)" type="button" class="btn btn-outline-dark float-right">Borrar <i class="fa fa-home"></i></button>
          <button @click="editar(receta)" type="button" class="btn btn-outline-dark float-right">Editar <i class="fa fa-home"></i></button>
         
        </div>
        <div class="card-body text-dark">
          <dl class="row">
            <dt class="col-sm-3">Ingredientes</dt>
            <dd class="col-sm-9">{{receta.ingredientes}}</dd>

            <dt class="col-sm-3 text-truncate">Preparación</dt>
            <dd class="col-sm-9">{{receta.preparacion}}</dd>
          </dl>
        </div>
      </div>

      <!-- <table>

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
      
      </table> -->

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
      errors: [],
      txtBusqueda: ''
    }
  },

  mounted () {
    this.listar()
  },

  methods: {

    listar () {
      Receta.get(this.txtBusqueda).then(response => {
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
