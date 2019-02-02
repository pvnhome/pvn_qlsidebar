console.log('Load background JS');

browser.pageAction.onClicked.addListener(onTogglePageButton);
browser.tabs.onUpdated.addListener(onTabUpdated);

function checkTab(tab) {
    var regEx = new RegExp('^(http:\/\/|https:\/\/)');
    return regEx.test(tab.url);
}

var d = true;

function onTogglePageButton(tab) {
    if (checkTab(tab)) {
       console.log('bookmark toggle: ' + tab.id + ", " + tab.url);
       if (d) {
          d = false;
          setPageAction(tab.id, d);
       } else {
          d = true;
          setPageAction(tab.id, d);
       }
    }
}

function setPageAction(tabId, bExist) {
    var pAct = browser.pageAction;
    pAct.setTitle({ tabId: tabId, title:  (bExist ? "Add to Quick Links" : "Remove from Quick Links") });
    pAct.setIcon({ tabId: tabId, path: (bExist ? "icons/add.png" : "icons/remove.png") });
    pAct.show(tabId);
}

function onTabUpdated(tabId, changeInfo, tab) {
    if (checkTab(tab)) {
       console.log('tab updated: ' + tabId + ", " + tab.url);
       setPageAction(tabId, d);
    }
}