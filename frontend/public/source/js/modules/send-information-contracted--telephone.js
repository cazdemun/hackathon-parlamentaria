/**
 * var SendInformationContractedTelephone - Methods to get instructions via sms
 * @module js/modules
 * @requires js/vendor/jquery
 * @requires js/vendor/jquery.validate
 * @requires js/vendor/jquery.mask
 */
var SendInformationContractedTelephone = function(selector){
  var dom = {};
  var events = {};
  var exports = {};

  exports.init = function() {
    catchDom();
    events.validateForm();
  };

  var catchDom = function(){
    dom.parent           = $(selector);
    dom.module           = dom.parent.find(".SendInformationContracted--telephone");
    dom.form             = dom.module.find(".SendInformationContracted__form");
    dom.button_container = dom.module.find(".SendInformationContracted__content");
    dom.button           = dom.module.find(".IconButton--telephone");
    dom.input            = dom.module.find(".Input");

  };

  events.validateForm = function(){

    dom.input.mask('00000-0000', {placeholder: "_____-____"});

    dom.form.validate({
      onkeyup: function(element) {
        $(element).valid();
      },
      ignore: [],
      rules: {
        telephone: {
          required: true,
          minlength: 10
        }
      },
      messages: {
        telephone: {
          required: "Ingrese su teléfono.",
          minlength: "Complete 9 dígitos."
  				// maxlength: "Ingrese máximo 9 dígitos."
        }
      },
      invalidHandler: function(){

        // Show email input
        if (!dom.button_container.hasClass("is-displayed")) {
          dom.button_container.addClass("is-displayed");
        }
        dom.button.removeClass("is-sent"); // Remove sent icon

      },
      submitHandler: function() {
        events.sendInformation();
        return false;
      }
    });
  };

  events.sendInformation = function() {

    // Enable and clean controls
    var resetForm = function() {
      dom.input.val("").removeAttr("disabled");
      dom.button.removeAttr("disabled");
      dom.form.validate().resetForm();
    };

    // Successfull process
    var sucessfullProcess = function() {

      dom.button.addClass('is-sent'); //Add sent icon
      dom.button_container.removeClass('is-displayed');  //Hide email input
    };

    // Show error message
    var failureProcess = function(){
      dom.button_container.find("label.error").text("Inténtalo de nuevo.").show();
    }

    // Disable form elements
    dom.button.attr("disabled", "disabled");
    dom.input.attr("disabled", "disabled");

    var destination_url = "";
    var data = dom.input.val();
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
