# Setup Guide (WIP/Draft)

The following guide will assist in setting up and using a Chromium based browser with the flags and policies present in this guide. It will cover 3 main sections: selecting a browser (covering forks, options for different OSes and alternatives to Chromium should they be viable), applying policies (only for Linux and Windows, but notes for other OSes where applicable), and persisting flags (only covering a few OSes since not all of them support full flag persistence). The primary focus will be on **Linux** and **Windows**, but notes for Android and MacOS will be spread throughout where it makes sense.
\
\
Please note that while I intend for this to be as comprehensive as possible, there will be gaps. For example, I do not have a Mac or a ChromeOS device so I am not capable of offering up-to-date info on methods or options for those systens.

## Quick Links

- [Selecting a browser](#selecting-a-browser)
- [](#)

# Selecting a browser

## Baseline

The most important security detail of a browser is 100% update cycle. Everything else security-wise is useless if the browser is updated once every few months. Vulnerabilities pile up and the more go unpatched, the worse it gets. For reference, chromium/Chrome is usually updated weekly or biweekly excluding holidays. Each update usually has at least one high-severity vuln, or at least a few medium/low. 2 months without updates essentially results in 6+ high severity vulnerabilities, plus the other severity vulns. No amount of hardening will compensate for that.
\
\
The next most important element is build quality, i.e. does it offer at least chromium's default or higher. Most often this is control-flow integrity (CFI), it is an upstream default in chromium on Linux yet for some reason many forks or Linux distros [explicitly disable it](https://salsa.debian.org/chromium-team/chromium/-/blob/master/debian/rules?ref_type=heads#L103). CFI is not common outside of desktop Linux and ChromeOS (for chromium that is), though there are some exceptions such as [Vanadium on Android](https://github.com/GrapheneOS/Vanadium/blob/main/args.gn#L30). Windows chromium uses the platform's Control Flow Guard (CFG) mitigation, most chromium based browsers have this enabled by default. On Linux, many distributions opt to dynamically link as many dependencies as possible to system libraries, mainly for package size and updateability. This is a security regression, since system shared libraries cannot provide CFI protections without [Cross-DSO-CFI](https://clang.llvm.org/docs/ControlFlowIntegrity.html#shared-library-support) which is not used in chromium. The more bundled, the better. I'm not aware if this issue is present on other operating systems. This also forces the use of ThinLTO, which makes CFI less robust, but full LTO is not compatible with dynamic linking.
\
\
The last aspect is additional features on top of vanilla chromium and more secure/private defaults. This also includes the ability to control insecure or unprivate features such as telemetry, or web assembly, etc. This isn't that important and can be optionally ignored, but it is something to be aware of.
\
\
TLDR; If the variant does something worse than Chrome, avoid it. The only leeway is on update cycle, it is physcially impossible to beat Chrome's releases. Anything within 2-3 days is acceptable, but the sooner the better. Less resourced projects have more leeway in this regard. If the variant does something better for security/privacy, that is a reason to use it, but it shouldn't overshadow downsides.

## Proprietary vs Open-Source

Long story short, it makes no difference. Open-source is preferable for transparency reasons, but has little effect on anything in the baseline criteria. Consider the option more like a tie-breaker than a genuine advantage to consider.

## Popular Options

### Chrome

This is the baseline/standard, everything else must either match or beat this to be considered. This guide assumes the usage of Chrome in certain sections, since it is the most general and most common. Chrome has the fastest update cycle and is the most functional/well tested. It is constantly improving and even if it has weak defaults, it is trivial to improve many of them.If you don't know what option to pick, use Chrome.
\
The only downside is that Chrome is proprietary. This has no effect on security nor significant effect on privacy, it is essentially vanilla Chromium with a few proprietary additions and licenced libraries.

### Edge

A very highly regarded option, Edge makes decent security improvements on-top of Chrome, especially on Windows. Such as their Enhanced Security Mode, previously [Super Duper Secure Mode](https://microsoftedge.github.io/edgevr/posts/Super-Duper-Secure-Mode/), and the default use of AppContainer sandboxing for renderer processes. On Linux, it also offers a feature to enforce memory W^X on renderers with JIT disabled (this feature is disabled by default), which is currently only offered by Edge and [Trivalent](https://github.com/secureblue/Trivalent/blob/live/vanadium_patches/0188-Restriction-of-dynamic-code-execution-via-seccomp-bp.patch) (courtesy of [Vanadium](https://github.com/GrapheneOS/Vanadium/blob/main/patches/0188-Restriction-of-dynamic-code-execution-via-seccomp-bp.patch)).
\
The main issue with Edge is telemetry, it is *mandatory* without Windows Enterprise/Educational editions. This makes it a non-contender for privacy but decent for security. It's update cycle can occasionally be spotty, skipping release every now-and-again. Overall, it's about equal to Chrome.
\
This guide does not cover hardening Edge but other such guides exist, such as [Tommy Tran's Edge policies](https://github.com/TommyTran732/Microsoft-Edge-Policies).

### Opera

Avoid. It has mandatory telemetry, poor update cycle, and tons of feature bloat. It has very few if any advantages over Chrome. It does have a decent content-blocker, but I'm not certain if it has decent security (more on this later). Overall, not a great option.

### Brave

Not terrible, but a weak option. It has one central advantage, the content-blocker. Everything else is either matching vanilla chromium or a degredation. For example, they enable MV2 support when that format is actively being deprecated in chromium. MV2 is awful for security, since it allows unrestricted access to all websites and all features to extensions. MV3, while not perfect, fixes many of these issues. In general extensions are bad for security but enabling MV2 is a step backwards. 
\
They also verified their Flathub app, Flatpak's security is... [questionable](https://flatkill.org/) but what's worse is chromium's security in Flatpak. Because Flatpak restricts the usage of Linux namespaces and prevents the use of SUID (for good reason), chromium's sandbox will literally not work. The solution is [zypak](https://github.com/refi64/zypak) or a [direct patch](https://github.com/flathub/org.chromium.Chromium/blob/master/patches/chromium/flatpak-Add-initial-sandbox-support.patch), the problem is these methods are very poorly configured to the point they essentially break the typically very strong sandboxing chromium provides. The issue is not that Brave is packaged as a Flatpak, many chromium browsers are, but they officially endorse it. Not an issue directly but is a flagrant disregard for security.
\
Also lots of attack surface related to crypto stuff and borderline marketing gibberish about privacy, with rather ineffective fingerprinting resistance. The company itself is also questionable in its practices, but that is for you to decide.

### Vivaldi

**HORRIFIC** update cycle. It is proprietary, which isn't the worst, but it is difficult to analyze how good it really is, build-wise. It makes little improvements on Chrome, it does allow you to disable some intrusive integrations and has a content-blocker, but these are minor addtions. It also has **MASSIVE** feature bloat. Again, mandatory telemetry which is surprisingly common.

### Vanilla Chromium

This depends heavily, but usually these are just open-source variants of Chrome with worse update-cycles. Like mentioned in the [baseline](#baseline) section, some have terrible building standards, like disabling CFI or bundling everything under the sun. Some variants go further by disabling the default memory allocator (PartitionAlloc), Debian for example used to use tcmalloc which is borderline a zero-security allocator built for performance. Most builds lack CFI, Fedora Linux only recently started using CFI.

#### ungoogled-chromium

[Bad](https://qua3k.github.io/ungoogled/). The update cycle is inconsistent at best, slow at worst. It disables the component updater which chromium depends on for security reasons, since many features such as CRLSets (used for certificate revocation) are updated as a component. The privacy isn't terrible, in the sense that no data can be collected, but the substantial security risk it offers is massive negative.
\
It suffers the issues of typical vanilla builds, but with the added issues of ungoogled-chromium itself. For example, usage of [tcmalloc in the past](https://github.com/ungoogled-software/ungoogled-chromium-debian/commit/9f7246d1c29d58cd467c540d580ab15bcc9e8b88), but most notably current CFI.

#### Flatpak (Linux)

As mentioned in the [Brave](#brave) section, ***AVOID***! Flatpak *significantly inhibits chromium's sandboxing, and there is no faithful implementation of the sandbox currently.
