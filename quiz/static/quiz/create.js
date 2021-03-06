$(document).ready(function(){
    var $regexname=/^[a-zA-Z][a-zA-Z .]{0,25}$/;
    var unanswered = ["q1","q2","q3","q4","q5","q6","q7","q8","q9","q10","q11","q12","q13","q14","q15"];
    var shifter;
    var url = 'http://127.0.0.1:8000/quiz/add/';
    var data={};
    var q = 0; //keeping track of the questions answered

    $("#name_btn").click(function(){
        var name = $('#name_box').val();
        if (name.match($regexname)) {
            $("#name_form").slideUp(300);
            $('#q1').removeClass("hidden");
            $('#skip').removeClass("hidden");
            $('#qno').removeClass("hidden");
            data['name'] = name.trim();
            createCookie("username", name, 100);
        }
        else{
            $('.emsg').removeClass("hidden").hide().fadeIn(300);
        }
    });

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

    $("#skip").click(function(){
        $('#'+unanswered[0]).addClass('hidden');
        shifter = unanswered.shift();
        unanswered = unanswered.concat(shifter);
        $('#'+unanswered[0]).removeClass('hidden');
    });

    function next(){
        $('#'+unanswered[0]).delay(700).slideUp(300);
        unanswered.shift();
        data['q'+q] = this.name.slice(1);
        data['a'+q] = this.value;
        q++;
        console.log(data);
        if(15-unanswered.length >= 10){
            $('#skip').addClass("hidden");
            $('#qno').addClass("hidden");
            setTimeout(function() { $('#pageName').replaceWith('<div class="navbar-brand" id="pageName"><p>Share Quiz</p></div>');}, 800);
            fetch(url, {
              method: 'POST',
              body: JSON.stringify(data),
              headers:{
                'Content-Type': 'application/json'
              }
            }).then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => success(response));
        }
        else{
            setTimeout(function() { $('#'+unanswered[0]).removeClass("hidden");}, 800);
            setTimeout(function() { $('#qno').replaceWith('<div class="navbar-brand pull-right" id="qno"><p>' + parseInt(16-unanswered.length) + '/10</p></div>');}, 800);
        }
    }

    function success(response){
        $('#copy_btn').removeClass("hidden");
        var shareLink = "http://127.0.0.1:8000/quiz/"+response.id;
        $("<h4>" + shareLink + "</h4>").appendTo("#shareLink");
        $('<input id="link">').val(shareLink).appendTo('body').select();
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

    function eraseCookie(name) {
        createCookie(name, "", -1);
    }

//    For highlighting the selected answer
    $('input').click(function () {
        $('input:not(:checked)').parent().removeClass("active");
        $('input:checked').parent().addClass("active");
    });

});

function copy_share_url(){
        var el = document.getElementById('link');
        var range = document.createRange();
        range.selectNodeContents(el);
        var sel = window.getSelection();
        sel.addRange(range);
        document.execCommand('copy');
        alert("Link copied");
}