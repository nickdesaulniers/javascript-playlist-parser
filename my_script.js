// Create the td's from parent tr's data- attributes
function createListings () {
  var listings = document.querySelectorAll('tbody tr');
  var dataset = ['playlist', 'protocol', 'codec'];
  Array.prototype.forEach.call(listings, function (listing) {
    var frag = document.createDocumentFragment();
    dataset.forEach(function (attr) {
      var td = document.createElement('td');
      var childText = listing.dataset[attr] || 'None';
      td.appendChild(document.createTextNode(childText));
      frag.appendChild(td);
    });
    listing.appendChild(frag);
  });
};

// Attach tr onclick events, event delegation
function trClick (event) {
  var target = event.target;
  if (target && target.nodeName === 'TR') {
    AudioPlayer.play(target.dataset);
  } else if (target.parentNode.nodeName === 'TR') {
    AudioPlayer.play(target.parentNode.dataset);
  }
};

function playBack () {
  console.log(this.id);
  switch (this.id) {
    case 'play':
      AudioPlayer.play();
      break;
    case 'pause':
      AudioPlayer.pause();
      break;
    case 'next':
      AudioPlayer.next();
      break;
    case 'stop':
      AudioPlayer.stop();
      break;
  };
};

function attachPlayBack (element) {
  element.addEventListener('click', playBack);
};

window.addEventListener('DOMContentLoaded', function () {
  createListings();
  document.getElementsByTagName('tbody')[0].addEventListener('click', trClick);
  Array.prototype.forEach.call(
    document.querySelectorAll('#play,#pause,#next,#stop'),
    attachPlayBack
  );
});
