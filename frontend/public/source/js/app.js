// Inicializamos los módulos
$(function(){
  var App = {};
  // Countries dropdown
  App.countries_dropdown = new CountriesDropdown();
  App.countries_dropdown.init();

  MainNav.init();
  B2bNav.init();
  // BuscadorEntidades.init();
  SlideFinancieras.init();
  Ticket.init();
  // EnvioInstrucciones.init();
});
