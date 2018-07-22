/**
 * var InstructionsBy - Methods to get instructions by sms, e-mail, print
 * @module js/modules
 * @requires js/vendor/jquery
 * @requires js/vendor/jquery.validate
 */
var InstructionsBy = function(){
  "use strict";

  var exports = {};
  var dom = {}; // Object to save dom elements
  var events = {};

  // Initialize
  exports.init = function(parent_reference) {
    catchDom(parent_reference);
    // eventListeners();
    events.telephoneValidation();
    console.log(parent_reference)
  };

  var catchDom = function (parent_reference) {

    // Telephone elements
    dom.parent                     = $(parent_reference);
    dom.telephone_form             = dom.parent.find(".FormulariosInstrucciones-content .SendInformationButton--telephone form");
    dom.telephone_button_container = dom.parent.find(".FormulariosInstrucciones-content .SendInformationButton--telephone .SendInformationButton__content");
    dom.telephone_button           = dom.parent.find(".FormulariosInstrucciones-content .IconButton--telephone");
    dom.telephone_input            = dom.parent.find(".FormulariosInstrucciones-content .SendInformationButton--telephone .Input");
    // dom.checkbox_terms             = dom.parent.find(".PaymentTicket__footer__terms input");
    // dom.print_button               = dom.parent.find(".InstructionsBy .IconButton--print");

    // dom.location = $(".IconButton--location")
    // dom.checkbox_terms.on("click", function(){
    //   var self = $(this);

    //   if (!self.is(":checked")) {
    //     // Disable all buttons
    //     $("button").attr("disabled","disabled").addClass("is-disabled");
    //   } else {
    //     // Enable all buttons
    //     $("button").removeAttr("disabled").removeClass("is-disabled");
    //   }
    // });

  };

  var eventListeners = function(){

    // Print button: click events
  	// dom.print_button.on("click", function(){
  	// 	window.print();
  	// 	return false;
  	// });

    // $("[data-entity-name='pago-en-tienda']").on("click", function(){
    //   dom.location.attr("href", "http://www.teleingreso.es/web/buscador.php")
    // })
    //
    // $("[data-entity-name='abanca']").on("click", function(){
    //   dom.location.attr("href", "https://www.abanca.com/es/oficinas/")
    // })
  };

  events.telephoneValidation = function() {
    
    dom.telephone_input.mask('00000-00000', {placeholder: "_____-____"});

    dom.telephone_form.validate({
      onkeyup: function(element) {
        $(element).valid();   
        console.log(element)     
      },      
      ignore: [],
      rules: {
        telephone: {
          required: true,
          minlength: 11,
    			maxlength: 11,
        }
      },
      messages: {
        telephone: {
          required: "Ingrese su teléfono.",
          minlength: "Complete 10 dígitos.",
  				maxlength: "Ingrese 10 dígitos."
        }
      },
      invalidHandler: function(){

        // Show email input
        if (!dom.telephone_button_container.hasClass("is-displayed")) {
          dom.telephone_button_container.addClass("is-displayed");
        }
        dom.telephone_button.removeClass("is-sent"); // Remove sent icon

      },
      submitHandler: function() {
        console.log("send");
        events.sendInformationByTelephone();
        return false;
      }
    });
  };

  events.sendInformationByTelephone = function (method) {

    // Enable and clean controls
    var resetForm = function() {
      dom.telephone_input.val("").removeAttr("disabled");
      dom.telephone_button.removeAttr("disabled");
      dom.telephone_form.validate().resetForm();
    };

    // Successfull process
    var sucessfullProcess = function() {
      dom.telephone_button.addClass('is-sent'); //Add sent icon
      dom.telephone_button_container.removeClass('is-displayed');  //Hide email input
    };

    // Show error message
    var failureProcess = function(){
      dom.telephone_button_container.find("label.error").text("Ocurrió un error.").show();
    }

    // Disable form elements
    dom.telephone_input.attr("disabled", "disabled");
    dom.telephone_button.attr("disabled", "disabled");

    var destination_url = "";
    var data = dom.telephone_input.val();
    console.log(data);
    $.post(destination_url, data)
      .done(function(){
        console.log("success");
        resetForm();
        sucessfullProcess();
      })
      .fail(function(){
        console.log("failure");
        resetForm();
        failureProcess();
      });
  };

  return exports;
};
