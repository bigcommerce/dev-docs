#!/bin/sh
set -e

if [ -n "${GITHUB_WORKSPACE}" ] ; then
  cd "${GITHUB_WORKSPACE}/${INPUT_WORKDIR}" || exit
fi

git config --global --add safe.directory $GITHUB_WORKSPACE || exit 1

export REVIEWDOG_GITHUB_API_TOKEN="${INPUT_GITHUB_TOKEN}"

find ${GITHUB_WORKSPACE} -type f -name '*.mdx' -exec quality-docs {} + \
  | reviewdog \
      -efm='%-P%f' \
      -efm=' %#%l:%c-%[0-9]%#:%[0-9]%# %# %trror  %m' \
      -efm=' %#%l:%c-%[0-9]%#:%[0-9]%# %# %tarning  %m' \
      -efm='%-Q' \
      -efm='%-G%.%#' \
      -reporter="${INPUT_REPORTER:-github-pr-check}" \
      -filter-mode="${INPUT_FILTER_MODE}" \
      -fail-on-error="${INPUT_FAIL_ON_ERROR}" \
      -level="${INPUT_LEVEL}" \
      ${INPUT_REVIEWDOG_FLAGS} \
      -tee
