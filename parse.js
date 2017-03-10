/**
 * Replaces commonly-used Windows 1252 encoded chars 
 *  that do not exist in ASCII or ISO-8859-1 with ISO-8859-1 cognates.
 */
var replaceWordChars = function(s) {
	// smart single quotes and apostrophe
	s = s.replace(/[\u2018|\u2019|\u201A]/g, "\'");
	// smart double quotes
	s = s.replace(/[\u201C|\u201D|\u201E]/g, "\"");
	// ellipsis
	s = s.replace(/\u2026/g, "...");
	// dashes
	s = s.replace(/[\u2013|\u2014]/g, "&mdash;");
	// circumflex
	s = s.replace(/\u02C6/g, "^");
	// open angle bracket
	s = s.replace(/\u2039/g, "<");
	// close angle bracket
	s = s.replace(/\u203A/g, ">");
	// spaces
	s = s.replace(/[\u02DC|\u00A0]/g, " ");
	// hyphen
	s = s.replace(/—/g, '-');
	// forward slash
	s = s.replace(/[⁄]/g, "/");
	return s;
}

/**
 * varius parse settings
 */
var settings = {

	//addslashes
	addslashes: {
		'title': 'Add Slashes',
		'callback': function(data){
			return data.replace(/'/gm,"\\'");
		}
	}

	,dblpara: {
		'title': 'Double Space to paragraph',
		'callback': function(data){
			data = '<p>' + data.replace(/\n\n/gm, "</p>\n\n<p>").trim() + '</p>';
			return data;
		}
	}

	// strip newlines
	,newlines: {
		'title': 'Strip Newlines',
		'callback': function(data) {
			data = data.replace(/(\r\n|\n|\r)/gm," ");
			data = data.replace(/  /gm," ");
			return data;
		}
	}

	// strip links
	,linkToPound: {
		'title': 'Strip Links to #',
		'callback': function(data) {
			data = data.replace(/href="([^"]*)"/gmi, 'href="#0"');
			data = data.replace(/href='([^"]*)'/gmi, 'href="#0"');
			return data;
		}
	}
	
	// entities
	,htmlentities: {
		'title': 'HTML Entities',
		'callback': function(data){
			$.ajax({
				'async': false,
				'type': 'POST',
				'url': 'server_parse.php',
				'data': {'htmlentities': data},
				'success': function(res){
					data = res;
				}
			});
			return data;
		}
	}
	
	//url decode
	,urldecode: {
		'title': 'Url Decode',
		'callback': function(data){
			return decodeURIComponent(data);
		}
	}

	//url encode
	,urlencode: {
		'title': 'Url Encode',
		'callback': function(data){
			return encodeURIComponent(data);
		}
	}

	,googMaps: {
		'title': 'Google Maps Lat/Lon',
		'callback': function(data){
			data = data.replace("\n", '').trim();
			data = data.replace(/\./g, '');
			data = data.replace(/'/g, '');
			data = data.replace(/° /g, '.');
			return data;
		}
	}


	,blankLines: {		
		'title': 'Strip blank lines',
		'callback': function(data){
			var newData = '';
			var lines = data.split(/\n/);
			for(var i = 0; i < lines.length; i++) {
				if(lines[i].trim() != '') {
					newData += lines[i] + "\n";
				}
			}
			return newData;
		}
	}

	,uniqueLines: {
		'title': 'Unique Lines',
		'callback': function(data){
			var uniqueLines = [];
			var lines = data.split(/\n/);
		    for (var i = 0; i < lines.length; i++) {
		        if (uniqueLines.indexOf(lines[i]) == -1) {
		            uniqueLines.push(lines[i]);
		        }
		    }
		    return uniqueLines.join("\n");
		}
	}

	,regexEscape: {
		'title': 'Escape a string for regex',
		'callback': function(data){
			return data.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
		}
	}

	,tableToBootstrap: {
		'title': 'Convert a HTML table to bootstrap',
		'callback': function(data){
			data = data.replace(/<\/?(table|thead|tbody).*?>/ig, '');
			data = data.replace(/<\/td>/ig, '</div>');
			data = data.replace(/<\/tr>/ig, '</div>');
			data = data.replace(/<td.*?>/ig, '<div class="col-lg-12">');
			return data.replace(/<tr.*?>/ig, '<div class="row">');
		}
	}

}

$(document).ready(function(){

	// textarea changes
	$('#text_input').keyup(function(){
		// $('#char_length').val($('#text_input').val().length);
		$('#char_length').text($('#text_input').val().length);
	});

	$('form').submit(function(){
	
		var data = replaceWordChars(this.data.value);
		var data = data.replace(/  /g, ' ').trim();
		
		/**
		 * setting functions
		 */
		$('.setting input').each(function(i, el){
			console.log($(el).attr('checked'));
			if($(el).attr('checked') == 'checked') {
				var name = $(el).attr('name');
				console.log(name);
				data = settings[name].callback(data);
			}
		});
		
		// fix newlines in the data points
		this.data.value = data;
		return false;
	});
	
	// setting container toggle
	$('a.button.settings').click(function(){
		$(this).toggleClass('.active');
		$('.settingContainer').slideToggle();
	});
	
	// settings active class
	$('label.setting input[type="checkbox"]').live('change', function(){
		$(this).parent().toggleClass('active');
	});
	
	// adding settings elements
	for(var name in settings) {
		var setting = settings[name];
		$('fieldset.settingContainer').append('<label class="setting"><input type="checkbox" value="'+name+'" name="'+name+'"/> '+setting.title+'</label>');
	}
	
});