# CodeName firefox extension to debug CodeName

The point of this extension is to make it easier to debug the CodeName game.

In particular, every time I want to test the grid interface, I need to open 4 tabs under different containers,
load the same room, then start the game.

And every time I restart the server, I need to reload each tab, wait for everyone to join the room, then start the game.


Therefore, the initial goal is:
- find all tabs of CodeName
- reload them all
- wait a bit
- start the game

## Other ideas

- If no tab is found, create at least 4.
- Automatic gameplay to run a suite of tests.
- Choose between local server and online
