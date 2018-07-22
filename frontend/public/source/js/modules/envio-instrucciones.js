/**
 * var SendInstructions - Methods to send instructions using input or email
 * @module js/modules
 * @requires js/vendor/jquery
 * @requires js/vendor/jquery.validate
 */
var SendInstructions = function(){
  'use strict';

  var exports = {};
  var dom = {}; // Object to save dom elements
  var events = {};


  // Initialize
  exports.init = function(parent_reference){
    catchDom(parent_reference);
    events.validateFrom();    
  }

  var catchDom = function(parent_reference){
    dom.parent           = $(parent_reference);
    dom.form             = dom.parent.find(".SendInstructions form");
    dom.email_input      = dom.form.find(".Input--email");
    dom.submit_button    = dom.form.find(".SendInstructions .Button");
    dom.button_container = dom.form.find(".SendInstructions .ButtonContainer");
  }

  var eventListeners = function() {

  };

  // Methods
  events.validateFrom = function(){

    // Add method to validate email format
    $.validator.addMethod("validEmail", function(value, element) {
      // allow any non-whitespace characters as the host part
      return this.optional( element ) || /^(?!\.)("([^"\r\\]|\\["\r\\])*"|(([-a-z0-9!#$%&"*+\/=?^_`{|}~]))(\.)?)*@[a-z0-9][\w\.-]*[a-z0-9]\.[a-z][a-z\.]*[a-z]$/i.test( value );
    }, "Complete un correo válido.");

    // Validate using jQuery validate
    dom.form.validate({
      onkeyup: function(element) {
        $(element).valid();
      },
      // errorClass: "error",
      submitHandler: function(form){
        var data = $(form).serialize(); // Save input number

        // Email input and submit button disabled
        dom.email_input.attr("disabled", "disabled");
        dom.submit_button.attr("disabled", "disabled");

        // Send data
        $.ajax({
          url: $(form).attr("action"),
          type: "post",
          data: data
        }).done(function(){

          // Email input and submit button enabled
          dom.email_input.val("").removeAttr("disabled");
          dom.submit_button.removeAttr("disabled");

          // Show sent icon
          dom.button_container.addClass("is-sent");

        }).fail(function(){
          console.log("Error: ajax fail");

        });
        return false;
      }
    });

    // Add validation rules
		dom.email_input.rules("add", {
			required: true,
      email: true,
      validEmail: true,
			messages: {
				required: "Ingrese su correo.",
				email: "Complete un correo válido.",
        validEmail: "Complete un correo válido."
			}
		});
  };

  return exports;

};
