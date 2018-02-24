function pageLogin() {

	//var user = firebase.auth().currentUser;

	firebase.auth().onAuthStateChanged(function(user){

		if (user) {
			pageListar();
		}
	});
	
	$(".divPage").hide();
	$("#txtTitulo").html("Login");
	$("#login").show();

}

function criarUsuario() {

	var email = $("#email_login").val();
	var senha = $("#senha_login").val();

	firebase.auth().createUserWithEmailAndPassword(email, senha)
	.then(function(user){

		alert("Usuário cadastrado com sucesso. Pode efetuar login.");
		$("#formLogin").trigger("reset");
		console.log(user);

	})
	.catch(function(error){

		alert("Erro ao cadastrar usuário. Tente outro -email.");
		console.log(error.message);

	});

}

function login() {

	var email = $("#email_login").val();
	var senha = $("#senha_login").val();

	firebase
		.auth()
		.signInWithEmailAndPassword(email, senha)
		.then(function(user){

		$("#formLogin").trigger("reset");
		console.log(user);

		pageListar();

	})
	.catch(function(error){

		alert("Usuário ou senha inválidos.");
		console.log(error.message);

	});

}

function logout() {

	firebase
		.auth()
		.signOut();

	pageLogin();

}

function logarComProvedor( provedor ) {

	firebase.auth().signInWithPopup(provedor)
		.then(function(result){

			alert("Usuario logado com sucesso!");

			console.log(result.user);

		})
		.catch(function(error){

			alert("Falha ao tentar logar no Facebook!");
			console.log(error.message);

		})

}

function logarComGithub() {

	var provedor = new firebase.auth.GithubAuthProvider();

	logarComProvedor( provedor );

}

function logarComGoogle() {

	var provedor = new firebase.auth.GoogleAuthProvider();

	logarComProvedor( provedor );

}

