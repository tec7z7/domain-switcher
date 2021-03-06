var envs = localStorage.getItem('envs');
envs = JSON.parse(envs);
$(document).ready(function() {

	if(envs) {
		var count = 1, element;
		for (var key in envs) {
			element = "<li class='ui-state-default' id='order-"+count+"'><span class='ui-icon ui-icon-arrowthick-2-n-s'></span><input type='text' data-oldName='"+key+"' id='newName"+count+"' value='"+key+"' /> ";
			element += "<input type='text' data-oldAddress='"+envs[key]+"' id='newAddress"+count+"' value='"+envs[key]+"' /> ";
			element += "<button class='update' id='"+count+"'>Update</button> ";
			element += "<button class='delete' id='"+key+"' >Delete</button>";
			element += "</li>";
			$("#sortable").append(element);
			count++;
		}
	}

	$(".update").click(function() {
		var id = $(this).attr('id');
		var NN = $("#newName"+id).val();
		var NA = $("#newAddress"+id).val();
		var ON = $("#newName"+id).attr('data-oldName');
		var OA = $("#newAddress"+id).attr('data-oldAddress');
		if(NN === '') {
			$('#message').empty();
			$('#message').append('Name cannot be blank.');
			return false;
		}
		if(NA === '') {
			$('#message').empty();
			$('#message').append('Address cannot be blank.');
			return false;
		}
		delete envs[ON];
		envs[NN] = NA;
		localStorage.setItem('envs', JSON.stringify(envs));
		var currentURL = document.location;
		alert('Updated:\n'+NN+' -> '+NA);
		location.reload();
	});

	$(".delete").click(function() {
		var id = $(this).attr('id');
		delete envs[id];
		localStorage.setItem('envs', JSON.stringify(envs));
		location.reload();
	});

	$("#add").click(function() {
		var AN = $("#addName").val();
		var AA = $("#addAddress").val();
		if(AN === '') {
			$('#message').empty();
			$('#message').append('Name cannot be blank.').show();
			return false;
		}
		if(AA === '') {
			$('#message').empty();
			$('#message').append('Address cannot be blank.').show();
			return false;
		}
		AN = AN.replace(/[^a-z0-9]+/i, '');
		envs[AN] = AA;
		localStorage.setItem('envs', JSON.stringify(envs));
		location.reload();
	});

	$(function() {
		$( "#sortable" ).sortable({
			axis: 'y',
			update: function (event, ui) {
				var order = $(this).sortable('toArray');
				localStorage.removeItem('envs');
				var reOrder = {};
				for(var key in order) {
					var id = $.trim(order[key++].replace('order-', ''));
					var ON = $("#newName"+id).attr('data-oldName');
					var OA = $("#newAddress"+id).attr('data-oldAddress');
					reOrder[ON] = OA;
					localStorage.setItem('envs', JSON.stringify(reOrder));
				}
			}
		});
		$( "#sortable" ).disableSelection();
	});

});