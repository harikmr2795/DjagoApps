$(document).ready(function(){
    var answer_data = {};
    var data = "";
    var q = 0;
    var score = 0;
    var $regexname=/^[a-zA-Z][a-zA-Z .]{0,25}$/;
    var url = 'http://127.0.0.1:8000/quiz/view/'+id;
    fetch(url, {
              method: 'GET',
            }).then(res => res.json())
            .catch(error => console.log('Error:', error))
            .then(response => show_page(response));

    function show_page(response){
        data = response;
        var username = readCookie('username');
        if (data.name == undefined){
            no_data();
            return 0;
        }
        else if ((username == '')||(username == null)){
            $('#name_form').removeClass("hidden");
            $('#quizer_name').replaceWith('<div class="container-fluid top-buffer" id="quizer_name"><p>How well do you know '+ data.name +'</p></div>');
        }
        else{

        }
    }

    $(".q1").change(next);
    $(".q2").change(next);
    $(".q3").change(next);
    $(".q4").change(next);
    $(".q5").change(next);
    $(".q6").change(next);
    $(".q7").change(next);
    $(".q8").change(next);
    $(".q9").change(next);
    $(".q10").change(next);
    $(".q11").change(next);
    $(".q12").change(next);
    $(".q13").change(next);
    $(".q14").change(next);
    $(".q15").change(next);

    function next(){
        $(this).parent().parent().children().children().attr('disabled','true');
            if (this.value == eval('data.a'+q)){
                $('input:checked').parent().addClass("correct");
                score++;
            }
            else{
                $('input[class=q' + eval("data.q"+q) + '][value="' + eval("data.a"+q) + '"]').parent().addClass("correct");
                $('input:checked').parent().addClass("wrong");
            }
        $('#q'+eval("data.q"+q)).delay(2000).slideUp(400);
        if(q<9){
            setTimeout(function() { $('#q'+eval('data.q'+q)).removeClass("hidden");}, 2000);
            q++;
        }
        else{
            console.log(score);
        }
    }

    $("#name_btn").click(function(){
        var name = $('#name_box').val();
        if (name.match($regexname)) {
            answer_data['name'] = name;
            $("#name_form").slideUp(300);
            $('#quizer_name').slideUp(300);
            $('#q'+data.q0).removeClass("hidden");
        }
        else{
            $('.emsg').removeClass("hidden").hide().fadeIn(300);
        }
    });

    //if user tries to access a quiz that is not available
    function no_data(){
        $('body').replaceWith('<div class="container-fluid top-buffer"><h4>Sorry, the quiz was not found</h4></div>');
    }

    //    For creating, reading, erasing Cookies
    function createCookie(name, value, days) {
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            var expires = "; expires=" + date.toGMTString();
        }
        else var expires = "";

        document.cookie = name + "=" + value + expires + "; path=/";
    }

    function readCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }
});