const onSubmit = () => {
    const passcodeInput = document.querySelector("#passcode").value;
    const messageInput = document.querySelector("#message").value;
    const hashedPasscode = CryptoJS.SHA3(passcodeInput).toString();

    const payload = {
        passcode: hashedPasscode,
        message: CryptoJS.AES.encrypt(messageInput, hashedPasscode).toString()
    }

    console.log(CryptoJS.AES.decrypt(payload.message, hashedPasscode).toString(CryptoJS.enc.Utf8));
    firebase.database().ref().push(payload);

    alert(`Message Sent! \n Hashed Password:${payload.passcode}\n Encrypted Message:${payload.message}`)

}