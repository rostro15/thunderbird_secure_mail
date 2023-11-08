browser.messageDisplay.onMessageDisplayed.addListener((tab, message) => {
  browser.messages.getFull(message.id).then(fullMessage => {

    let resultTitle = '';
    let resultIcon = '';
    let dkim = 'none'
    let dmarc = 'none'
    let spf = 'none'
    let arc = 'none'

    if (typeof fullMessage.headers['authentication-results'] !== 'undefined') {
      const authHeaders = fullMessage.headers['authentication-results']
      authHeaders.forEach(authHeader => {
        if(authHeader.search("dkim=") != -1){
          dkim = authHeader.split("dkim=")[1].split(" ")[0]; 
        }

        if(authHeader.search("dmarc=") != -1){
          dmarc = authHeader.split("dmarc=")[1].split(" ")[0]; 
        }

        if(authHeader.search("arc=") != -1){
          arc = authHeader.split("arc=")[1].split(" ")[0]; 
        }

        if(authHeader.search("spf=") != -1){
          spf = authHeader.split("spf=")[1].split(" ")[0]; 
        }
      });

      resultTitle = "DKIM : " + dkim + ", DMARC : " + dmarc + ", ARC : " + arc + ", SPF : " + spf

      if (dkim == "pass" && dmarc == "pass" && arc == "pass" && spf == "pass"){
        resultIcon = "validation.png";
      }else if(dkim == "fail" || dmarc == "fail" || arc == "fail" || spf == "fail"){
        resultIcon = "error.png";
      }else{
        resultIcon = "warning.png";
      }
    }

    browser.messageDisplayAction.setIcon({ path: resultIcon });
    browser.messageDisplayAction.setTitle({ title: resultTitle });
  });
});