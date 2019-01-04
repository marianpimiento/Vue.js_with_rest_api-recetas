<template>
  <div id="app">

    <!-- Seccion del banner principal para el titulo -->
    <div class="jumbotron" style="
        background-image: url(https://static.wixstatic.com/media/441212_640c1cb265cc4e42b8375c30206b4ba5~mv2.jpg);
        background-size: cover;
        padding: 20px !important;">
      <div class="container align-center">
        <h1 class="display-4 text-center text-white"><b>Recetas de Cocina</b></h1>
      </div>
    </div>

    <a name="arriba"></a>
    <div class="container">

      <!-- <ul>
        <li v-for="(erro,index) of errors" :key="index">
          Campo <b>{{erro.field}}</b> - {{erro.defaultMessage}}
        </li>
      </ul> -->

      <!-- Seccion de formulario para creacion de receta -->
      <div class="card">
        <h5 class="card-header">{{tituloForm}}</h5>

        <div class="card-body">
          <form @submit.prevent="guardar">

            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="inputNombre">Nombre *</label>
                <input type="text" class="form-control" id="inputNombre" v-model="receta.nombre" required>
              </div>
              <div class="form-group col-md-4">
                <label for="inputTipo">Tipo de plato *</label>
                <select id="inputTipo" class="form-control" v-model="receta.tipoplato" required>
                  <option selected></option>
                  <option>Entrada</option>
                  <option>Plato fuerte</option>
                  <option>Postre</option>
                  <option>Bocadillo</option>
                  <option>Bebida</option>
                  <option>Otro</option>
                </select>
              </div>
              <div class="form-group col-md-2">
                <label for="inputPorciones">Porciones *</label>
                <input type="number" min="0" class="form-control" id="inputPorciones" v-model="receta.porciones" required>
              </div>
            </div>

            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="textareaIngredientes">Ingredientes *</label>
                <textarea class="form-control" id="textareaIngredientes" rows="3" v-model="receta.ingredientes" required></textarea>
              </div>
              <div class="form-group col-md-6">
                <label for="textareaPreparacion">Preparación *</label>
                <textarea class="form-control" id="textareaPreparacion" rows="3" v-model="receta.preparacion" required></textarea>
              </div>
            </div>

            <button @click="limpiarForm" type="button" class="btn btn-outline-info float-left">Limpiar</button>
            <button type="submit" class="btn btn-info float-right">Guardar</button>
          </form>
        </div>
      </div>

      <br>

      <!-- Titulo de recetas -->
      <div class="alert alert-info text-center" role="alert">
        <h3>Recetas</h3>
      </div>
      <br>
    
      <!-- Seccion de formulario para busqueda de receta por nombre -->
      <form @submit.prevent="listar">

          <div class="input-group mb-3">
            <input type="text" class="form-control" aria-label="Buscar por nombre" aria-describedby="basic-addon2" v-model="txtBusqueda">
            <!-- <input type="text" class="form-control" aria-label="Buscar por nombre" aria-describedby="basic-addon2" v-model="txtBusqueda"  @input="listar"> -->
            <div class="input-group-append">
              <button class="btn btn-info" type="submit">Buscar</button>
              <button @click="limpiarBusqueda" class="btn btn-outline-info" type="button">Limpiar</button>
            </div>
          </div>

      </form>

      {{recetas.length}} recetas encontradas
      <br><br>

      <!-- Seccion de presentacion de recetas -->
      <div class="card border-dark mb-3" v-for="receta of recetas" :key="receta.idrecetas">
        <div class="card-header">
          <b>{{receta.nombre}} ({{receta.porciones}} porciones) - {{receta.tipoplato}}</b>
          <button @click="eliminar(receta)" type="button" class="btn btn-outline-dark btn-sm float-right">Borrar</button>
          <button @click="editar(receta)" type="button" class="btn btn-outline-dark btn-sm float-right">Editar</button>
        </div>
        <div class="card-body text-dark">
          <dl class="row">
            <dt class="col-md-3">Ingredientes</dt>
            <dd class="col-md-9">{{receta.ingredientes}}</dd>

            <dt class="col-md-3">Preparación</dt>
            <dd class="col-md-9">{{receta.preparacion}}</dd>
          </dl>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
import Receta from './../services/recetas'

export default {

  data () {
    return {
      receta: {
        idrecetas: 0,
        nombre: '',
        tipoplato: '',
        porciones: 0,
        ingredientes: '',
        preparacion: ''
      },
      recetas: [],
      errors: [],
      txtBusqueda: '',
      tituloForm: 'Crear receta'
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
            // this.errors = e
            alert('Error: No se ha podido completar la creación')
        })
      } else {
        Receta.update(this.receta).then(response => {
          this.receta = {}
          alert('Actualizado')
          this.listar()
          this.errors = []
          this.tituloForm = 'Crear receta'
        }).catch(e => {
          // console.log(e.response.data.errors)
          // this.errors = e.response.data.errors
          console.log(e)
          // this.errors = e
          alert('Error: No se ha podido realizar la actualización')
        })
      }
    },

    editar (receta) {
      this.receta = receta
      this.tituloForm = 'Actualizar receta'
      window.location.href = "#arriba"
    },

    eliminar (receta) {
      if(confirm('¿Desea eliminar la receta?')){
        Receta.delete(receta).then(response => {
          this.listar()
          this.errors = []
        }).catch(e => {
            // this.errors = e.response.data.errors
            console.log(e)
            // this.errors = e
            alert('Error: No se ha eliminado la receta')
        })
      }
      this.receta = {}
    },

    limpiarBusqueda (receta) {
      this.txtBusqueda = ''
      this.listar()
    },

    limpiarForm (receta) {
      this.receta = {}
      this.tituloForm = 'Crear receta'
    },
  }
}
</script>
