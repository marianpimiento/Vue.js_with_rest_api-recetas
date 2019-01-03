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
            <th>Opciones</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>Pie de manzana</td>
            <td>Postre</td>
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