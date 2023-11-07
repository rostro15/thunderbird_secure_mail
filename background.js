browser.messageDisplay.onMessageDisplayed.addListener((tab, message) => {
    browser.messages.getFull(message.id).then(fullMessage=>{
        console.dir(fullMessage.headers["received"]);
        reg = RegExp("[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}")
        fullMessage.headers["received"].forEach(element => {
            console.dir(reg.exec(element));
        });
    });
});