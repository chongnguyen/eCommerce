(function(){
  var firebaseConfig = {
    apiKey: "AIzaSyD8Z-hP_DJSPpWL83gw3B7GEQv0RkEX4Yc",
    authDomain: "vefify-phone-number.firebaseapp.com",
    databaseURL: "https://vefify-phone-number.firebaseio.com",
    projectId: "vefify-phone-number",
    storageBucket: "vefify-phone-number.appspot.com",
    messagingSenderId: "172782490831",
    appId: "1:172782490831:web:f1a06422c17e0c75db13ba"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
    'size': 'invisible',
    'callback': function(response) {
      // reCAPTCHA solved, allow signInWithPhoneNumber.
      // onSignInSubmit();
      console.log('chongkkaa')
    }
  });

  var phoneNumber = getPhoneNumberFromUserInput();
  var appVerifier = window.recaptchaVerifier;
  firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
      .then(function (confirmationResult) {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
      }).catch(function (error) {
        // Error; SMS not sent
        // ...
      });
})();