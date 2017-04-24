angular.module('starter.controllers')

  .controller('HelpController', function ($cordovaFile, PopupService) {

    console.log(cordova.file.dataDirector)

    $cordovaFile.writeFile(cordova.file.dataDirectory, 'myTestFile.txt', 'Thiago Fonseca', true)
      .then(function(result) {
        PopupService.success('Sucesso ao salvar arquivo')
        console.log(JSON.stringify(result))
      }, function(err) {
        PopupService.erro('Erro ao salvar arquivo')
        console.log(JSON.stringify(err))
      })

    $cordovaFile.writeFile(cordova.file.cacheDirectory, 'myTestFile.txt', 'Thiago Fonseca', true)
      .then(function(result) {
        PopupService.success('Sucesso ao salvar arquivo')
        console.log(JSON.stringify(result))
      }, function(err) {
        PopupService.erro('Erro ao salvar arquivo')
        console.log(JSON.stringify(err))
      })

    $cordovaFile.writeFile(cordova.file.applicationStorageDirectory, 'myTestFile.txt', 'Thiago Fonseca', true)
      .then(function(result) {
        PopupService.success('Sucesso ao salvar arquivo')
        console.log(JSON.stringify(result))
      }, function(err) {
        PopupService.erro('Erro ao salvar arquivo')
        console.log(JSON.stringify(err))
      })

    $cordovaFile.writeFile(cordova.file.applicationDirectory, 'myTestFile.txt', 'Thiago Fonseca', true)
      .then(function(result) {
        PopupService.success('Sucesso ao salvar arquivo')
        console.log(JSON.stringify(result))
      }, function(err) {
        PopupService.erro('Erro ao salvar arquivo')
        console.log(JSON.stringify(err))
      })


  })
