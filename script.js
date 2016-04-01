$(document).ready( function() {

	//Draw the table
	makeTable();

// init Isotope
  var $container = $('.table-like').isotope({
    layoutMode: 'vertical',
    getSortData: {
      rank: '.rank',
      female: '.female'
    }
  });

  // bind sort button click
  $('#sorts').on( 'click', 'button', function() {
    var sortValue = $(this).attr('data-sort-value');

    $container.isotope({ sortBy: sortValue });
  });

  // change is-checked class on buttons
  $('.button-group').each( function( i, buttonGroup ) {
    var $buttonGroup = $( buttonGroup );

    $buttonGroup.on( 'click', 'button', function() {
      $buttonGroup.find('.is-checked').removeClass('is-checked');
      $( this ).addClass('is-checked');
    });
  });
  
});

function makeTable() {

//Declare margins, width, height for svg
  var margin = {top: 50, right: 0, bottom: 100, left: 30 },
	width = 960 - margin.left - margin.right,
	height = 700 - margin.top - margin.bottom;

	var grid_female = d3.select('#grid-female');
	var grid_male = d3.select('#grid-male');

	var tooltip = d3.select("body")
		.append("div")  // declare the tooltip div 
		.attr("class", "tooltip")              // apply the 'tooltip' class
		.style("opacity", 0);                  // set the opacity to nil

	// queue()
	// .defer(d3.csv, 'data/univ.csv')
	// //.await(wrangleFunction)
	// .await(draw);

	d3.csv('data/univ.csv', wrangleFunction, draw);

	function wrangleFunction (d) {
		return {
			university: d.university,
			female_pres: d.female_pres,
			count: +d.count,
			us_ranking: +d.usnews_ranking
		};
	}

	function draw (error, data)	{
		if (error) { console.error(error); }
		
		//Sort by number of female presidents descending
		data = data.sort(function (a, b) {
			return +b.count - (+a.count);
		});

		//Select table, add rows to it
		var table = d3.select('.table-like')
		.selectAll('li')
		.data(data)
	 .enter()
		.append('li')
		.classed('table-like__item', true)

		//Add data to the table
		table.call(addCells);

		//Make the table
		function addCells(parent) {
			parent.append('div')
			.classed('univ', true)
			.classed('cell', true)
			.text( function (d) { return d.university; })

			parent.append('div')
			.classed('female', true)
			.classed('cell', true)
			.text( function (d) { return d.count; });

			parent.append('div')
			.classed('rank', true)
			.classed('cell', true)
			.text( function (d) { return d.us_ranking; })
		};	

		//Draw grid for universities that have had female presidents
		var female_cells = grid_female.selectAll('.univ-female')
				.data(data.filter( function(d) 
					{ return d.female_pres == 'y'; }))
			.enter()
				.append('div')
				.classed('univ-female', true)			
				

		//Append images of universities
		var logos_female = female_cells.append('img')
			.attr('src', function (d) {
				return "logos/" + d.university + ".jpg";
			})
		// 	.on('mouseover', function (d) {			//On mouseover, show tooltip
		// 			// console.log(this)
		// 			d3.select(this)
		// 			.style('cursor', 'pointer')
		// 			.style('opacity', .6);

		// 			tooltip.transition()
		// 				.duration(200)
		// 				.style('opacity', 1);
						
		// 			tooltip.html('<h3>' + d.university + ' has had ' + d.count + ' female leader(s)</h3>')
		// 				.style("left", (d3.event.pageX - 40) + "px")			 
		// 				.style("top", (d3.event.pageY - 80) + "px");
		// 		})
		// 		.on('mouseout', function (d) {
		// 			d3.select(this)
		// 			.style('cursor', 'normal')
		// 			.style('opacity', 1);

		// 			//console.log(this)
		// 			tooltip.transition()
		// 				.duration(200)
		// 				.style('opacity', 0);
		// 		});

		//Draw grid for universities with no female presidents
		var male_cells = grid_male.selectAll('.univ-male')
			.data(data.filter(function (d) {
				return d.female_pres == 'n';}))
		.enter()
			.append('div')
			.classed('univ-male', true)

		var logos_male = male_cells.append('img')
			.attr('src', function (d) {
				return "logos/" + d.university + ".jpg";
			});
		
		}
	}