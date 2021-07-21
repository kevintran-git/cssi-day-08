const getMessages = () => {
    const messagesRef = firebase.database().ref();
        messagesRef.on('value', (snapshot) => {
        const data = snapshot.val();
        console.log('help');
        console.log(data);
        const input = document.getElementById("passcode").value;
        console.log(input);
    });
}

