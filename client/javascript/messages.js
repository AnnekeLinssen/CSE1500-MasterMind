var messages = function () {         
    var socket = new WebSocket("ws://192.168.2.1:3000");
    socket.onmessage = function(event){
        console.log(event.data);
        //document.getElementById("hello").innerHTML = event.data;
    }
    socket.onopen = function(){
        socket.send("Hello from the client!");
        console.log("Sending a first message to the server ...")
        //document.getElementById("hello").innerHTML = "Sending a first message to the server ...";
    };

};
$(document).ready(messages);