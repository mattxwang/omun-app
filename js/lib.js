var omunURL = "http://matthewwang.me/omun/";
function httpGet(theUrl){
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open( "GET", theUrl, false );
  xmlHttp.send( null );
  return xmlHttp.responseText;
}
function getCommitteeData(){
  committeeData = JSON.parse(httpGet(omunURL+"api/committees.json"));
  for (var key in committeeData){
    if (key != "structure"){
      $("#committees").append('<li class="table-view-cell media"><a class="navigate-right" href="#' + committeeData[key]["short"] + 'modal"><img class="media-object pull-left" src="' + committeeData[key]["image"] + '" height="42" width="42"><div class="media-body">' + committeeData[key]["name"] + '</div></a></li>');
      /*
      <li class="table-view-cell media">
        <a class="navigate-right" href="#' + committeeData[key]["short"] + 'modal">
          <img class="media-object pull-left" src="' + committeeData[key]["image"] + '" height="42" width="42">
          <div class="media-body">
            ' + committeeData[key]["name"] + '
          </div>
        </a>
      </li>
      */
    }
  }
  for (var key in committeeData){
    $("#committees").append('<div id="' + committeeData[key]["short"] + 'modal" class="modal"><div class="content"><p class="content-padded" id="' + committeeData[key]["short"] + 'content"></p></div></div>');
    /*
    <div id="' + committeeData[key]["short"] + 'modal" class="modal">
      <div class="content">
        <p class="content-padded" id="' + committeeData[key]["short"] + 'content"></p>
      </div>
    </div>
    */
    $("#"+ committeeData[key]['short'] + "content").load(committeeData[key]["permalink"]);
  }
}

function getNewsData(){
  newsData = JSON.parse(httpGet(omunURL+"api/posts.json"));
  for (var key in newsData){
    if (key != "structure"){
      $("#posts").append('<li class="table-view-cell media"><a class="navigate-right"><div class="media-body">' + newsData[key]["title"] + ' <p>' + newsData[key]["excerpt"] + '</p></div></a></li>');
      /*
      <li class="table-view-cell media">
        <a class="navigate-right">
          <div class="media-body">
            ' + newsData["title"] + '
            <p>' + newsData["excerpt"] + '</p>
          </div>
        </a>
      </li>
      */
    }
  }
}

var initializers = {
    'Committees': function() {
      getCommitteeData();
    },
    'News': function(){
      getNewsData();
    }

};

function initializePage(title) {
    var func = initializers[title];
    if(func) { func(); }
}

jQuery(document).ready(function($) {
    window.addEventListener('push', function(e) {
        initializePage(e.detail.state.title);
    });
    initializePage('{{ page.title }}');
});
