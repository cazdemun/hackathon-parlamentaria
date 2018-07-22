var MainContent = (function(){

  var events = {};
  events.actualizarContenidoPrincipal = function() {
    var nom_boton_principal_activo = $('.MainNav-item.is-active').attr('data-nom');

    $('.MainContent').removeClass('is-visible');
    $('.MainContent[data-nom="'+nom_boton_principal_activo+'"]').addClass('is-visible');

    // Acomodamos los slides
    $('.SlideFinancieras-list').slick('setPosition');   

  };

  // Cambiar los slides
  events.actualizarContenidoB2b = function(nom_b2b_activo) {
    var nom_boton_principal_activo = $('.MainNav-item.is-active').attr('data-nom');
    var seccion_principal_activa = $('.MainContent[data-nom="'+nom_boton_principal_activo+'"]');
    seccion_principal_activa.find('.SlideFinancieras').removeClass('is-visible');
    var slide_destino = seccion_principal_activa.find('.SlideFinancieras[data-nom="'+nom_b2b_activo+'"]');
    slide_destino.addClass('is-visible');

    // Acomodamos los slides
    $('.SlideFinancieras-list').slick('setPosition');

    // Simulamos el "Click en el banco" con la clase "seleccionado"
    slide_destino.find('a.link.seleccionado').click();
  };

  // Contenido que va dentro del bloque "ProcedimientoPago"
  events.actualizarContenidoIProcedimientoPago = function(nombre_entidad) {
    var nom_boton_principal_activo_b2b = $('.MainContent.is-visible').attr('data-nom');
    var nom_boton_principal_activo = $('.MainNav-item.is-active').attr('data-nom');

    var seccion_principal_activa_b2b = $('.MainContent[data-nom="'+nom_boton_principal_activo_b2b+'"]');
    var seccion_principal_activa = $('.MainContent[data-nom="'+nom_boton_principal_activo+'"]');
    var nom_b2b_activa = seccion_principal_activa.find('.B2bNav-item.is-active').attr('data-nom');

    // Cambiamos los SLIDES
    var cambiarTicket = (function(){
      // Ocultamos todos las cajas que contienen tickets
      seccion_principal_activa_b2b.find('.Ticket').removeClass("is-visible");
      // seccion_principal_activa.find('.GrupoTickets--tiendas').addClass('is-visible');

      // Idetificamos la caja "GrupoTickets"
      var boxGrupoTickets_b2b = seccion_principal_activa_b2b.find('.Ticket[data-nom-entidad='+nombre_entidad+']');
      var boxGrupoTickets = seccion_principal_activa.find('.GrupoTickets[data-nom='+nom_b2b_activa+']');

      // Mostramos la caja "GrupoTickets"
      boxGrupoTickets_b2b.addClass("is-visible");
      // boxGrupoTickets.addClass("is-visible");

      // Ocultamos el Ticket de pago específico
      boxGrupoTickets_b2b.find('.Ticket').removeClass('is-visible');
      // boxGrupoTickets.find('.Ticket').removeClass('is-visible');
      // Mostramos el Ticket que corresponde al banco seleccionado

      var lista_tienda_genericas = [
        'walmart',
        'farmacias-ahorro',
        'farmacias-benavides',
        'bodega-aurrera',
        'superama',
        'sams-club',
        'el-asturiano',
        'circulo-k',
        'airpack',
        'farmacias-guadalajara',
        'kiosko',
        'extra',
        'waldos',
        'alsuper',
        'one',
        'prendamex',
        'gestopago',
        'maxilana',
        'atiendas',
        'te-creemos',
        'multirecargas',
        'pagorapido',
        'el-vigilante',
        'farmacias-bazar',
        'caja-cerro-silla',
        'financiera-cefemex',
        'petro-fe',
        'laoriginal',
        'caja-solidaria-tamaulipas',
        'caja-cerro-silla',
        'especias-moy',
        'mi-adelanto',
        'venayuda',
        'grupo-pawn',
        'paso-seguro',
        'servicios-prendarios-sureste',
        'indigo',
        'superprestamos-premier',
        'torcam',
        'akala',
        'dnu',
        'servimoney',
        'financiera-forjadores',
        'grupo-aguila',
        'alamano',
        'el-gallo-de-la-laguna',
        'mexamed',
        'grupo-blyska',
        'peso-facil',
        'gwv-inversiones'
      ];
      var flag_tienda_generica = lista_tienda_genericas.indexOf(nombre_entidad);
      var ticket_destino;

      if (flag_tienda_generica === -1) {
        ticket_destino = boxGrupoTickets_b2b.find('.Ticket[data-nom-entidad="'+nombre_entidad+'"]');

      } else {
        ticket_destino = boxGrupoTickets.find('.Ticket[data-nom-entidad="generica"]');
      }
      ticket_destino.addClass('is-visible');

    })();


  };

  return {
    actualizarContenidoPrincipal: events.actualizarContenidoPrincipal,
    actualizarContenidoB2b: events.actualizarContenidoB2b,
    actualizarContenidoIProcedimientoPago: events.actualizarContenidoIProcedimientoPago
  };
})();
