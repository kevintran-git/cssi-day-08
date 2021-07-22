const getMessages = () => {
    const messagesRef = firebase.database().ref();
        messagesRef.on('value', (snapshot) => {
        const data = snapshot.val();
        console.log(data);
        for(const entry in data){
            console.log(entry);
        }
        const input = document.querySelector("#passcode").value;
        console.log(input);
        var CryptoJS = require("crypto-js");
        console.log(CryptoJS.MD5(input));
    });
}

