$(document).ready(function(){

  $(window).scrollTop(0);

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
  $('#caSlider .carousel-item').each(function(){
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



  var date_input=$('input[for="date"]');
  var container=$('.bootstrap-iso').length>0 ? $('.bootstrap-iso').parent() : "body";
  var options={
    format: 'dd/mm/yyyy',
    container: container,
    orientation: "top right",
    todayHighlight: true,
    autoclose: true,
  };
  date_input.datepicker(options);


  var checkitem = function() {
    var $this;
    $this = $("#caSlider");
    if ($("#caSlider .block-inner3 .block-item3:first").hasClass("active")) {
      $this.children(".carousel-control-prev").hide();
      $this.children(".carousel-control-next").show();
    } else if ($("#caSlider .block-inner3 .block-item3:last").hasClass("active")) {
      $this.children(".carousel-control-next").hide();
      $this.children(".carousel-control-prev").show();
    } else {
      $this.children(".control-btn").show();
    }
  };

  checkitem();

  $("#caSlider").on("slid.bs.carousel", "", checkitem);

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


  $(".prop-stat-select").change(function(){
    if($.trim($(this).val()) === "other"){
      $('.other-input-form').removeClass('input-disabled');
    }
  });

  $('.btn-view-images').click(function(){
    $('body').addClass('overflow-hidden');
  });
  $('.close').click(function(){
    $('body').removeClass('overflow-hidden');
  });

  $("#personalInfoEdit").click(function(){
    $("#personalInfoForm").removeClass('disabled');
    $(this).hide();
    $("#personalInfoSave").show('slow');
    $("#personalInfoCancel").show('slow');
  });

  $("#personalInfoSave, #personalInfoCancel").click(function(){
    $("#personalInfoForm").addClass('disabled');
    $("#personalInfoSave, #personalInfoCancel").hide('slow');
    $("#personalInfoEdit").show('slow');
  });

  $("#contactDetailSave, #contactDetailCancel").click(function(){
    $("#contactDetailForm").addClass('disabled');
    $("#contactDetailSave, #contactDetailCancel").hide('slow');
    $("#contactDetailEdit").show('slow');
  });


  $("#contactDetailEdit").click(function(){
    $("#contactDetailForm").removeClass('disabled');
    $(this).hide();
    $("#contactDetailCancel").show('slow');
    $("#contactDetailSave").show('slow');
  });


  $("#mobileNumber input").focus(function() {
    $('.otp-code-div').show('slow');
  });

  $("#contactDetailSave, #contactDetailCancel").click(function(){
    $(".otp-code-div").hide('slow');
  });

  $('select').change(function() {
    if ($(this).children('option:first-child').is(':selected')) {
      $(this).addClass('placeholder');
    } else {
     $(this).removeClass('placeholder');
    }
  });

  $('.ud-sidebar > ul > li').click(function(){
    $('a').removeClass('active show');
    $(this).addClass('active show');
  });


  $('.ud-nav-item').on('click', function(){
    $('li').removeClass('active');
    $(this).addClass('active');
  });

  $('.thumbnail').click(function(){
    $('.modal-body').empty();
    var title = $(this).parent('a').attr("title");
    $('.modal-title').html(title);
    $($(this).parents('div').html()).appendTo('.modal-body');
    $('#thumbnailViewer').modal({show:true});
  });

});
// $('.doc-upload').on('click', function() {
//   $('.loader-div').removeClass('display-none');
//   setTimeout(function () { 
//     $('.loader-div').hide();
//   }, 5000);
// }); 

$('#propertyLink').click(function() {
  $('#openPropDetails').toggleClass('collapse');
});

$('.advance-search-link').click(function() {
  $('.slider-search-btn-top').toggle();
  $('html, body').animate({
    scrollTop: ($('.main-search-row').offset().top)
  },1000);
});
$('.circle-plus').on('click', function(){
  $(this).toggleClass('opened');
});

$(".mat-elevation-z8").click(function() {
  $("html, body").animate({ scrollTop: 0 }, "slow");
  return false;
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

function readURL(input) {
   if (input.files && input.files[0]) {
    var FileSize = input.files[0].size / 1024 / 1024; // in MB
        if (FileSize > 2) {
           // alert('File size exceeds 2 MB');
            
              // make it not dissappear
              $('#passportCopyDiv').removeClass('display-none');
                setTimeout(function () { 
                  $('#passportCopyDiv').addClass('display-none');
                }, 3000);
              toastr.error("File size exceeds from 2 MB!!", "File Uploading Error", {
                  // "timeOut": "0",
                  // "extendedTImeout": "0"
              });
          
           // $(file).val(''); //for clearing with Jquery
        } else {

      var reader = new FileReader();

      reader.onload = function (e) {
        $('#passportCopy')
          .attr('src', e.target.result)
      };
      $('#passportCopyDiv').removeClass('display-none');
        setTimeout(function () { 
          $('#passportCopyDiv').addClass('display-none');
        }, 3000);
      reader.readAsDataURL(input.files[0]);
      toastr.success("File Uploaded Sucessfully ");
  }
}}

function readURLIdCopy(input) {
  if (input.files && input.files[0]) {
    var FileSize = input.files[0].size / 1024 / 1024; // in MB
    if (FileSize > 2) {
       // alert('File size exceeds 2 MB');
        
          // make it not dissappear
          $('#idCopyDiv').removeClass('display-none');
            setTimeout(function () { 
              $('#idCopyDiv').addClass('display-none');
            }, 3000);
          toastr.error("File size exceeds from 2 MB!!", "File Uploading Error", {
              // "timeOut": "0",
              // "extendedTImeout": "0"
          });
      
       // $(file).val(''); //for clearing with Jquery
    } else
    {
        var reader = new FileReader();

        reader.onload = function (e) {
          $('#idCopy')
            .attr('src', e.target.result)
        };
        $('#idCopyDiv').removeClass('display-none');
          setTimeout(function () { 
            $('#idCopyDiv').addClass('display-none');
          }, 3000);
        reader.readAsDataURL(input.files[0]);
        toastr.success("File Uploaded Sucessfully");
  }
 }
}

function readURLNotorizedCopy(input) {
  if (input.files && input.files[0]) {
    var FileSize = input.files[0].size / 1024 / 1024; // in MB
    if (FileSize > 2) {
       // alert('File size exceeds 2 MB');
        
          // make it not dissappear
          $('#notorizedCopyDiv').removeClass('display-none');
            setTimeout(function () { 
              $('#notorizedCopyDiv').addClass('display-none');
            }, 3000);
          toastr.error("File size exceeds from 2 MB!!", "File Uploading Error", {
              // "timeOut": "0",
              // "extendedTImeout": "0"
          });
      
       // $(file).val(''); //for clearing with Jquery
    } else
    {
        var reader = new FileReader();

        reader.onload = function (e) {
          $('#notorizedCopy')
            .attr('src', e.target.result)
        };
        $('#notorizedCopyDiv').removeClass('display-none');
          setTimeout(function () { 
            $('#notorizedCopyDiv').addClass('display-none');
          }, 3000);
        reader.readAsDataURL(input.files[0]);
        toastr.success("File Uploaded Sucessfully");
  }
 }
}
