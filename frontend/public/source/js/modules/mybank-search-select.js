/**
 * var MyBankSearchSelect
 * @module js/modules
 * @requires js/vendor/jquery
 * @requires js/vendor/select2
 *
 */
var MyBankSearchSelect = function(file_path, slide_instance) {
  "use strict";

  var dom = {};

  var global = {};
  var exports = {};
  var events = {};
  var DATA_ENTIDADES = {};
  var LISTA_ENTIDADES              = {};
  var B2B_ACTIVO           = {};
  var slide_name;
  /**
   * Component initializer
   * @param {string} file_path - JSON file path
   */
  exports.init = function() {
    catchdom();
    
    if (file_path === undefined) {
      return false;
    }

    /**
     * @param {string} file_path - Path of JSON data file
     * @param {object} - Callback function to recive data loaded
     */
    events.loadData(file_path, function(data) {      
      if (data !== "error") {
        DATA_ENTIDADES = data;
        console.log(DATA_ENTIDADES);  
        events.watchB2bActivo();
        events.initSelect2(DATA_ENTIDADES);  
        // getIntitution()   
      }
    });   
    
     
  };  

 // Save dom elements
  var catchdom = function() {
    dom.banks_list = $(".MyBankSearchSelect__list");
    dom.b2b_button = $('.B2bNav-item')    
  };  

  events.watchB2bActivo = function() {
    
    //Obtenemos el botón activo por defecto
    
    console.log("click")
    B2B_ACTIVO = $('.B2bNav-item.is-active').attr('data-nom');

    dom.b2b_button.on('click', function(){
      B2B_ACTIVO = $(this).attr('data-nom');
      console.log(B2B_ACTIVO)
      // getIntitution()
      events.initSelect2(DATA_ENTIDADES);
    });
    // getIntitution()
  };

  events.createNiceScroll = function() {

    $(".MyBankSearchSelect .select2-results__options").niceScroll({
      autohidemode: false,
      cursorcolor:"#404040",
      cursoropacitymin: 0, // change opacity when cursor is inactive (scrollabar "hidden" state), range from 1 to 0
      cursoropacitymax: 0.7, // change opacity when cursor is active (scrollabar "visible" state), range from 1 to 0
      cursorwidth:"9px"
    });

  };


  events.initSelect2 = function(data) {
    // $(".MyBankSearchSelect").html('').select2();  
    
    //Buscar evento refresh de select2
    dom.banks_list.select2({
      dropdownParent: $(".MyBankSearchSelect"),
      placeholder: "Buscar lugar de pago",
      multiple: true,
      maximumSelectionLength: 1,
      minimumInputLength: 1,
      data: getIntitution(),
      language: {
        noResults: function(term) {
          return "No se encontraron resultados.";
        },
        inputTooShort: function () {
          return "Ingresar lugar de pago.";
        },
        maximumSelected: function() {
          return "Puedes realizar otra búsqueda.";
        }
      }
    });
    
    dom.banks_list.on('select2:open', function (e) {
      events.createNiceScroll();
    });   


    dom.banks_list.on("select2:select", function (e) {
      var data = e.params.data;           
      slide_instance.navigateSlideTo(data.id, slide_name);    
    });    
    
  };

  function getIntitution(){
    console.log(B2B_ACTIVO);
    if (B2B_ACTIVO == 'sucursal') {
      slide_name = 'sucursal';
    dom.banks_list.html('').select2(DATA_ENTIDADES.tiendas); 
     return DATA_ENTIDADES.entidades;
    } else{
      slide_name = 'tiendas';
      console.log('tiendas data');
      dom.banks_list.html('').select2(DATA_ENTIDADES.entidades); 
      return DATA_ENTIDADES.tiendas;
    } 
  }

  /**
   * events.loadData - Load data of JSON file
   *
   * @param  {string} file_path - JSON file path to load
   * @param  {object} fn - Callback function
   * @return {json} - List of banks
   */
  events.loadData = function(file_path, fn) {

    $.ajax({
      dataType: "json",
      url: file_path,
    }).done(function(data) {
      fn(data);
    }).error(function(err) {
      fn("error")
    });
  };

  return exports;
};
