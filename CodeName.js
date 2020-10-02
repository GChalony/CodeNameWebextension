function reloadNext4Tabs(){
	browser.tabs.query({currentWindow: true}).then((tabs) =>
                {
                        console.log(tabs);
			let tabsLeft = 0;
                        for (let tab of tabs) {
				if (tab.active) {
					tabsLeft = 4;
				}
				if (tabsLeft){
	                                browser.tabs.reload(tab.id);
					tabsLeft -= 1;
				}
                        }
                }
        ).then((r) => {
		setTimeout(r, 2000)
	}
	).then(() =>
		{
			console.log('Injecting script');
			browser.tabs.executeScript({file: "StartGame.js"});
		});

}


function findCodeNameTabs(tabs){

}

function reloadTab(request, sender){
	console.log('Reload!');
	
	browser.tabs.query({currentWindow: true}).then((tabs) =>
		{
			console.log(tabs);
			for (let tab of tabs) {
				browser.tabs.reload(tab.id);
			}
		}
	);
}

browser.browserAction.onClicked.addListener(reloadNext4Tabs);
