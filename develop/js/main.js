let player;


function ChangePlayRate(rate)
{
    function onTabGeted(tabs) {
    let tab = tabs[0]; // Safe to assume there will only be one result
    tabs.executeScript(tab.id,{code:"document.body.style.backgroundColor='red'"});
    alert(player);
    alert(rate);
    player.playbackRate=rate;
}

browser.tabs.query({currentWindow: true, active: true}).then(onTabGeted);
    
};
document.addEventListener("DOMContentLoaded", loaded());
function loaded() {
    //const Cu = require("chrome");
    //console.log(Cu);
    //Components.utils.import("resource://gre/modules/Services.jsm");
    //let Services = Cu.import("resource://gre/modules/Services.jsm");
    player = document.getElementsByClassName("video-stream html5-main-video")[0];
  }

document.addEventListener("click", (e) => {
    console.log(Components);
    console.log(Components.utils);
    console.log(Components.utils.import);
    switch(e.target.id)
    {
        case "speed1":
        ChangePlayRate(1.0);
        break;
        case "speed2":
        ChangePlayRate(2.0);
        break;
        case "speed3":
        ChangePlayRate(3.0);
        break;
        case "speed4":
        ChangePlayRate(4.0);
        break;
    }});