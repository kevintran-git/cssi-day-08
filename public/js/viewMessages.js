let attempts = 0;

const getMessages = () => {
    const input = document.querySelector("#passcode").value;
    const hashedPasscode = CryptoJS.SHA3(input).toString();
    const messagesRef = firebase.database().ref();

    document.querySelector("#message").innerHTML = "";

    messagesRef.on('value', (snapshot) => {
        const data = snapshot.val();

        let found = false;
        for (let key in data) {
            console.log(data[key].passcode, data[key].message);
            if (data[key].passcode === hashedPasscode) {
                document.querySelector("#message").innerHTML += CryptoJS.AES.decrypt(data[key].message, hashedPasscode).toString(CryptoJS.enc.Utf8) + "<br>";
                found = true;
                attempts = 0;
            }
        }
        if (found === false) {
            if (attempts >= 5) {
                document.querySelector("#message").innerHTML = `Please wait before trying again.`;
                document.querySelector("#viewMsg").classList.add("is-hidden");
                setTimeout(function () {
                    document.querySelector("#viewMsg").classList.remove("is-hidden");
                    attempts = 0;
                    document.querySelector("#message").innerHTML = `You can try again now.`;
                }, 3000);
            } else {
                attempts++;
                document.querySelector("#message").innerHTML = `Sorry. There are no matching messages with that message. You have ${5 - attempts} attempts left.`;
            }

        }
    });
}

