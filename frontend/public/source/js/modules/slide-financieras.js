var SlideFinancieras = (function(){
  "use strict";
  var exports = {};
  var dom = {};

  var init = function(){
    events.crearSlide('.SlideFinancieras--ciudades'); // Slide de Banca por Internet - Personas
    events.crearSlide('.SlideFinancieras--generos'); // Slide de Pago en efectivo - Sucursal

    events.seleccionEntidad(); // Eventos cuando se selecciona un banco
    $(".SlideFinancieras-list a.is-selected").click();
    // events.watchB2bActivo();
  };
  
  
  var events = {};
  


  events.refreshAllSlides = function(){
    $('.SlideFinancieras-list').slick('setPosition');
  };

 /**
  * Crea lo slides de manera dinámica
  * @param  {string} slide_main_wrapper [div padre que contiene a la lista de bancos]
  * @return nothing
  */

  events.crearSlide = function(slide_main_wrapper){

    // Usamos el nombre que recibimos como parámetro para
    // crear dinámicamente cada slide
    var slide_wrapper   = $(slide_main_wrapper).find('.SlideFinancieras-slideWrapper');
    var slide           = $(slide_main_wrapper).find('.SlideFinancieras-list');
    var buttons_wrapper = $(slide_main_wrapper).find('.SlideFinancieras-listButtons');

    slide.slick({
      infinite: false,
      slidesToShow: 1,
      slidesToScroll: 1,
      appendArrows: buttons_wrapper,
      prevArrow: '<div class="slideButton slideButton--prev"><i class="icon"></i></div>',
      nextArrow: '<div class="slideButton slideButton--next"><i class="icon"></i></div>',
      speed: 250,
      cssEase: 'linear',
      focusOnSelect: false,
      reponsive: false,
      adaptiveHeight: true
    });

    var nom_boton_principal_activo = $('.MainNav-item.is-active').attr('data-nom');   
    var seccion_principal_activa = $('.MainContent[data-nom="'+nom_boton_principal_activo+'"]');
    
    $(".slideButton").on("click", function(){
      seccion_principal_activa.find('.SlideFinancieras--pagoEfectivoTiendas').removeClass('is-visible');

      if ($(".SlideFinancieras").hasClass("SlideFinancieras--pagoEfectivoTiendas is-visible")) {
        var self = $(".SlideFinancieras--pagoEfectivoTiendas.is-visible");
        var first_item = self.find(".SlideFinancieras-item.slick-active").find(".link-wrapper").first();
        first_item.children("a").click();
      }

      else{

        var first_item = $('.MainContent.is-visible').find(".SlideFinancieras-item.slick-active").find(".link-wrapper").first();
        first_item.children("a").click();
      }
      
      // else if (seccion_principal_activa === "banca-internet"){
      //   console.log("entra a internet")
        
      //   var first_item = $('.MainContent.is-visible').find(".SlideFinancieras-item.slick-active").find(".link-wrapper").first();
      //   first_item.children("a").click();
      // }

    })

    // Eventos después se pase deun elemento a otro
    slide.on('afterChange', function(event, slick, direction){
      var btn_prev = slick.$prevArrow;
      var btn_next = slick.$nextArrow;

      // Agregamos o retiramos el espaciado izquierdo para la flecha
      if (btn_prev.hasClass("slick-disabled")) {

        slide_wrapper.removeClass("padding_left");
        slide_wrapper.removeClass("no_padding_right");

      } else if (btn_next.hasClass("slick-disabled")) {

        slide_wrapper.addClass("no_padding_right");
        slide_wrapper.addClass("padding_left");

      } else {
        slide_wrapper.addClass("padding_left");
        slide_wrapper.removeClass("no_padding_right");
      }
    });
  };

  events.navigateSlideTo = function(nombre_entidad, nombre_slide) {

    // Reconocemos el slide al que debemos mover
    var target_slide = $('.MainContent.is-visible').find('.SlideFinancieras[data-nom="'+nombre_slide+'"] .SlideFinancieras-list');

    // Buscamos la posición del resultado seleccionado
    var item_slide_seleccionado = target_slide.find('.link-wrapper .link[data-nom-entidad="'+nombre_entidad+'"]');
    var pos_resultado = item_slide_seleccionado.parents('.SlideFinancieras-item').index();

    target_slide.slick('slickGoTo', parseInt(pos_resultado));
    item_slide_seleccionado.click();
  };

  // Reacomodamos los slides

  events.seleccionEntidad = function() {
    var entidad_button = $('.SlideFinancieras-list a.link');
    entidad_button.on('click', function(event){
      event.preventDefault();
      var self = $(this);

      // Cambios de estilos al seleccionar un banco
      self.parents('.SlideFinancieras-list').find('a.link').removeClass("seleccionado");
      self.addClass("seleccionado");

      // Cambiamos el contenido según el botón principal activo
      var nombre_entidad = self.attr('data-nom-entidad');
      MainContent.actualizarContenidoIProcedimientoPago(nombre_entidad);
    });

  };

  return {
    init: init,
    refreshAllSlides: events.refreshAllSlides,
    navigateSlideTo: events.navigateSlideTo
    // watchB2bActivo : events.watchB2bActivo
  };
})();
