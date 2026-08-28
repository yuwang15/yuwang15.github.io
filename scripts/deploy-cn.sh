#!/usr/bin/env bash
#
# Deploy the mainland China line: Aliyun OSS static hosting behind Aliyun CDN.
# The overseas line (Vercel) ships the same dist via `npm run deploy:global`.
#
# Prerequisites:
#   brew install ossutil          # https://help.aliyun.com/zh/oss/developer-reference/ossutil
#   ossutil config                # or export the OSS_* variables below
#
# Required environment:
#   OSS_BUCKET     e.g. syw-web
#   OSS_ENDPOINT   e.g. oss-cn-shanghai.aliyuncs.com
# Optional:
#   CDN_DOMAIN     e.g. www.houseofsyw.com   (triggers a CDN purge when set)
#
# Usage:
#   npm run deploy:cn
#   npm run deploy:cn -- --skip-build     # reuse the existing dist
#   npm run deploy:cn -- --dry-run        # prune and report, upload nothing

set -euo pipefail

cd "$(dirname "$0")/.."

STAGING=".deploy/cn"
FILTER="scripts/deploy-cn.rsync-filter"
SKIP_BUILD=0
DRY_RUN=0

for arg in "$@"; do
  case "$arg" in
    --skip-build) SKIP_BUILD=1 ;;
    --dry-run) DRY_RUN=1 ;;
    *) echo "unknown option: $arg" >&2; exit 2 ;;
  esac
done

if [[ $DRY_RUN -eq 0 ]]; then
  : "${OSS_BUCKET:?set OSS_BUCKET to your bucket name}"
  : "${OSS_ENDPOINT:?set OSS_ENDPOINT, e.g. oss-cn-shanghai.aliyuncs.com}"
  command -v ossutil >/dev/null || { echo "ossutil not found; see the header of this script" >&2; exit 1; }
fi

if [[ $SKIP_BUILD -eq 0 ]]; then
  # Derivatives are gitignored and generated locally, so refresh them before
  # building: the manifest they write is what enables srcset in the bundle.
  echo "==> generating responsive derivatives"
  npm run images:responsive
  echo "==> building"
  npm run build
fi

[[ -d dist ]] || { echo "dist/ is missing; run without --skip-build" >&2; exit 1; }

echo "==> pruning into $STAGING"
rm -rf "$STAGING"
mkdir -p "$STAGING"
rsync -a --filter="merge $FILTER" dist/ "$STAGING/"

echo "    dist:    $(du -sh dist | cut -f1)"
echo "    staging: $(du -sh "$STAGING" | cut -f1) ($(find "$STAGING" -type f | wc -l | tr -d ' ') files)"

if [[ $DRY_RUN -eq 1 ]]; then
  echo "==> dry run, nothing uploaded"
  exit 0
fi

OSS_TARGET="oss://$OSS_BUCKET/"
oss_cp() {
  ossutil cp -r -u -f --endpoint "$OSS_ENDPOINT" "$@"
}

# Assets go up before the HTML that references them, so a visitor mid-deploy
# never gets a document pointing at files that do not exist yet.

echo "==> uploading hashed bundles (immutable)"
oss_cp --meta "Cache-Control:public, max-age=31536000, immutable" \
  --include "*.js" --include "*.css" --include "*.woff2" \
  "$STAGING/" "$OSS_TARGET"

# Images and video keep stable filenames, so they must stay revalidatable:
# an immutable year would strand browsers on an old shoot until they clear
# their cache, and a CDN purge cannot reach a copy already on the device.
echo "==> uploading media and static files (30 days)"
oss_cp --meta "Cache-Control:public, max-age=2592000" \
  --exclude "*.html" --exclude "*.js" --exclude "*.css" --exclude "*.woff2" \
  "$STAGING/" "$OSS_TARGET"

echo "==> uploading HTML (no-cache)"
oss_cp --meta "Cache-Control:no-cache" \
  --include "*.html" \
  "$STAGING/" "$OSS_TARGET"

if [[ -n "${CDN_DOMAIN:-}" ]]; then
  if command -v aliyun >/dev/null; then
    echo "==> purging CDN for $CDN_DOMAIN"
    aliyun cdn RefreshObjectCaches \
      --ObjectType Directory \
      --ObjectPath "https://$CDN_DOMAIN/"
  else
    echo "==> aliyun CLI not found; purge $CDN_DOMAIN by hand in the CDN console" >&2
  fi
fi

echo "==> done"
