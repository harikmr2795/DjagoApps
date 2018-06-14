$(document).ready(function(){
    var url = 'http://127.0.0.1:8000/quiz/view/'+id;
    fetch(url, {
              method: 'GET',
            }).then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => show_page(response));

    function show_page(data){
        var username = readCookie('username');
        if ((username == '')||(username == null)){
            $('#name_form').removeClass("hidden");
            $('#quizer_name').replaceWith('<div class="container-fluid top-buffer" id="quizer_name"><p>How well do you know '+ data.name +'</p></div>');

        }
        console.log(username);
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