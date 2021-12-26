var firebaseConfig = {
      apiKey: "AIzaSyAZIkRb1FvahbNdWw2zFnedGEClTS9BRaE",
      authDomain: "chat-f611c.firebaseapp.com",
      databaseURL: "https://chat-f611c-default-rtdb.firebaseio.com",
      projectId: "chat-f611c",
      storageBucket: "chat-f611c.appspot.com",
      messagingSenderId: "751525676075",
      appId: "1:751525676075:web:18b10f2cf20854a96d166e"
};


firebase.initializeApp(firebaseConfig);

user_name = localStorage.getItem("user_name")
room_name = localStorage.getItem("room_name")

function send() {
      console.log("updatedTime" + message_id);
      var today = new Date();
      var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      updatedTimes = Number(time) + 1;
      console.log(updated);
      firebase.database().ref(room_name).child(message_id).update({
            Time: updatedTimes
      });
      msg = document.getElementById("msg").value;
      firebase.database().ref(room_name).push({
            name: user_name,
            message: msg,
            like: 0,
            Time: 0
      })
      document.getElementById("msg").value = "";


}

function getData() {
      firebase.database().ref("/" + room_name).on('value', function (snapshot) {
            document.getElementById("output").innerHTML = "";
            snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key;
                  childData = childSnapshot.val();
                  if (childKey != "purpose") {
                        firebase_message_id = childKey;
                        message_data = childData;
                        console.log(firebase_message_id);
                        console.log(message_data);
                        name = message_data['name'];
                        message = message_data['message'];
                        like = message_data['like'];
                        name_with_tag = "<h4>" + name + "<img class='user_tick' src='tick.png'>"
                        Time_with_tag = "<h4>" + Time + "<img class='user_tick' src='tick.png'>"
                        message_with_tag = "<h4 class= 'message_h4'>" + message + "</h4>"
                        like_button = "<button id=" + firebase_message_id + " value=" + like + " onclick='updateLike(this.id)' class='btn btn-primary like'>";
                        span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'> " + like + "</span></button><hr>"
                        row = name_with_tag + Time_with_tag + message_with_tag + like_button + span_with_tag;
                        document.getElementById("output").innerHTML += row;
                  }
            });
      });
}
getData();

function updateLike(message_id) {
      console.log("user clicked like button - " + message_id);
      button_id = message_id;
      likes = document.getElementById(button_id).value;
      updatedLikes = Number(likes) + 1;
      console.log(updatedLikes);
      firebase.database().ref(room_name).child(message_id).update({
            like: updatedLikes
      });
}

function logout() {
      localStorage.removeItem("user_name");
      localStorage.removeItem("room_name");
      window.location.replace("index.html");
}