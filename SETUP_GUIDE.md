# Setup Guide (WIP)

The following guide will assist in setting up and using a Chromium based browser with the flags and policies present in this guide. It will cover 3 main sections: selecting a browser (covering forks, options for different OSes and alternatives to Chromium should they be viable), applying policies (only for Linux and Windows, but notes for other OSes where applicable), and persisting flags (only covering a few OSes since not all of them support full flag persistence). The primary focus will be on **Linux** and **Windows**, but notes for Android and MacOS will be spread throughout where it makes sense.
\
\
Please note that while I intend for this to be as comprehensive as possible, there will be gaps. For example, I do not have a Mac or a ChromeOS device so I am not capable of offering up-to-date info on methods or options for those systens.

## Quick Links

- [Selecting a browser](#selecting-a-browser)
- [](#)

# Selecting a browser

## Baseline

The most important security detail of a browser is 100% update cycle. Everything else security-wise is useless if the browser is updated once every few months. Vulnerabilities pile up and the more go unpatched, the worse it gets. For reference, chromium/Chrome is usually updated weekly or biweekly excluding holidays.
\
\
The next most important element is build quality, i.e. does it offer at least chromium's default or higher. Most often this is control-flow integrity (CFI), it is an upstream default in chromium on Linux yet for some reason many forks or Linux distros [explicitly disable it](https://salsa.debian.org/chromium-team/chromium/-/blob/master/debian/rules?ref_type=heads#L103). CFI is not common outside of desktop Linux and ChromeOS (for chromium that is), though there are some exceptions such as [Vanadium on Android](https://github.com/GrapheneOS/Vanadium/blob/main/args.gn#L30). Windows chromium uses the platform's Control Flow Guard (CFG) mitigation, most chromium based browsers have this enabled by default. On Linux, many distributions opt to dynamically link as many dependencies as possible to system libraries, mainly for package size and updateability. This is a security regression, since system shared libraries cannot provide CFI protections without [Cross-DSO-CFI](https://clang.llvm.org/docs/ControlFlowIntegrity.html#shared-library-support) which is not used in chromium. The more bundled, the better. I'm not aware if this issue is present on other operating systems.
\
\
The last aspect is additional features on top of vanilla chromium and more secure/private defaults. This also includes the ability to control insecure or unprivate features such as telemetry, or web assembly, etc. This isn't that important and can be optionally ignored, but it is something to be aware of.

## Popular Options

### Chrome

### Edge

### Opera

### Brave

### ungoogled-chromium

### Vanilla Chromium

#### Windows

#### Linux

##### Flatpak
