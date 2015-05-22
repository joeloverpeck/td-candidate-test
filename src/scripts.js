(function () {


    // nav
    $('.email-nav > li > a').click(function (e) {
        console.log('clicked');
        e.preventDefault();
        $('li a[href="#inbox"]').tab('show');
    })




    $('[data-toggle="offcanvas"]').click(function () {
        console.log('clicked');
        $('.row-offcanvas').toggleClass('active')
    });

    $('.btn-reply').click(function() {

        $('.reply').toggleClass('hidden');
        $('.email button').toggleClass('hidden');
    })

    //modal
    //var progressBar = $('.progress-bar');
    var finished = false;
    $('.btn-send').click(function() {

        setTimeout(function(){
            $('.progress-bar').addClass('active');

            toggleModal($('.progress-modal'));
            toggleModal($('.confirm-modal'));
        }, 2000);


    })


    function toggleModal(curDialog) {

        setTimeout(function() {
            $('.progress-bar').removeClass('active');
            curDialog.modal('toggle');
        }, 2200);
    }

})();
