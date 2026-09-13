document.addEventListener('DOMContentLoaded', function () {
  var root = document.querySelector('#results');
  if (!root) return;
  var req = new XMLHttpRequest();
  req.open('GET', 'results-2025.html', true);
  req.onload = function () {
    if (req.status >= 200 && req.status < 300) root.innerHTML = req.responseText;
  };
  req.send();
});