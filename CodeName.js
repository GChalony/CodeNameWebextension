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

function filterCodeNameTabs(tabs){
	return tabs.filter(tab => tab.title === 'CodeName');
}


function wait(d){
	return new Promise(r => setTimeout(r, d));
}

async function createTabs(domain){
	console.log('Creating tabs');
	const ids = await browser.contextualIdentities.query({});
	let codeIds = ids.filter(id => id.name.includes('Code'));
	let url = "http://" + domain + "/00000000000000000000000000000000/room"
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
			await wait(1000);
		}
	} else {
		console.log('create');
		createTabs("127.0.0.1:5001");
	}
}

browser.browserAction.onClicked.addListener(synchronousTest);
