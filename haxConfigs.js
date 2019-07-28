function waitForElement(selector, selection) {
  console.log('args',arguments.length);
  var element;
  if (arguments.length > 1) {
	  console.log('arg2',arguments[1]);
	  element = document.getElementsByClassName("gameframe")[0].contentWindow.document.querySelectorAll(selection);
	} else {
	console.log('arg1',arguments[0]);
	element = document.getElementsByClassName("gameframe")[0].contentWindow.document.querySelector(selector);
  }
  return new Promise(function(resolve, reject) {

    if(element) {
      resolve(element);
      return;
    }

    var observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        var nodes = Array.from(mutation.addedNodes);
        for(var node of nodes) {
          if(node.matches && node.matches(selector)) {
            resolve(node);
            return;
          }
        };
      });
    });

    observer.observe(document.getElementsByClassName("gameframe")[0].contentWindow.document, { childList: true, subtree: true });
  });
}





function addonSettingsPopup(currentView) {
	var addonSettings = document.createElement('div');
	addonSettings.className = 'dialog settings-view';
	addonSettings.style.display = 'none';

	var addonSettingsHeader = document.createElement('h1');
	addonSettingsHeader.innerText = 'Add-on Settings';
	addonSettings.appendChild(addonSettingsHeader);

	var addonSettingsClose = document.createElement('button')
	addonSettingsClose.innerText = 'Close';
	addonSettings.appendChild(addonSettingsClose);
	
	var addonSettingsOpen = document.createElement('button');
	addonSettingsOpen.innerText = 'Add-on';
	addonSettingsOpen.setAttribute('data-hook','add-on');
	
	var addonSection = document.createElement('div');
	addonSettings.appendChild(addonSection);
	addonSettings.appendChild(copyright());
	addonSection.className = 'section selected';
	addonSection.appendChild(configElem('haxSearchConfig',true,'Search bar by Raamyy and xenon'));
	addonSection.appendChild(configElem('haxAutoJoinConfig',true,'Room AutoJoin by xenon'));
	addonSection.appendChild(configElem('haxKickBanConfig',false,'Room Kick/Ban shortcuts by xenon'));
	addonSection.appendChild(configElem('haxMuteConfig',true,'Local mute by xenon'));
	addonSection.appendChild(configElem('haxNotifConfig',false,'Game notifications by xenon'));
	addonSection.appendChild(configElem('haxTransChatConfig',false,'Transparent chat by xenon and Pacific'));
	addonSection.appendChild(configElem('haxViewModeConfig',false,'View-mode hotkeys by xenon'));
	
	if (currentView == 'choose-nickname-view') {
		var nicknameView = el.contentWindow.document.getElementsByClassName('choose-nickname-view')[0];
		
		addonSettingsClose.onclick = function () {
			addonSettings.style.display = 'none';
			nicknameView.childNodes[1].style.display = 'flex';
		};
		
		addonSettingsOpen.onclick = function () { 
			addonSettings.style.display = 'flex';
			nicknameView.childNodes[1].style.display = 'none';
		}
		
		nicknameView.appendChild(addonSettings);

		var okButton = el.contentWindow.document.querySelector('[data-hook="ok"]');
		var buttonDiv = document.createElement('div');
		buttonDiv.align = 'center';
		
		var dividerDiv = document.createElement('div');
		dividerDiv.style = 'width:5px; display:inline-block';
		
		okButton.parentNode.insertBefore(buttonDiv, okButton);
		buttonDiv.appendChild(okButton);
		buttonDiv.appendChild(dividerDiv);
		buttonDiv.appendChild(addonSettingsOpen);
	}
	
	else { 
		var gameframe = document.getElementsByClassName('gameframe')[0];
		var settingButton = gameframe.contentWindow.document.querySelector('[data-hook="settings"]');
		var topSec = gameframe.contentWindow.document.getElementsByClassName('top-section')[0];
		// transChatDependent
		var gameframe = document.documentElement.getElementsByClassName("gameframe")[0];
		var bottomSec = gameframe.contentWindow.document.getElementsByClassName('bottom-section')[0];
		var statSec = gameframe.contentWindow.document.getElementsByClassName('stats-view')[0];
		var chatInput = gameframe.contentWindow.document.querySelector('[data-hook="input"]');
		// transChatDependent
		addonSettings.style.position = 'absolute';
		addonSettings.style.left = 0;
		addonSettings.style.right = 0;
		addonSettings.style.top = '15%';
		addonSettings.style.marginLeft = 'auto';
		addonSettings.style.marginRight = 'auto';
		topSec.parentNode.appendChild(addonSettings);
		
		addonSettingsClose.append(' - press ESC twice to apply');
		
		addonSettingsClose.onclick = function () {
			addonSettings.style.display = 'none';
		}
		
		addonSettingsOpen.onclick = function () { 
			var oldVal;
