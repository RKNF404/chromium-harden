# Chromium Harden

Last updated for: `131`

Hardening files for (theoretically) any Chromium browser.

## Config Priority

1) Upstream Default
2) Management Policy
3) Preferences
4) Feature Toggle
5) Flag

## Preferences

Under `chrome://password-manager/settings`, disable `Sign in automatically`\
Under `chrome://settings/cookies`, enable `Do Not Track`\
Block the permission at `chrome://settings/content/backgroundSync`\
Block the permission at `chrome://settings/content/paymentHandler`\
(Optionally) Block the permission at `chrome://settings/content/sound`\
Block the permission at `chrome://settings/content/autoVerify`\
Set the permission at `chrome://settings/content/siteData` to `Delete data sites have saved to your device when you close all windows`, manually whitelist sites you may need\
Under `chrome://settings/onStartup`, set to open New Tab

## Policies

See the json files for the policies, their values, and the documententation for them.

## Flags

`--component-updater=--disable-pings`\
***(privacy)***\
Reduces data sent to the component updater

`--disable-breakpad --disable-crash-reporter`\
***(privacy)***\
Disable crash reporting

`--extension-content-verification=enforce_strict --extensions-install-verification=enforce_strict`\
***(security)***\
Forces all extensions to be validated to prevent tampering

`--incognito`\
***(privacy)***\
To encourage ephemerality, with globally persistent flags it can also launch external links in Incognito

`--js-flags=--jitless`\
***(security)***\
Disables Just-In-Time (JIT) compiled JavaScript, JIT is a *massive* security risk, it should be disabled by default, but it can risk approx 5-50% performance loss depending on the website\
If you experience issues with a site, try **disabling** V8 security for that site under `chrome://settings/content/v8`, this will enable some optimizers in reference to the default this flag offers\
*For Windows*, uses Arbitrary Code Guard (ACG) to prevent renderer processes from violating W^X, and enables the Intel hardware shadow stack to enforce backward-edge CFI

`--no-pings`\
***(privacy)***\
Disables hyperlink auditing

`--ozone-platform=$XDG_SESSION_TYPE`\
***(security functionality LINUX_ONLY)***\
This will set your browser to launch with Wayland or X11 depending on your session default, ideally though you should use Wayland

`--use-gl=angle --use-angle=gl`\
***(performance)***\
Mostly targeted at Linux, but any platform should be able to use this without issues\
But, some platforms offer alternate rendering methods which may be better, such as Metal on Mac or Vulkan on Android and Linux

## Features (Enable)
(`--enable-features=`)

`AcceleratedVideoDecodeLinuxGL,AcceleratedVideoDecodeLinuxZeroCopyGL,AcceleratedVideoEncoder`\
***(performance LINUX_ONLY)***\
Enable hardware accelerated video decoding and encoding on Linux platforms

`CapReferrerToOriginOnCrossOrigin`\
***(privacy)***\
Limits the referrer to only send the origin of the URL\
E.g. just "google.com" instead of "google.com/search"

`ClearCrossSiteCrossBrowsingContextGroupWindowName`\
***(privacy DISFUNCTIONAL)***\
Prevents the window.name property from being leaked across sites

`ContentSettingsPartitioning`\
***(privacy)***\
Isolate Content Settings by Origin

`EnableCsrssLockdown`\
***(security WINDOWS_ONLY)***\
Prevents renderer processes from having access to the CSRSS service

`PartitionConnectionsByNetworkIsolationKey`\
***(privacy)***\
Isolates connection information to prevent cross-site tracking

`PartitionVisitedLinkDatabase`\
***(privacy)***\
Isolates the visited status of sites to prevent history leaks

`PrefetchPrivacyChanges`\
***(privacy)***\
Limits what information is sent to prefetched sites, such as clearing the referrer and prevent access to cookies

`RendererAppContainer`\
***(security WINDOWS_ONLY)***\
Enables the use of AppContainers on renderers to improve the sandboxing

`ScopeMemoryCachePerContext`\
***(privacy DISFUNCTIONAL)***\
Limits memory cache access to the context it was created from

`SplitCodeCacheByNetworkIsolationKey,SplitCacheByNetworkIsolationKey,SplitCacheByIncludeCredentials,SplitCacheByNavigationInitiator`\
***(privacy)***\
Isolates cache to prevent cross-site tracking

`StrictOriginIsolation`\
***(security)***\
Strengthens origin isolation

`WinSboxZeroAppShim`\
***(security)***\
Disables compatibility modes for the renderer

## Features (Disable)
(`--disable-features=`)

`AutofillServerCommunication`\
***(privacy)***\
Disables autofill server data exchange

`InterestFeedV2`\
***(privacy)***\
Disable content suggestions

`MediaDrmPreprovisioning`\
***(privacy)***\
Prevents DRM related communication before needed

`OptimizationHints`\
***(privacy)***\
Disables Optimization Guides, which includes certain AI features

`Reporting,CrashReporting,DocumentReporting`\
***(privacy)***\
Disables the use of the Reporting API in various contexts
