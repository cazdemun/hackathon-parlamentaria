var Ticket = (function(){
  var init = function() {
    events.customCheckBox();
  };

  var dom = {};
  var events = {};
  events.customCheckBox = function() {
    dom.module = $(".ProcedimientoPago");
    dom.action_buttons = $(".BotonCallToAction, .IconButton--email, .IconButton--telephone, .Button");
    dom.checkbox_terms = dom.module.find(".Ticket-terminos input");

    dom.checkbox_terms.on("click", function() {
      var self = $(this);

      if (!self.is(":checked")) {

        // Disable all buttons
        dom.action_buttons.attr("disabled", "disabled");
      } else {
        // Enable all buttons
        dom.action_buttons.removeAttr("disabled");
      }
    });
  };

  return {
    init:init
  };
})();

