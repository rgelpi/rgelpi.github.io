$(document).ready(function () {

	$('.button').data('mode', 'sample');
	
	$('.button').click(function() {
		if(this.id == 'default-button') {
			$('.button').prop('id', 'subtract-button');
			$('span', this).text('Predict only');
			$('.button').data('mode', 'predict');
		}else if(this.id == 'subtract-button'){
			$('.button').prop('id', 'add-button');
			$('span', this).text('Sample + predict');
			$('.button').data('mode', 'sample');
		}else{
			$('.button').prop('id', 'default-button');
			$('span', this).text('Practice');
			$('.button').data('mode', 'practice');
		}
	});
    
    $(".default-button").click(function () {
    	$(this).addClass("disabled");
    	var func = this.id.split("-")[2];
    	var c = !$(".c").val() == "" ? $(".c").val() : '5';
    	if(parseInt(c) >= 14) c = '13'
    	window.location.href = 
    		"../" +
    		$('.button').data('mode') +
    		"Apples/" +
    		$('.button').data('mode') +
    		".html?c=" +
    		c +
    		"&function=" +
    		func;
    });
});