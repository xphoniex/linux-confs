// ==UserScript==
// @name     Download YouTube Transcripts
// @version  1
// @match    https://www.youtube.com/watch*
// @author   xphoniex
// @grant    GM.xmlHttpRequest
// @run-at   document-idle
// ==/UserScript==

let clicked = false;
let archived = false;

const videoId = document.location.toString().substr(32, 11);

const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (!clicked) {
      for (const el of document.getElementsByClassName('yt-spec-button-shape-next yt-spec-button-shape-next--outline yt-spec-button-shape-next--call-to-action yt-spec-button-shape-next--size-m')) {
        if (el.ariaLabel == "Show transcript") {
          el.click()
          clicked = true;
        }
      }
    }
    
    if (clicked && !archived) {
      for (const el of document.getElementsByTagName('ytd-engagement-panel-section-list-renderer')) {
        if (el.attributes["target-id"].value == "engagement-panel-searchable-transcript"
            && el.attributes["visibility"].value == "ENGAGEMENT_PANEL_VISIBILITY_EXPANDED"
            && el.innerText != "Transcript") 
        {
          console.log(GM);
          saveTextAsFile(el.innerText, videoId + ".yt.txt", "");
        
        	archived = true;
          
          // close it
          for (const el of document.getElementsByClassName('yt-spec-button-shape-next yt-spec-button-shape-next--text yt-spec-button-shape-next--mono yt-spec-button-shape-next--size-m yt-spec-button-shape-next--icon-only-default')) {
            if (el.ariaLabel == "Close transcript") {
              el.click();
            }
          }
        }
      }
    }
    
    /*
    for (const el of document.getElementsByClassName('ytp-caption-segment')) {
      GM.xmlHttpRequest({
        method: "POST",
        url: "http://localhost:10111/" + videoId,
        data: el.innerText,
      });
    }
    */
  });
});

const config = {childList:true,subtree:true};
observer.observe(document.body, config);

function saveTextAsFile(textToWrite, fileNameToSaveAs, fileType) {
    let textFileAsBlob = new Blob([textToWrite], { type: fileType });
    let downloadLink = document.createElement('a');
    downloadLink.download = fileNameToSaveAs;
    downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
    downloadLink.style.display = 'none';
    document.body.appendChild(downloadLink);
    downloadLink.click();
}
