var MainContent = (function(){
    $('.modal').modal();
    $('select').formSelect();
    $('.collapsible').collapsible();
    $(".firma").on("click", function(){
            console.log("entro")
            $("#fountainG").addClass("is-visible")
            $(".ready-reload").removeClass("is-visible")
            setTimeout(function(){ $(".ready-reload").addClass("is-visible")
            $("#fountainG").removeClass("is-visible") }, 5000);           
    })
})();
