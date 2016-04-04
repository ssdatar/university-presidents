$(document).ready( function() {

  $.ajax({
    type: 'GET',
    url: 'data/univ.csv',
    dataType: 'text',
    success: processData,
    error: function (err) { console.error(err); } 
  });

  function processData (res) {
    var dataLines = res.split(/\r\n|\n/);
    var headers = dataLines[0].split(',');
    var masterData = [];

    for (var i=1; i<dataLines.length; i++) {
        var row = dataLines[i].split(',');
        
        if (row.length == headers.length) {
          var rowObj = {};
          
          for (var j=0; j<headers.length; j++) {
            rowObj[headers[j]] = row[j];
          }
            masterData.push(rowObj);
        }
    }
    //console.log(masterData)

    renderTable(masterData); 

    // init Isotope
    var $container = $('.table-like').isotope({
      layoutMode: 'vertical',
      getSortData: {
        female: '.female parseInt',
        rank: '.rank parseInt'
      }
    });

    // bind sort button click
    $('#sorts').on( 'click', 'button', function() {
      var sortValue = $(this).attr('data-sort-value');

      $container.isotope({ 
        sortBy: sortValue,
        sortAscending: {female: false} 
      });
    });

    // change is-checked class on buttons
    $('.button-group').each( function( i, buttonGroup ) {
      var $buttonGroup = $( buttonGroup );

      $buttonGroup.on( 'click', 'button', function() {
        $buttonGroup.find('.is-checked').removeClass('is-checked');
        $( this ).addClass('is-checked');
      });
    });
    
  }

  function renderTable(data) {

     $.each(data, function (i, d) {
      var imgPath = 'logos/' + d.university + '.jpg'
      var img = '<img class="logo" src="' + imgPath + '" />' + '</div>';
      var univDiv = '<div class="univ">' + d.university + '</div>';
      var countDiv = '<div class="female">' + d.count + '</div>';
      var rankDiv = '<div class="rank">' + d.usnews_ranking + '</div>';
      
      
      var cells = univDiv + img + countDiv + rankDiv;

      
      $('.table-like').append('<li class="table-like__item">' + cells + '</li>');
    });  
  }  
});
