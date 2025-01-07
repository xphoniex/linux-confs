// ==UserScript==
// @name     Download YouTube Transcripts
// @version  1.1
// @match    https://www.youtube.com/watch*
// @author   xphoniex
// @run-at   document-idle
// ==/UserScript==

let clicked = false;
let archived = false;
let manual = false; // added 2024-12-01

const videoId = document.location.toString().match(/v=(.{11})/)[1];

const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (!clicked) {
      for (const el of document.getElementsByClassName('yt-spec-button-shape-next yt-spec-button-shape-next--outline yt-spec-button-shape-next--call-to-action yt-spec-button-shape-next--size-m')) {
        if (el.ariaLabel == "Show transcript") {
          el.click();
          clicked = true;
        }
      }
    }

    if (clicked && !archived) {    
      for (const el of document.getElementsByTagName('ytd-engagement-panel-section-list-renderer')) {
        if (el.attributes["target-id"] // added 2024-10-18
            && el.attributes["target-id"].value == "engagement-panel-searchable-transcript"
            && el.attributes["visibility"].value == "ENGAGEMENT_PANEL_VISIBILITY_EXPANDED"
            && el.innerText != "Transcript"
            && el.innerText != "In this video\nTimeline\nChapters\nTranscript" // added 2024-10-18
           ) 
        {
          // added 2024-12-01
          const langNode = el.children[1].children[0].children[1].children[0].children[4];
          if (!manual && langNode.innerText.substr(0,7) != "English") {           
            const node = document.createElement("a");
						const textnode = document.createTextNode("Download");
            node.appendChild(textnode);
            node.onclick = () => { archived = false; };
            
						el.children[0].appendChild(node);
            manual = true;
            
            // can return and leave transcript box open, and wait for manual intervention
            // or
            // can skip these two and download whatever transcript is available, but 
            // notify the user too
            //
            //archived = true;
            //return;
            
            alert('YouTube transcription is not English, but ' + langNode.innerText + '.');
          } else if (langNode.innerText != "English (auto-generated)") {
            alert('YouTube transcription is not auto-generated English.');            
          }
          
          saveTextAsFile(el.innerText, videoId + ".yt.txt", "");
        
        	archived = true;
          
          // close it
          for (const el of document.getElementsByClassName('yt-spec-button-shape-next yt-spec-button-shape-next--text yt-spec-button-shape-next--mono yt-spec-button-shape-next--size-m yt-spec-button-shape-next--icon-only-default')) {
            if (el.ariaLabel == "Close transcript") {
              el.click();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }
        }
    	}
    }
    
    
    //for (const el of document.getElementsByClassName('ytp-caption-segment')) {
    //  GM.xmlHttpRequest({
    //    method: "POST",
    //    url: "http://localhost:10111/" + videoId,
    //    data: el.innerText,
    //  });
    //}

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
