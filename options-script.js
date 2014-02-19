var envs = localStorage.getItem('envs');
envs = JSON.parse(envs);
$(document).ready(function() {

	if(envs) {
		var count = 1;
		for (var key in envs) {
			(function(key) {
				var element = "<input type='text' data-oldName='"+key+"' id='newName"+count+"' value='"+key+"' /> ";
				element += "<input type='text' data-oldAddress='"+envs[key]+"' id='newAddress"+count+"' value='"+envs[key]+"' /> ";
				element += "<button class='update' id='"+count+"'>Update</button> ";
				element += "<button class='delete' id='"+key+"' >Delete</button><br>";
				$("#envsList").append(element);
				count++;
			}(key));
		}
	}

	$(".update").click(function() {
		var id = $(this).attr('id');
		var NN = $("#newName"+id).val();
		var NA = $("#newAddress"+id).val();
		var ON = $("#newName"+id).attr('data-oldName');
		var OA = $("#newAddress"+id).attr('data-oldAddress');
		delete envs[ON];
		envs[NN] = NA;
		localStorage.setItem('envs', JSON.stringify(envs));
		alert(NN+': '+NA+' updated.');
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
		if(AN == '') {alert("Name cannot be blank."); return false;}
		if(AA == '') {alert("Address cannot be blank."); return false;}
		AN = AN.replace(/[^a-z0-9]+/i, '');
		envs[AN] = AA;
		localStorage.setItem('envs', JSON.stringify(envs));
		location.reload();
	});

});