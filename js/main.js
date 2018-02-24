// Initialize Firebase
var config = {
    apiKey: "AIzaSyAxUMCheV73thnkjYDB7OTBWa6eUP0xoyU",
    authDomain: "cards-pos-cloud-computing.firebaseapp.com",
    databaseURL: "https://cards-pos-cloud-computing.firebaseio.com",
    projectId: "cards-pos-cloud-computing",
    storageBucket: "cards-pos-cloud-computing.appspot.com",
    messagingSenderId: "938009155598"
  };
  firebase.initializeApp(config);


$(document).ready(function() {
	pageLogin();
});