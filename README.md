# Steam Profile Viewer

This is an application for searching public steam profiles and viewing information about their games. Searching can be done using a custom steam URL or a steam user ID.

## Running dev build

1. Install dependencies with `npm install` or `npm ci` command.
2. Download [NWjs](https://nwjs.io/) and extract it somewhere. Then add the location in path system variables (optional).
3. Run NWjs with `nw .` or `npm run start` or `F5` in NWjs debug mode (requires [debugger extension](#debugging)) OR run it using the absolute path, for example `C:\Users\User\Downloads\nwjs-v0.42.2-win-x64\nw.exe .`.

## API key

Steam API key is read from the .env file that must be located in project root folder. Format should be following:

```conf
# /steam-profile-viewer/.env

API_KEY = 'API_KEY_GOES_HERE'
```

## Debugging

Dev build can be debugged using [NWjs Debugger extension](https://marketplace.visualstudio.com/items?itemName=ruakr.vsc-nwjs) for Visual Studio Code.

## Documentation

Documentation is autogenerated with JSDoc by running

```npm
npm run doc
```

## Tests

Tests are using Mocha and Chai testing frameworks. Tests are run by using command

```npm
npm run test
```

and test report is written to a HTML file report.html with this command

```npm
npm run test-report
```

## Build

Build executable using

```npm
npm run build
```

Build app can be found in build folder.
