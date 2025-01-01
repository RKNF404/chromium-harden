# Chromium Hardening Guide

Last updated for: `131`

Hardening guide for (theoretically) any Chromium browser.

## Quick Links

- [Preferences](#preferences)
- [Policies](#policies)
- [Flags](#flags)
- [Features (Enable)](#features-enable)
- [Features (Disable)](#features-disable)

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
(Optionally) Set the permission at `chrome://settings/content/siteData` to `Delete data sites have saved to your device when you close all windows`, manually whitelist sites you may need\
Under `chrome://settings/onStartup`, set to open New Tab

## Policies

#### `AlternateErrorPagesEnabled`
Value: `false`\
***(privacy)***

#### `AudioSandboxEnabled`
Value: `true`\
***(security)***

#### `AuthSchemes`
Value: `"ntlm,negotiate"`\
***(security)***\
Restricts to more secure authentication schemes

#### `AutofillAddressEnabled`
Value: `false`\
***(security)***

#### `AutofillCreditCardEnabled`
Value: `false`\
***(security)***

#### `BackgroundModeEnabled`
Value: `false`\
***(annoyance performance privacy)***

#### `BlockExternalExtensions`
Value: `true`\
***(security)***

#### `BlockThirdPartyCookies`
Value: `true`\
***(privacy)***

#### `BrowserLabsEnabled`
Value: `false`\
***(annoyance)***\
Removes UI bloat and experimental garbage no-one needs

#### `BrowserSignin`
Value: `0`\
***(privacy annoyance)***\
Disables account sign-in with the browser

#### `ChromeVariations`
Value: `2`\
***(privacy annoyance)***\
Prevents Chromium from overriding features remotely

#### `ClearBrowsingDataOnExitList`
***(privacy ~security OPTIONAL)***\
Clears data on exit, use **one-of** the following 2 options

###### `ClearBrowsingDataOnExitList (Option 1)`
Value: `["download_history","cached_images_and_files","autofill","hosted_app_data"]`\
***(privacy OPTIONAL)***\
Clears some useless data on exit, this can be configured if something is needed

###### `ClearBrowsingDataOnExitList (Option 2)`
Value: `["browsing_history","download_history","cookies_and_other_site_data","cached_images_and_files","password_signin","autofill","site_settings","hosted_app_data"]`\
***(privacy ~security OPTIONAL)***\
Clears all data on exit, **WILL RESULT IN DATA LOSS**

#### `ClickToCallEnabled`
Value: `false`\
***(privacy)***\
Disables phone number sharing for Chromium browser across devices

#### `CloudAPAuthEnabled`
Value: `false`\
***(privacy WINDOWS_ONLY)***\
Disables automatic Microsoft cloud identity authentication

#### `CloudPrintProxyEnabled`
Value: `false`\
***(privacy)***\
Disables sharing printers with Google

#### `DefaultBrowserSettingEnabled`
Value: `false`\
***(annoyance)***

#### `DefaultSensorsSetting`
Value: `2`\
***(security privacy)***

#### `DesktopSharingHubEnabled`
Value: `false`\
***(annoyance)***

#### `DnsOverHttpsMode`
***(privacy ~security)***\
Enable encrypted DNS, use values from **one-of** the next 2 options

###### `DnsOverHttpsMode (Option 1)`
Value: `"automatic"`\
***(~privacy ~security)***\
Enable automatic use of encrypted DNS if available by the system/network DNS

###### `DnsOverHttpsMode (Option 2)`
Value: `"secure"`\
***(privacy ~security OPTIONAL)***\
Enable encrypted DNS if the next policy is set

#### `DnsOverHttpsTemplates`
Value: `"https://freedns.controld.com/p2"`\
***(REQUIRES_DnsOverHttpsMode-Option-2)***\
The default DNS used here offers a variety of DNS security features including ECH and content blocking, but any decent DNS resolver could go here instead

#### `DynamicCodeSettings`
Value: `1`\
***(security WINDOWS_ONLY)***\
Uses ACG for the browser process to enforce W^X

#### `EnableMediaRouter`
Value: `false`\
***(privacy)***\
Disable Chrome Cast

#### `ExtensionSettings`
***(security)***\
Technically *optional*, but it should not be\
Limits extensions that can be installed, depending on which **one-of** the following 2 options you choose

###### `ExtensionSettings (Option 1)`
Value: `{"*":{"allowed_types":["extension"],"installation_mode":"blocked",},"ddkjiahejlhfcafbddmgiahcphecmpfh":{"installation_mode":"allowed","override_update_url": true,"update_url":"https://clients2.google.com/service/update2/crx",}}`\
***(security)***\
Block all extensions and extension types but allow uBlock Origin Lite, sets the update source to a trusted location

###### `ExtensionSettings (Option 2)`
Value: `{"*":{"installation_mode":"blocked",}}`\
***(security OPTIONAL)***\
Block all extensions

#### `GenAiDefaultSettings`
Value: `2`\
***(privacy)***\
Disables all AI features

#### `GoogleSearchSidePanelEnabled`
Value: `false`\
***(privacy)***\
Disables some other AI features that deal with Google search and the side-panel

#### `HistoryClustersVisible`
Value: `false`\
***(annoyance)***

#### `HttpsOnlyMode`
Value: `force_enabled`\
***(security)***

#### `MetricsReportingEnabled`
Value: `false`\
***(privacy)***

#### `NativeMessagingBlocklist`
Value: `["*"]`\
***(security)***\
Prevents extensions from communicating with native apps

#### `NetworkPredictionOptions`
Value: `2`\
***(privacy -performance)***

#### `NetworkServiceSandboxEnabled`
Value: `true`\
***(security)***

#### `PasswordManagerEnabled`
Value: `false`\
***(security)***\
Technicall *optional*, but you should really just use a dedicated app or something

#### `PaymentMethodQueryEnabled`
Value: `false`\
***(security)***

#### `PrivacySandboxPromptEnabled`
Value: `false`\
***(privacy)***\
Disables Privacy Sandbox features

#### `PrivateNetworkAccessRestrictionsEnabled`
Value: `true`\
***(security)***\
Restricts access to local (private) addresses for websites

#### `PromotionsEnabled`
Value: `false`\
***(privacy)***

#### `PromptForDownloadLocation`
Value: `true`\
***(security)***

#### `RelatedWebsiteSetsEnabled`
Value: `false`\
***(privacy)***\
Prevents sites from sharing cookies with "related" sites

#### `RemoteAccessHostAllowRemoteAccessConnections`
Value: `true`\
***(security privacy)***\
Why is there remote access in a browser?

#### `RemoteAccessHostAllowRemoteAccessConnections`
Value: `false`\
***(security privacy)***\
Ibid

#### `RemoteAccessHostFirewallTraversal`
Value: `false`\
***(security privacy)***\
Disables firewall awareness for remote access connections

#### `RemoteDebuggingAllowed`
Value: `false`\
***(security)***

#### `SafeBrowsingDeepScanningEnabled`
Value: `false`\
***(privacy -security OPTIONAL)***\
Sending downloaded files to the cloud to be scanned is not a good idea privacy-wise and has little security benefit

#### `SafeBrowsingProxiedRealTimeChecksAllowed`
Value: `false`\
***(privacy -security OPTIONAL)***\
Sacrifice minor security in favor of not sending websites to Google for Safe Browsing

#### `SearchSuggestEnabled`
Value: `false`\
***(privacy OPTIONAL)***

#### `SharedClipboardEnabled`
Value: `false`\
***(privacy)***

#### `ShowFullUrlsInAddressBar`
Value: `false`\
***(annoyance OPTIONAL)***

#### `TranslateEnabled`
Value: `false`\
***(privacy OPTIONAL)***

#### `WebRtcIPHandling`
Value: `"disable_non_proxied_udp"`\
***(privacy OPTIONAL)***

#### `WebRtcTextLogCollectionAllowed`
Value: `false`\
***(privacy)***

## Flags

##### `--component-updater=--disable-pings`
***(privacy)***\
Reduces data sent to the component updater

##### `--disable-breakpad --disable-crash-reporter`
***(privacy)***\
Disable crash reporting

##### `--extension-content-verification=enforce_strict --extensions-install-verification=enforce_strict`
***(security)***\
Forces all extensions to be validated to prevent tampering

##### `--incognito`
***(privacy)***\
To encourage ephemerality, with globally persistent flags it can also launch external links in Incognito

##### `--js-flags=--jitless`
***(security)***\
Disables Just-In-Time (JIT) compiled JavaScript, JIT is a *massive* security risk, it should be disabled by default, but it can risk approx 5-50% performance loss depending on the website\
If you experience issues with a site, try **disabling** V8 security for that site under `chrome://settings/content/v8`, this will enable some optimizers in reference to the default this flag offers.\
*For Windows*, uses Arbitrary Code Guard (ACG) to prevent renderer processes from violating W^X, and enables the Intel hardware shadow stack to enforce backward-edge CFI

##### `--no-pings`
***(privacy)***\
Disables hyperlink auditing

##### `--ozone-platform=$XDG_SESSION_TYPE`
***(security functionality LINUX_ONLY)***\
This will set your browser to launch with Wayland or X11 depending on your session default, ideally though you should use Wayland

##### `--use-gl=angle --use-angle=gl`
***(performance)***\
Mostly targeted at Linux, but any platform should be able to use this without issues\
But, some platforms offer alternate rendering methods which may be better, such as Metal on Mac or Vulkan on Android and Linux

## Features (Enable)
(`--enable-features=`)

##### `AcceleratedVideoDecodeLinuxGL,AcceleratedVideoDecodeLinuxZeroCopyGL,AcceleratedVideoEncoder`
***(performance LINUX_ONLY)***\
Enable hardware accelerated video decoding and encoding on Linux platforms

##### `CapReferrerToOriginOnCrossOrigin`
***(privacy)***\
Limits the referrer to only send the origin of the URL\
E.g. just "google.com" instead of "google.com/search"

##### `ClearCrossSiteCrossBrowsingContextGroupWindowName`
***(privacy DISFUNCTIONAL)***\
Prevents the window.name property from being leaked across sites

##### `ContentSettingsPartitioning`
***(privacy)***\
Isolate Content Settings by Origin

##### `EnableCsrssLockdown`
***(security WINDOWS_ONLY)***\
Prevents renderer processes from having access to the CSRSS service

##### `MacSyscallSandbox`
***(security MACOS_ONLY NOT_TESTED)***\
Enables syscall filtering for the sandbox on MacOS

##### `NetworkServiceCodeIntegrity`
***(security WINDOWS_ONLY)***\
Enable Code Integrity Guard (CIG) in the Network Service process pre-launch

##### `PartitionConnectionsByNetworkIsolationKey`
***(privacy)***\
Isolates connection information to prevent cross-site tracking

##### `PartitionVisitedLinkDatabase`
***(privacy)***\
Isolates the visited status of sites to prevent history leaks

##### `PrefetchPrivacyChanges`
***(privacy)***\
Limits what information is sent to prefetched sites, such as clearing the referrer and prevent access to cookies

##### `RendererAppContainer`
***(security WINDOWS_ONLY)***\
Enables the use of AppContainers on renderers to improve the sandboxing

##### `ScopeMemoryCachePerContext`
***(privacy DISFUNCTIONAL)***\
Limits memory cache access to the context it was created from

##### `SplitCodeCacheByNetworkIsolationKey,SplitCacheByNetworkIsolationKey,SplitCacheByIncludeCredentials,SplitCacheByNavigationInitiator`
***(privacy)***\
Isolates cache to prevent cross-site tracking

##### `StrictOriginIsolation`
***(security)***\
Strengthens origin isolation

##### `WinSboxFilterServiceEnvironment`
***(security WINDOWS_ONLY)***\
Filters environment variables from service processes

##### `WinSboxRestrictCoreSharingOnRenderer`
***(security WINDOWS_ONLY)***\
Prevents renderers from sharing a core with other processes, to prevent Hyperthreading/SMT based side-channel attacks

##### `WinSboxZeroAppShim`
***(security WINDOWS_ONLY)***\
Disables compatibility modes for the renderer

## Features (Disable)
(`--disable-features=`)

##### `AutofillServerCommunication`
***(privacy)***\
Disables autofill server data exchange

##### `InterestFeedV2`
***(privacy)***\
Disable content suggestions

##### `MediaDrmPreprovisioning`
***(privacy)***\
Prevents DRM related communication before needed

##### `OptimizationHints`
***(privacy)***\
Disables Optimization Guides, which includes certain AI features

##### `Reporting,CrashReporting,DocumentReporting`
***(privacy)***\
Disables the use of the Reporting API in various contexts
