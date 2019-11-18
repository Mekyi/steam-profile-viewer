# Steam Profile Viewer

TODO: Description

## Running dev build

1. Install dependencies with `npm install` or `npm ci` command.
2. Download [NWjs](https://nwjs.io/) and extract it somewhere. Then add the location in path system variables.
3. Run NWjs with `nw .` or `npm run start` or `F5` in NWjs debug mode (requires [debugger extension](#debugging)).

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
