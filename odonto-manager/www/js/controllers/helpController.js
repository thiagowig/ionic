angular.module('starter.controllers')

  .controller('HelpController', function ($cordovaFile, PopupService) {

    $cordovaFile.writeFile(cordova.file.externalDataDirectory, 'myTestFile.txt', 'Thiago Fonseca is REALLY awesome', true)
      .then(function (result) {
        PopupService.success('Sucesso ao salvar arquivo')
        console.log(JSON.stringify(result))
      }, function (err) {
        PopupService.erro('Erro ao salvar arquivo')
        console.log(JSON.stringify(err))
      })

  })
