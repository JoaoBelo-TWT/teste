#!/usr/bin/env bash

error() {
  echo "$*" 1>&2
}

warn() {
  echo "$*" 1>&2
}

debug() {
  if [ "$HUSKY_DEBUG" = "1" ]; then
    echo "husky (debug) - $1"
  fi
}

init_nvm() {

  if [ -d "/usr/local/Cellar/nvm" ]; then
    warn "\033[1mFound nvm installed via Homebrew\033[0m"
    warn ""
    warn "This is not supported and may cause unexpected problems."
    warn "You should uninstall it and use the official installation method:"
    warn ""
    warn "  brew uninstall nvm"
    warn ""
    warn "See https://github.com/nvm-sh/nvm for installation instructions."
  fi

  if command -v nvm >/dev/null; then
    debug "nvm is already loaded, skipping init"
    return 0
  fi

  if [ -z "$NVM_DIR" ]; then
    if [ -d "$HOME/.nvm" ]; then
      export NVM_DIR="$HOME/.nvm"
      debug "found nvm in $NVM_DIR"
    else
      debug "nvm working directory $HOME/.nvm not found"
    fi
  else
    debug "using existing nvm working directory $NVM_DIR"
  fi

  if [ -z "$NVM_DIR" ]; then
    debug "nvm not found, skipping init"
    return 0
  fi

  if [ ! -s "$NVM_DIR/nvm.sh" ]; then
    error "$NVM_DIR/nvm.sh not found"
    return 1
  fi

  debug "loading nvm using $NVM_DIR/nvm.sh"

  # shellcheck disable=SC1090,SC1091
  source "$NVM_DIR/nvm.sh"
  debug "nvm activated"
}

# revisit this script - it breaks when a user
# does not have a default version defined in nvm.
# Also, the script should be using the version defined in .nvmrc,
# and not the user's default one.
#init_nvm


if [ "$HUSKY_DEBUG" = "1" ]; then
  debug "node: $(command -v node)"
  debug "node: $(node --version)"
  debug "npm: $(command -v npm)"
  debug "npm: $(npm --version)"
fi

COMMITLINT_CLI=./node_modules/.bin/commitlint

if [ -e "${COMMITLINT_CLI}" ]; then
  # shellcheck disable=SC2139
  alias commitlint="${COMMITLINT_CLI}"
else
  alias commitlint='npx commitlint'
fi

PACKAGELINT_CLI=./node_modules/.bin/npmPkgJsonLint

if [ -e "${PACKAGELINT_CLI}" ]; then
  # shellcheck disable=SC2139
  alias packagelint="${PACKAGELINT_CLI}"
else
  alias packagelint='npx npmPkgJsonLint'
fi
