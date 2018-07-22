var BuscadorEntidades = (function(){

  var dom = {
    b2b_button           : $('.B2bNav-item'),
    input_buscador       : $('.BuscadorEntidades .InputText--buscador'),
    lista_resultados     : $('.BuscadorEntidades-listaResultados'),
    box_parte_resultados : $('.BuscadorEntidades-paginador .contador .muestra'),
    // box_total_resultados : $('.BuscadorEntidades-paginador .contador .total')
  };

  var DATA_ENTIDADES               = {};
  var LISTA_ENTIDADES              = {};
  var B2B_ACTIVO                   = {};
  // var TOTAL_RESULTADOS_ENCONTRADOS = 0;

  var init = function() {
    events.cargarJSON();
    events.watchB2bActivo();
    events.seleccionarResultado();
  };

  var events = {};

  /**
   * Detecta que botón b2b está activo para usarlo al hacer la búsqueda
   * de entidades.
   * @return nothing
   */
  events.watchB2bActivo = function() {

    //Obtenemos el botón activo por defecto
    B2B_ACTIVO = $('.MainContent.is-visible .B2bNav-item.is-active').attr('data-nom');

    dom.b2b_button.on('click', function(){
      B2B_ACTIVO = $(this).attr('data-nom');
    });
  };

  // Cagar todos los datos de las entidades
  events.cargarJSON = function() {
    $.ajax({
      dataType: "json",
      url: 'data/entidades.json',
      success: function(data){
        DATA_ENTIDADES = data;
        events.habilitarBusqueda();
      }
    });
  };

  // Buscar cada vez que se ingrese un caracter
  events.habilitarBusqueda = function() {

//    $(document).on('keyup','.BuscadorEntidades .InputText--buscador', function() {
    //})
    dom.input_buscador.on('keyup', function(){
      var texto = $(this).val();
      events.buscarEnJSON(texto);
    });
  };

  // Recorrer la data de entidades para buscar lo ingresado
  events.buscarEnJSON = function(texto_ingresado) {

    // Limpiamos la lista de resultados
    dom.lista_resultados.html('').removeClass('is-visible');
    // TOTAL_RESULTADOS_ENCONTRADOS = 0;

    dom.box_parte_resultados.text(0);
    // dom.box_total_resultados.text(0);

    var slide_name;

    texto_ingresado = texto_ingresado.toLowerCase();
    if (texto_ingresado !== '') {

      if (B2B_ACTIVO === 'sucursal') {
        slide_name = 'sucursal';
        LISTA_ENTIDADES = DATA_ENTIDADES.sucursales;
      } else if(B2B_ACTIVO === 'tiendas'){
        slide_name = 'tiendas';
        LISTA_ENTIDADES = DATA_ENTIDADES.tiendas;
      }

      // Recorrido de data
      $.each(LISTA_ENTIDADES, function(key, value) {
        var nombre_entidad = value.name.toLowerCase();

        // Si existe una coincidencia, agregamos el resultado a la lista yla desplegamos
        if ( nombre_entidad.indexOf(texto_ingresado) > -1 ) {
          // TOTAL_RESULTADOS_ENCONTRADOS++;

          // Mostramos par de resultados que se está mostrando
          // if (TOTAL_RESULTADOS_ENCONTRADOS >= 5) {
          //   dom.box_parte_resultados.text('5');
          // } else {
          //   dom.box_parte_resultados.text(TOTAL_RESULTADOS_ENCONTRADOS);
          // }

          // Mostramos el número total de resultados encontrados
          // dom.box_total_resultados.text(TOTAL_RESULTADOS_ENCONTRADOS);

          // Agregamos un resultado ala lista para mostrarlo en el DOM
          events.desplegarResultados(value.name, value.cod_name, slide_name);
        }
      });
    }
  };

  // Desplegar la lista de resultado encontrados
  events.desplegarResultados = function(name, code_name, slide_name) {
    dom.lista_resultados.addClass('is-visible');
    dom.lista_resultados.append('<div class="BuscadorEntidades-itemResultados" data-slide-name="'+slide_name+'" data-nombre-entidad="'+code_name+'">'+name+'</div>');
  };

  events.seleccionarResultado = function() {
    $('body').on('click', '.BuscadorEntidades-itemResultados', function() {
      var self = $(this);
      SlideFinancieras.navigateSlideTo(self.attr('data-nombre-entidad'), self.attr('data-slide-name'));

      // Limpiamos la caja de búsqueda y los contadores de resultados
      dom.input_buscador.val('');
      dom.box_parte_resultados.text(0);
      // dom.box_total_resultados.text(0);

      // Ocultamos la lista de resultados.
      dom.lista_resultados.removeClass('is-visible');
    });
  };

  return {
    init: init
  };
})();
