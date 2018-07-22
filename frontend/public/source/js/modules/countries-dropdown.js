/**
 * var CountriesDropdown - Methods for c-CountriesDropdown component
 * @module js/modules
 * @requires js/vendor/jquery
 * @requires js/vendor/select2
 * @requires js/vendor/jquery.nicescroll
 *
 */

var CountriesDropdown = function(){
  "use strict";
  var exports = {};
  var dom = {};
  var events = {};

  var catchdom = function() {
    dom.module = $(".GrupoDropdown");
    dom.countries_select = document.getElementById("dropdown");
  };

  // Initialize
  exports.init = function(file_path) {
    catchdom();
    events.selectedCountry();  
    events.createDropdown();     
  };

  // var eventListeners = function () {
  //   // On select item
  //   dom.countries_select.on("select2:select", function (event) {
  //     console.log(event)
  //   });
  // };

  // Create custom dropdown suing select2 plugin
  events.createDropdown = function(){
    $(".select-styled").bind("DOMSubtreeModified",function(){
      var strUser = $(".select-styled").text().toUpperCase()
      $(".espacios-content").removeClass("is-visible")
      console.log(strUser)
      if(strUser=="ESPACIOS"){
        $(".magazines").addClass("is-visible")
      }
      if(strUser=="ESPACIOS FUERA DE LIMA"){
        $(".magazines-provincia").addClass("is-visible")
      }
      if(strUser=="ESPACIOS POR ESTILOS"){
        $(".magazines-estilos").addClass("is-visible")
      }
    });
  };

  // On country selected
  events.selectedCountry = function(country_id){
    $('select').each(function(){
      var $this = $(this), numberOfOptions = $(this).children('option').length;
    
      $this.addClass('select-hidden'); 
      $this.wrap('<div class="select"></div>');
      $this.after('<div class="select-styled"></div>');
  
      var $styledSelect = $this.next('div.select-styled');
      $styledSelect.text($this.children('option').eq(0).text());
    
      var $list = $('<ul />', {
          'class': 'select-options'
      }).insertAfter($styledSelect);
    
      for (var i = 0; i < numberOfOptions; i++) {
          $('<li />', {
              text: $this.children('option').eq(i).text(),
              rel: $this.children('option').eq(i).val()
          }).appendTo($list);
      }
    
      var $listItems = $list.children('li');
    
      $styledSelect.click(function(e) {
          e.stopPropagation();
          $('div.select-styled.active').not(this).each(function(){
              $(this).removeClass('active').next('ul.select-options').hide();
          });
          $(this).toggleClass('active').next('ul.select-options').toggle();
          
      });
    
      $listItems.click(function(e) {
          e.stopPropagation();
          $styledSelect.text($(this).text()).removeClass('active');
          $this.val($(this).attr('rel'));
          $list.hide();          
      });
    
      $(document).click(function() {
          $styledSelect.removeClass('active');
          $list.hide();
      });
      console.log("finished")
    });   
  };   
  return exports;
};
