var app = new Vue({
    el: '#page',
    data: {
        product: "Socks"
    }
})

function openNav() {
    var checkBox = document.getElementById("checkbox1");
    if(checkBox.checked == true){
        document.getElementById("mySidenav").style.width = "250px";
        document.getElementById("main").style.marginLeft = "250px";
        document.getElementById("app").style.marginLeft = "250px";
        //document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
       // document.getElementById("app").style.backgroundColor = "rgba(0,0,0,0.4)";
    }
    else{
        document.getElementById("mySidenav").style.width = "0";
        document.getElementById("main").style.marginLeft = "0";
        document.getElementById("app").style.marginLeft = "0";

    }
  }

