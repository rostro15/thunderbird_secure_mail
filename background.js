browser.messageDisplay.onMessageDisplayed.addListener((tab, message) => {
    browser.messages.getFull(message.id).then(fullMessage=>{
        console.dir(fullMessage.headers["received"]);
        browser.messageDisplayAction.setTitle({ title: ( '' )  })
        reg = /\(Authenticated sender: ([A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4})\)/;
        fullMessage.headers["received"].forEach(element => {
            match = element.match(reg);
            if (match != null) {
                console.dir(match[1]);
                browser.messageDisplayAction.setTitle({ title: ( 'from : '+match[1] )  })
            }
            console.dir(element.match(reg[1]));
        });
    });
});