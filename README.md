# evga-checkout-bot

Bot which scans falcodrin discord for evga b stock drop signal. Once triggered, it will automatically load b stock page and buy any model number listed in configuration.

Not currently on the chrome web store, so the extension must be installed manually:
 - First, download the [latest release](https://github.com/philip06/evga-checkout-bot/releases) and unzip
 - Navigate to chrome://extensions
 - Select "Load unpacked" and choose the previously unzipped folder
 - Under the "EVGA Checkout Bot" extension, select Details->Extension options
 - Input the desired model numbers, and the number of times you'd like to refresh b stock page before going back to discord

Requires the following to function properly:
- [x] login to a paypal account on chrome profile
- [x] login to an evga account on chrome profile
- [x] login to a discord account which is in the [falcodrin server](https://discord.com/channels/767566223729754122/869681156797390849) on chrome profile
- [x] evga cart must be empty
