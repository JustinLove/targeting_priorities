# Targeting Priorities

Make units prioritize targeting units which threaten them directly. Second priority is fabbers, which seem to be human player's prime target.  Currently only addresses air-ground interface.

Priorities don't do as much as you'd like.  It only affects selection among units already in range.  Bombers always setting up their runs out of range, so they have virtually no selectivity.

## Trivia

- The commander's stock AA weapon prefers non-air mobile units ???
- If priorities are unspecified, walls are last.
- Once a unit locks onto a target, it keeps going until it's dead or out of range - even a wall.

## Development

The generated project includes a `package.json` that lists the dependencies, but you'll need to run `npm install` to download them.

PA will upload **all files** in the mod directory, including `node_modules` and maybe even `.git` - you probably don't want to use this in `server_mods` directly, unless you really like waiting.  The template is set up run to run as a project within a peer directory of `server_mods` - I use `server_mods_dev/mod_name`.  The task `grunt copy:mod` will copy the mod files to `../../server_mods/identifier`, you can change the `modPath` in the Gruntfile if you want to run it from somewhere else.

### Available Tasks

- copy:mod - copy the mod files into server_mods
- proc - Proc: read one or more files from PA and munge into one in the mod.
- default: proc, copy:mod
