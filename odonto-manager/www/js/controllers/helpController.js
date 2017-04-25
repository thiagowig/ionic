angular.module('starter.controllers')

  .controller('HelpController', function ($cordovaFile, PopupService) {

    console.log(cordova.file.externalDataDirectory)

    $cordovaFile.writeFile(cordova.file.externalDataDirectory, 'myTestFile.txt', 'Thiago Fonseca is awesome', true)
      .then(function (result) {
        $cordovaFile.readAsText(cordova.file.externalDataDirectory, 'myTestFile.txt')
          .then(function (result) {
            PopupService.success('Sucesso ao salvar arquivo')
            console.log(JSON.stringify(result))
          }, function (err) {
            PopupService.erro('Erro ao salvar arquivo')
            console.log(JSON.stringify(err))
          })
      }, function (err) {
        PopupService.erro('Erro ao salvar arquivo')
        console.log(JSON.stringify(err))
      })

      $cordovaFile.writeFile(cordova.file.externalApplicationStorageDirectory, 'myTestFile.txt', 'Thiago Fonseca is awesome', true)
      .then(function (result) {
        $cordovaFile.readAsText(cordova.file.externalApplicationStorageDirectory, 'myTestFile.txt')
          .then(function (result) {
            PopupService.success('Sucesso ao salvar arquivo')
            console.log(JSON.stringify(result))
          }, function (err) {
            PopupService.erro('Erro ao salvar arquivo')
            console.log(JSON.stringify(err))
          })
      }, function (err) {
        PopupService.erro('Erro ao salvar arquivo')
        console.log(JSON.stringify(err))
      })

      $cordovaFile.writeFile(cordova.file.externalCacheDirectry, 'myTestFile.txt', 'Thiago Fonseca is awesome', true)
      .then(function (result) {
        $cordovaFile.readAsText(cordova.file.externalCacheDirectry, 'myTestFile.txt')
          .then(function (result) {
            PopupService.success('Sucesso ao salvar arquivo')
            console.log(JSON.stringify(result))
          }, function (err) {
            PopupService.erro('Erro ao salvar arquivo')
            console.log(JSON.stringify(err))
          })
      }, function (err) {
        PopupService.erro('Erro ao salvar arquivo')
        console.log(JSON.stringify(err))
      })

    /*
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
          */

  })
