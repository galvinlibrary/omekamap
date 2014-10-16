Neatline.on('start', function() {
 
  NProgress.configure({ showSpinner: false });
  NProgress.start();
 
  Neatline.vent.on('MAP:ingest', function() {
    NProgress.done();
  });
 
});
Neatline.on('start', function() {
 
  var map = Neatline.request('MAP:getMap');
 
  $('.btn.in').click(function() {
    map.zoomIn();
  });
 
  $('.btn.out').click(function() {
    map.zoomOut();
  });
 
});