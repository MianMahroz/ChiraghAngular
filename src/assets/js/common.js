$( window ).on( "load", function() { 
  $('#ucSlider .carousel-item').each(function(){
    var next = $(this).next();
    if (!next.length) {
    next = $(this).siblings(':first');
    }
    next.children(':first-child').clone().appendTo($(this));
    
    for (var i=0;i<1;i++) {
      next=next.next();
      if (!next.length) {
          next = $(this).siblings(':first');
      }
      
      next.children(':first-child').clone().appendTo($(this));
    }
  });
  $('#simsSlider .carousel-item').each(function(){
    var next = $(this).next();
    if (!next.length) {
    next = $(this).siblings(':first');
    }
    next.children(':first-child').clone().appendTo($(this));
    
    for (var i=0;i<1;i++) {
      next=next.next();
      if (!next.length) {
          next = $(this).siblings(':first');
      }
      
      next.children(':first-child').clone().appendTo($(this));
    }
  });
  // $('#ucSlider').on('slide.bs.carousel', function (e) {
  //   /*

  //   CC 2.0 License Iatek LLC 2018
  //   Attribution required
    
  //   */

  //   var $e = $(e.relatedTarget);
  //   var idx = $e.index();
  //   var itemsPerSlide = 3;
  //   var totalItems = $('.block-item').length;
    
  //   if (idx >= totalItems-(itemsPerSlide-1)) {
  //       var it = itemsPerSlide - (totalItems - idx);
  //       for (var i=0; i<it; i++) {
  //           // append slides to end
  //           if (e.direction=="left") {
  //               $('.block-item').eq(i).appendTo('.block-inner');
  //           }
  //           else {
  //               $('.block-item').eq(0).appendTo('.block-inner');
  //           }
  //       }
  //   }
  // });
  

  var checkitem = function() {
    var $this;
    $this = $("#ucSlider");
    if ($("#ucSlider .block-inner .block-item:first").hasClass("active")) {
      $this.children(".carousel-control-prev").hide();
      $this.children(".carousel-control-next").show();
    } else if ($("#ucSlider .block-inner .block-item:last").hasClass("active")) {
      $this.children(".carousel-control-next").hide();
      $this.children(".carousel-control-prev").show();
    } else {
      $this.children(".control-btn").show();
    }
  };

  checkitem();

  $("#ucSlider").on("slid.bs.carousel", "", checkitem);



  var checkitem = function() {
    var $this;
    $this = $("#simsSlider");
    if ($("#simsSlider .block-inner2 .block-item2:first").hasClass("active")) {
      $this.children(".carousel-control-prev").hide();
      $this.children(".carousel-control-next").show();
    } else if ($("#simsSlider .block-inner2 .block-item2:last").hasClass("active")) {
      $this.children(".carousel-control-next").hide();
      $this.children(".carousel-control-prev").show();
    } else {
      $this.children(".control-btn").show();
    }
  };
  checkitem();

  $("#simsSlider").on("slid.bs.carousel", "", checkitem);
  // $('#acceptBiducSlider').on('slide.bs.carousel', function (e) {
  //   /*

  //   CC 2.0 License Iatek LLC 2018
  //   Attribution required
    
  //   */

  //   var $e = $(e.relatedTarget);
  //   var idx = $e.index();
  //   var itemsPerSlide = 3;
  //   var totalItems = $('.block-item-ab').length;
    
  //   if (idx >= totalItems-(itemsPerSlide-1)) {
  //       var it = itemsPerSlide - (totalItems - idx);
  //       for (var i=0; i<it; i++) {
  //           // append slides to end
  //           if (e.direction=="left") {
  //               $('.block-item-ab').eq(i).appendTo('.block-inner-ab');
  //           }
  //           else {
  //               $('.block-item-ab').eq(0).appendTo('.block-inner-ab');
  //           }
  //       }
  //   }
  // });

  (function() {
    'use strict';
    window.addEventListener('load', function() {
      // Fetch all the forms we want to apply custom Bootstrap validation styles to
      var forms = document.getElementsByClassName('common-form');
      // Loop over them and prevent submission
      var validation = Array.prototype.filter.call(forms, function(form) {
        form.addEventListener('submit', function(event) {
          if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
          }
          form.classList.add('was-validated');
        }, false);
      });
    }, false);
  })();    

  $(function(){
   var shrinkHeader = 300;
    $(window).scroll(function() {
      var scroll = getCurrentScroll();
        if ( scroll >= shrinkHeader ) {
            $('.header').addClass('shrink');
          }
          else {
            $('.header').removeClass('shrink');
          }
    });
  function getCurrentScroll() {
    return window.pageYOffset || document.documentElement.scrollTop;
    }
  }); 


  $('.btn-view-images').click(function(){
    $('body').addClass('overflow-hidden');
  });
  $('.close').click(function(){
    $('body').removeClass('overflow-hidden');
  });

  $(".facilities-checkboxes-wrap > div:gt(0)").hide();
  $("#facilities-shows").click(function(){
      $(this).siblings("div:gt(0)").slideToggle('slow'); 
      $(this).text($(this).text() == "Show all" ? "Show less" : "Show all");
  });

  $(".features-checkboxes-wrap > div:gt(0)").hide();
  $("#features-shows").click(function(){
      $(this).siblings("div:gt(0)").slideToggle('slow'); 
      $(this).text($(this).text() == "Show all" ? "Show less" : "Show all");
  });

  $(".features-checkboxes-wrap > div:gt(0)").hide();
  $("#features-shows-round").click(function(){
      $(this).siblings("div:gt(0)").slideToggle('slow'); 
      $(this).text($(this).text() == "Show all" ? "Show less" : "Show all");
  });

  $(".facilities-checkboxes-wrap > div:gt(0)").hide();
  $("#facilities-shows-round").click(function(){
      $(this).siblings("div:gt(0)").slideToggle('slow'); 
      $(this).text($(this).text() == "Show all" ? "Show less" : "Show all");
  });

  $(".ni-checkboxes-wrap > div:gt(0)").hide();
  $("#ni-shows-round").click(function(){
      $(this).siblings("div:gt(0)").slideToggle('slow'); 
      $(this).text($(this).text() == "Show all" ? "Show less" : "Show all");
  });


  
  $('.advance-search-link').click(function() {
    $('.slider-search-btn-top').toggle();
  });
  $('.circle-plus').on('click', function(){
    $(this).toggleClass('opened');
  });

  $('select').each(function(){
    $(this).find('option:first').prop('selected', 'selected');
  });
  $('select').change(function() {
    if ($(this).children('option:first-child').is(':selected')) {
      $(this).addClass('placeholder');
    } else {
     $(this).removeClass('placeholder');
    }
  });
});	

