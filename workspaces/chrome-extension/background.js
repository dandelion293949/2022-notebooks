let color = '#3aa757';

const handler = () => {
  chrome.storage.sync.set({color});
    console.log('Default color is set to %cgreen', `color: ${color};`);
}

chrome.runtime.onInstalled.addListener(handler);
