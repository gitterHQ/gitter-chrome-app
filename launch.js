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
  chrome.app.window.create(
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
          e.preventDefault();
          window.open(e.targetUrl);
        });
      };
    }
  );
});