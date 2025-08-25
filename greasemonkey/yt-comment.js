// ==UserScript==
// @name     Comment on YouTube Video
// @version  1
// @match    https://www.youtube.com/watch*
// updated 2025-08-03:
// @match    https://www.youtube.com/shorts/*
// @author   xphoniex
// @run-at   document-idle
// ==/UserScript==

// updated 2025-08-03
const videoId = (document.location.toString().match(/v=(.{11})/) || document.location.toString().match(/shorts\/(.{11})/))[1];

function saveTextAsFile(textToWrite, fileNameToSaveAs, fileType) {
    let textFileAsBlob = new Blob([textToWrite], { type: fileType });
    let downloadLink = document.createElement('a');
    downloadLink.download = fileNameToSaveAs;
    downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
    downloadLink.style.display = 'none';
    document.body.appendChild(downloadLink);
    downloadLink.click();
}

const cmntBtn = document.createElement("a");
const textnode = document.createTextNode("cm");
cmntBtn.style = "position: absolute; top: 0px; left: 0px; background-color: gray;z-index:15000;";
cmntBtn.appendChild(textnode);
document.body.appendChild(cmntBtn);

cmntBtn.onclick = () => {
  const comment = prompt("What's your note?");
  if (comment == null || comment == "") {
    return;
  }
  const currentTime  = document.getElementsByClassName("ytp-time-current")[0].innerText;
  saveTextAsFile(comment, videoId + "." + currentTime + ".note", "");
};
