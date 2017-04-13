angular.module('starter.controllers')

  .controller('HelpController', function ($cordovaEmailComposer) {
    $cordovaEmailComposer.isAvailable().then(function () {
      console.log('Is available')


    }, function () {
      console.log('Sorry, but it is not available')
    });

    var email = {
      to: ['dev.thiago@gmail.com'],
      subject: 'Cordova Icons',
      body: 'How are you? Nice greetings from Leipzig',
      isHtml: true
    };

    $cordovaEmailComposer.open(email).then(null, function () {
      // user cancelled email
      console.log('// user cancelled email')
    });

  })
