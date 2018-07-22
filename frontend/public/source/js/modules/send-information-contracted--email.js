/**
 * var SendInformationContractedEmail - Methods to get instructions via email
 * @module js/modules
 * @requires js/vendor/jquery
 * @requires js/vendor/jquery.validate
 */
var SendInformationContractedEmail = function(selector) {
  "use strict";
  
  var dom = {};
  var events = {};
  var exports = {};

  exports.init = function() {
    catchDom();
    events.validateForm();
  };

  var catchDom = function() {
    dom.parent           = $(selector);
    dom.module           = dom.parent.find(".SendInformationContracted--email");
    dom.form             = dom.module.find(".SendInformationContracted__form");
    dom.button_container = dom.module.find(".SendInformationContracted__content");
    dom.button           = dom.module.find(".IconButton--email");
    dom.input            = dom.module.find(".Input--email");
  };

  events.validateForm = function() {

    // Add method to validate email format
    $.validator.addMethod("validEmail", function(value, element) {
      // allow any non-whitespace characters as the host part
      return this.optional(element) || /^(?!\.)("([^"\r\\]|\\["\r\\])*"|(([-a-z0-9!#$%&"*+\/=?^_`{|}~]))(\.)?)*@[a-z0-9][\w\.-]*[a-z0-9]\.[a-z][a-z\.]*[a-z]$/i.test(value);
    }, "Complete un correo válido.");

    dom.form.validate({
      onkeyup: function(element) {
        $(element).valid();
      },
      ignore: [],
      rules: {
        email: {
          required: true,
          email: true,
          validEmail: true
        }
      },
      messages: {
        email: {
          required: "Ingrese su correo.",
          email: "Complete un correo válido."
        }
      },
      invalidHandler: function() {

        // Show email input
        if (!dom.button_container.hasClass("is-displayed")) {
          dom.button_container.toggleClass("is-displayed");
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
      dom.button_container.removeClass('is-displayed'); //Hide email input
    };

    // Show error message
    var failureProcess = function() {
      dom.button_container.find("label.error").text("Inténtanlo de nuevo.").show();
    }

    // Disable form elements
    dom.button.attr("disabled", "disabled");
    dom.input.attr("disabled", "disabled");

    var destination_url = "";
    var data = dom.input.val();
    $.post(destination_url, data)
      .done(function() {
        console.log("success");
        resetForm();
        sucessfullProcess();
      })
      .fail(function() {
        console.log("failure");
        resetForm();
        failureProcess();
      });
  };

  return exports;
};
