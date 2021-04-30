#!/usr/bin/env bash
SCRIPTDIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$SCRIPTDIR"
export DEBUG="*,-babel"
../node_modules/.bin/webpack serve --progress --config webpack.config.development.ts
