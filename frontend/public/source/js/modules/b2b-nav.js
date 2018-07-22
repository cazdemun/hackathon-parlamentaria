var B2bNav = (function(){
  // Variables que se reutilizarán: referencias al DOM, variables estáticas, etc.
  var set = {
    nav_button: $('.B2bNav-item')
  };

  // Método de inicialización del módulo
  var init = function() {
    events.navegacion();
  };

  var events = {};
  events.navegacion = function() {
    set.nav_button.on('click', function(){

      var nom_boton_principal_activo = $('.MainNav-item.is-active').attr('data-nom');
      var seccion_principal_activa = $('.MainContent[data-nom="'+nom_boton_principal_activo+'"]');

      // Aplicamos estilos para el botón seleccionado
      seccion_principal_activa.find('.B2bNav-item').removeClass('is-active');
      $(this).addClass('is-active');

      // Cambiamos el contenido
      var nom_b2b_activo = $(this).attr('data-nom');
      MainContent.actualizarContenidoB2b(nom_b2b_activo);
    });
  };

  // Métodos publicos
  return {
    init: init
  };

})();
