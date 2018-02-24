function pageCadastrar() {
	
	$(".divPage").hide();
	$("#txtTitulo").html("Cadastrar Card");
	$("#cadastrar").show();

}

function pageListar() {

	$(".divPage").hide();
	$("#txtTitulo").html("Listar Cards");
	$("#listar-cards").show();

	firebase
		.database()
		.ref("cards")
		.on("value", function(snapshot) {

			var card = "";
			$("#listar").empty();

			snapshot.forEach(function(child) {

				console.log(child);

				card = "";									
				card = "<div class=\"col-lg-4 col-sm-6\">" +
				"<div class=\"card\" style=\"width: 18rem;\">" +
					"<img class=\"card-img-top\" src=\"" + child.val().foto + "\" alt=\"Card image cap\">" +
					"<div class=\"card-body\">" +
						"<p class=\"card-text\">" + child.val().descricao + "</p>"+

						"<div>"+
							"<button type=\"button\" id=\"btn_curtir_"+ child.key + "\" class=\"btn btn-primary\" onclick=\"curtirCard('"+child.key+"'," + child.val().likes + ")\">Curtir (" +child.val().likes + ")</button>" + 
							"<button type=\"button\" class=\"btn btn-danger\" onclick=\"apagar('" + child.key + "','" + child.val().caminhoFoto +"')\">Deletar</button>" +
						"</div>"+
					"<div>"+				
				"</div>" +
				"</div>";
				console.log(card);
				$("#listar").append(card);
				

			});

			

	});

}

function curtirCard(key, likes) {

	$("button").attr("disabled", "true");

	var data = {
		likes: likes + 1
	};
	
	firebase.database().ref("cards/" + key).update(data)
		.then(function(result) {

			alert("Card curtido com sucesso!");
			console.log(result);

			$("button").removeAttr("disabled");

			pageListar();

		})
		.catch(function(error) {

			alert("Erro ao curtir card!");
			console.log(error.message);

		});

}


function cadastrar() {

	$("button").attr("disabled", "true");	

	var file = $("#foto")[0].files[0];

	var task = firebase
		.storage()
		.ref("cards/" + file.name)
		.put(file);

	
	task.on('state_changed', 
	function progress( snapshot ) {

		var parcial = snapshot.bytesTransferred;
		var total = snapshot.totalBytes;
		var porcentagem = (parcial / total);

		$("#upload_foto").val(porcentagem);

	},
	function error(error){

		alert("Erro ao efetuar upload do arquivo!");
		console.log(error.message);


	}, function complete() {

		firebase
		.storage()
		.ref("cards/" + file.name)
		.getDownloadURL()
		.then(function( url ) {

			var data = {
				descricao: $("#descricao").val(),
				likes: 0,
				foto: url,
				caminhoFoto: "cards/" + file.name
			};

			firebase.database().ref("cards").push(data)
				.then(function(result) {

					alert("Card cadastrado com sucesso!");
					console.log(result);

					$("button").removeAttr("disabled");
					$("#formCadastrar").trigger("reset");

					pageListar();

				})
				.catch(function(error) {

					alert("Erro ao cadastrar card!");
					console.log(error.message);

				});




		})
		.catch(function(error){

			alert("Erro ao obter URL de Download do arquivo!");
			console.log(error.message);

		});

	});
	

}

function editar() {

	$("button").attr("disabled", "true");

	var data = {
		descricao: $("#descricao_editar").val(),
		foto: $("#foto_editar").val()
	};

	var key = $("#key_editar").val();

	firebase.database().ref("cards/" + key).update(data)
		.then(function(result) {

			alert("Card atualizado com sucesso!");
			console.log(result);

			$("button").removeAttr("disabled");
			$("#formEditar").trigger("reset");

			pageListar();

		})
		.catch(function(error) {

			alert("Erro ao editar card!");
			console.log(error.message);

		});

}

function apagar(key, caminho_foto) {

	var retorno = confirm("Deseja realmente apagar?");

	if (retorno) {

		firebase
			.storage()
			.ref(caminho_foto)
			.delete()
			.then(function(result) {

				firebase.database().ref("cards/" + key).remove()
					.then(function(result) {

						alert("Card deletado com sucesso!");
						console.log(result);


					})
					.catch(function(error) {

						alert("Erro ao deletar card!");
						console.log(error.message);

					});

			})
			.catch(function(error){

				alert("Erro ao deletar imagem do Storage!");
				console.log(error.message);

			});

		
	}
}