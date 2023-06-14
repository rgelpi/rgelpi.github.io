$(document).ready(function () {

	$('.button').data('mode', 'sample');
	
	$('.button').click(function() {
		if(this.id == 'add-button') {
			$('.button').prop('id', 'subtract-button');
			$('span', this).text('Predict only');
			$('.button').data('mode', 'predict');
		}else{
			$('.button').prop('id', 'add-button');
			$('span', this).text('Sample + predict');
			$('.button').data('mode', 'sample');
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