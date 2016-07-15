// If you make changes here, you have to reload the extension (in settings) for them to take effect

// Any function in this file can be referenced elsewhere by using chrome.extension.getBackgroundPage().myFunction()
// For example, you can reference the login function as chrome.extension.getBackgroundPage().login()

function login(config, logger, callback) {
  if (!callback) { // logger param is optional; if there are only two, the second is callback
    callback = logger;
    logger = console;
  }

  var authUrl = config.implicitGrantUrl
      + '?response_type=token&client_id=' + config.clientId
      + '&scope=' + config.scopes
      + '&redirect_uri=' + chrome.identity.getRedirectURL("oauth2");

  logger.debug('launchWebAuthFlow:', authUrl);

  chrome.identity.launchWebAuthFlow({'url': authUrl, 'interactive': true}, function(redirectUrl) {
    alert("login redirectUrl:" + redirectUrl);
    logger.debug('launchWebAuthFlow login complete');
    return callback(redirectUrl)
  });
}

function logout(config, logger, callback) {
  if (!callback) { // logger param is optional; if there are only two, the second is callback
    callback = logger;
    logger = console;
  }

  var logoutUrl = config.logoutUrl;

  logger.debug('launchWebAuthFlow:', logoutUrl);

  chrome.identity.launchWebAuthFlow({'url': logoutUrl, 'interactive': false}, function(redirectUrl) {
    alert("logout redirectUrl:" + redirectUrl);
    logger.debug('launchWebAuthFlow logout complete');
    return callback(redirectUrl)
  });
}
