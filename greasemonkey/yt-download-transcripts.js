// ==UserScript==
// @name     Download YouTube Transcripts
// @version  1.2
// @match    https://www.youtube.com/watch*
// @author   xphoniex
// @run-at   document-idle
// ==/UserScript==

let clicked = false;
let archived = false;
let manual = false; // added 2024-12-01

const videoId = document.location.toString().match(/v=(.{11})/)[1];

let mutationsArray = [];
let observerDebounceTimer;

function debounceObserver(mutations) {
  clearTimeout(observerDebounceTimer);
  mutationsArray.push(mutations);
  observerDebounceTimer = setTimeout(dealWithMutations, 10);
}

setTimeout(() => { // added 2025-04-04
let showTranscriptBtn = document.getElementsByClassName('yt-spec-button-shape-next yt-spec-button-shape-next--outline yt-spec-button-shape-next--call-to-action yt-spec-button-shape-next--size-m')[0] || undefined;
if (showTranscriptBtn) {
  showTranscriptBtn.click();
  clicked = true;
}
}, 1500);

function dealWithMutations() {
  const mutations = mutationsArray.flat();
  mutationsArray = [];
  const addedNodes = mutations.map((mutation) => mutation.addedNodes).filter((addedNodes) => addedNodes);

  if (!clicked) {
    addedNodes.map((nodeList) => Array.from(nodeList)).flat().map((node) => {
      if (node.nodeName === 'BUTTON' && node.className === 'yt-spec-button-shape-next yt-spec-button-shape-next--outline yt-spec-button-shape-next--call-to-action yt-spec-button-shape-next--size-m') {
        node.click();
        clicked = true;
      }
    });
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
          node.onclick = () => { saveTranscript(); };
          
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
            observer.disconnect();
            manualSrtBtn.style.visibility = 'hidden'; // added 2025-08-15
          }
        }
      }
    }
  }
}

const observer = new MutationObserver(debounceObserver);
observer.observe(document.body, { childList: true, subtree: true });

function saveTextAsFile(textToWrite, fileNameToSaveAs, fileType) {
    let textFileAsBlob = new Blob([textToWrite], { type: fileType });
    let downloadLink = document.createElement('a');
    downloadLink.download = fileNameToSaveAs;
    downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
    downloadLink.style.display = 'none';
    document.body.appendChild(downloadLink);
    downloadLink.click();
}

function saveTranscript() {
  for (const el of document.getElementsByTagName('ytd-engagement-panel-section-list-renderer')) {
    if (el.attributes["target-id"] // added 2024-10-18
        && el.attributes["target-id"].value == "engagement-panel-searchable-transcript"
        && el.attributes["visibility"].value == "ENGAGEMENT_PANEL_VISIBILITY_EXPANDED"
        && el.innerText != "Transcript"
        && el.innerText != "In this video\nTimeline\nChapters\nTranscript" // added 2024-10-18
       )
    {
      saveTextAsFile(el.innerText, videoId + ".yt.txt", "");

      // close it
      for (const el of document.getElementsByClassName('yt-spec-button-shape-next yt-spec-button-shape-next--text yt-spec-button-shape-next--mono yt-spec-button-shape-next--size-m yt-spec-button-shape-next--icon-only-default')) {
        if (el.ariaLabel == "Close transcript") {
          el.click();
        }
      }

      return true;
    }
  }
}

// added 2025-08-15
const manualSrtBtn = document.createElement("a");
const textnode = document.createTextNode("srt");
manualSrtBtn.style = "position: fixed; bottom: 0px; left: 0px; background-color: gray;z-index:15000;";
manualSrtBtn.appendChild(textnode);
document.body.appendChild(manualSrtBtn);

manualSrtBtn.onclick = () => {
  if (saveTranscript()) {
    manualSrtBtn.style.visibility = 'hidden';
  }
};
