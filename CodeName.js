/* Objective:
 *
 * Search for CodeName tabs (based on tab title?)
 * If any
 * 	Reload them in order
 * Else
 * 	Create 4 new tabs in different containers
 * 	Make them join the same room
 * Finally start game
 */

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
        ).then(
		() => new Promise((resolve) => setTimeout(resolve, 1000))
	).then(() =>
		{
			console.log('Injecting script');
			browser.tabs.executeScript({file: "StartGame.js"});
		}
	).catch((e) => console.log(e));
}


function filterCodeNameTabs(tabs){
	return tabs.filter(tab => tab.title === 'CodeName');
}


function wait(d){
	return new Promise(r => setTimeout(r, d));
}

function reload(tabs){
	console.log('reloading...');
	console.log(tabs);
	let chain = tabs.reduce((prev, tab) => {
		return prev.then(
			() => {
				console.log('reload');
				console.log(tab);
				return browser.tabs.reload(tab.id).then(() => wait(500));
			}
		)
	}, new Promise((r, e) => r(tabs)));
	return chain;
}

function print(any){
	console.log(any);
}


async function createTabs(){
	console.log('Creating tabs');
	const ids = await browser.contextualIdentities.query({});
	let codeIds = ids.filter(id => id.name.includes('Code'));
	let url = "http://127.0.0.1:5001/00000000000000000000000000000000/room"
	browser.tabs.create({
		cookieStoreId: codeIds[0].cookieStoreId,
		url: url
	});
	browser.tabs.create({
                cookieStoreId: codeIds[1].cookieStoreId,
                url: url
        });
	browser.tabs.create({
                cookieStoreId: codeIds[2].cookieStoreId,
                url: url 
        });
	browser.tabs.create({
                cookieStoreId: codeIds[3].cookieStoreId,
                url: url 
        });
}


function promiseTest(){
	browser.tabs.query({currentWindow: true})
		.then(filterCodeNameTabs)
		.then(reload)
		.then(print);
}


function test(){
	browser.tabs.query({currentWindow: true} 
	).then(tabs => {
		browser.tabs.reload(tabs[0].id);
	}
	).then(() => {
			console.log('Injection');
			browser.tabs.executeScript({file: "StartGame.js"});
		});
}

async function synchronousTest(){
	console.log('Starting');
	let tabs = await browser.tabs.query({currentWindow: true});
	console.log('Got tabs');
	let cnTabs = filterCodeNameTabs(tabs);
	console.log('Code Name tabs');
	console.log(cnTabs);
	console.log(cnTabs.length);
	console.log('change?');
	if (cnTabs.length > 0){
		for (const tab of cnTabs){
			await browser.tabs.reload(tab.id);
			console.log('Reloaded');
			await wait(500);
		}
	} else {
		console.log('create');
		createTabs();
	}
}

browser.browserAction.onClicked.addListener(synchronousTest);
