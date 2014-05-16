function setScreenWidth() {
  var width = screen.width-100;
  if (width > 1400) width=1400;
  return width;
}

function setScreenHeight() {
  var height = screen.height-100;
  if (height > 1000) height=1000;
  return height;
}

chrome.app.runtime.onLaunched.addListener(function() {
  var AppWindow = chrome.app.window.create(
    'index.html',
    {
      'width': setScreenWidth(),
      'height': setScreenHeight(),
      'minWidth' : 500,
      'minHeight' : 500
    },
    function(win) {
      win.contentWindow.onload = function() {
        var webview = win.contentWindow.document.querySelector('#gitter-webview');
        webview.addEventListener('newwindow', function(e) {
          console.log("newwindow event");
          e.preventDefault();
          window.open(e.targetUrl);
        });

        // This is a bit of a hack to get the window to focus when clicking on a notification.
        // unfortunately the html5 notifications are generated inside the webview now the chrome app
        // and so chrome.notifications.onClicked.addListener doesn't really fire.
        // 
        // However, when a user clicks on a notification and the page changes, the app is focused
        // 
        // There are still two problems:
        // 1. If the message is in the currently open page, nothing happens
        // 2. Worse than the above, if the message is received in the currently opened page,
        //    you don't even get a notification and it's automatically marked as real
        webview.addEventListener('loadcommit', function(e) {
          win.focus();
        });
      };
    }
  );
});

// THIS NEVER HAPPENS
chrome.notifications.onClicked.addListener(function () {
  console.log("Notification clicked");
});

