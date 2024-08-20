# Windows Stuff

These are flags and policies for Windows, they have no harm on Linux but adding them can bloat the main files.
\
If you use Windows and a chromium-based browser, I recommend you add these.
\
NOTE: These are ADDITIONAL on to top of the existing policies and flags. It would be ideal to figure out which flags and policies do not translate properly from Linux to Windows. For example, video encode/decode hardware acceleration are on by default on Windows (so they are not needed).
\
\
Current Target Version: 127

## Flags

`WinSboxZeroAppShim,RendererAppContainer,EnableCsrssLockdown`
\
Improves the sandboxing of Renderers.
\
\
`ThirdPartyModuleBlocking`
\
Prevents code injection into the main process.

## Policies

`CloudAPAuthEnabled`
\
Disables automatic sign-in using Windows cloud identity.
\
\
`DynamicCodeSettings`
\
Enables ACG in the browser process.
