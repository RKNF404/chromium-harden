# Chromium Harden

Hardening files for the Chromium browser for Linux.
\
\
Want to know what each setting does? Go to `about:policy` in your browser and scroll the policies named POLICY_COMMENTS, they detail every change from their respective policy files. For flags, go to terminal and type `nano /etc/chromium/chromium.conf`, or open that file in your favorite text editor or viewer of choice, this will allow you to look at every flag and feature and what it approximately does.

## Config Priority

1) Management Policy (file)
2) Settings (GUI)
3) Feature Toggle (cmdline)
4) Flag (cmdline)

## Q&A

### Q: How do I apply the hardening?
Download the files you want. In the `conf/` directory in this repository there are 5 main files. `chromium.conf` is flags stuff, `chromium-harden-policy.json` is the managed (meaning the changes can not be overwritten) policy, and `chromium-harden-recommended.json` is the recommended (meaning you can override its changes) policy. I recommend using all 3. The main target is Fedora so I will only explain how to apply it to that.
\
\
Move `chromium.conf` to `/etc/chromium/chromium.conf`, in terminal you can simply run (as root) `mv /path/to/chromium.conf /etc/chromium/chromium.conf`. If that file already exists you can safely overwrite it. Only regular Fedora, this file is used to enable hardware accelerated video encoding and decoding (this is also enabled in my own file). Next, move `chromium-harden-policy.json` to `/etc/chromium/policies/managed/`, in terminal you can simply run (as root) `mv /path/to/chromium-harden-policy.json /etc/chromium/policies/managed/`. Next, move `chromium-harden-recommended.json` to `/etc/chromium/policies/recommended/`, in terminal you can simply run (as root) `mv /path/to/chromium-harden-recommended.json /etc/chromium/policies/recommended/`. There is another policy I recommend that is also included, `chromium-harden-dns.json`. In chromium, you cannot set the secure DNS setting when the browser is managed, this policy sets secure DNS to be on (currently using a Control D free DNS configuration with malware and ad/tracker blocking). To add it, move it to `/etc/chromium/policies/managed/`, similar to `chromium-harden-policy.json`. I also recommend you check out the browser settings section below to configure further what policies and flags cannot. Validate it works using the next question.
\
\
The last recommendation I have is to use `chromium-harden-search.html`. This is a super simple HTML page that will randomize your searches (locally) to a random SearXNG instance from a predefined list, submitting it using POST requests as well to reduce search leakage. To add it do the following. Download `chromium-harden-search.html` to your system, remember where, ideally find a permanent location (no not your Downloads folder, I recommend `/etc/chromium/pages/` but it is up to you). Next, go to `chrome://settings/searchEngines` in your browser and press `Add`. Name the engine whatever you want, officially it is called "Chromium Harden Search (SearXNG Randomizer)" but it doesn't matter or make any difference, shortcut also doesn't matter, in the URL field add the following `file:///path/to/chromium-harden-search.html?q=%s` but replace `/path/to/` with the actual path to get to the downloaded `chromium-harden-search.html` (in my case the result would be `file:///etc/chromium/pages/chromium-harden-search.html?q=%s`, yes there are 3 `/`es that is not mistake). Verify it works by just searching, if it says `ERR_FILE_NOT_FOUND` then you added the wrong directory.

### Q: How can I be sure it works?
For flags, go into `about:version` when you launch the browser, you should see the flags under `Command Line:`. You can also confirm it is working by seeing if the browser launches by default in Incognito, if it does then there a level certainty that it is working. For policies, check `about:policy`, if you see it populated with policies and their Status says `OK` then it should be working. The only policies that SHOULD have the status `Error` are those in the ALL_CAPS underscore format, those policies are purely informational.

### Q: The above doesn't match, what do?
Make sure you are using a supported distro, make sure you are using vanilla chromium (typically from your distro's official repository), and make sure you did the methods above properly. I typically catch issues before pushing changes so I don't think there should be project level sources, but you can still report it and I can help to solve the issue. I can't help troubleshoot without knowing what is going on.

### Q: Something is broken!
Try removing the files. If it is still broken, re-install chromium. If adding the configs causes the breakage and never fixes, it is a bug in chromium related to one of these features and should ideally be reported. Otherwise, you can just report what breaks and what version of the browser you are using. If flags aren't the issue, repeat the process with the policies. Though, policies are less likely to be broken since they are intended to be a more official way of configuring the browser than flags are.

### Q: What about the browser settings?
I'm glad you asked, my brain pretending it's the reader. I'll just give my setup, obviously everyone works different so if I disable something you need, then just don't disable it. It should be noted that some stuff is already disabled via policy. Under 'Autofill and passwords', in the Password Manager I disable automatic sign in. Now, 'Privacy and security', enable Do Not Track. Yes, I know DNT sucks but there are cases that it is respected, and it is a very small bit of entropy most people have on anyway. In Security, I recommend enabling Safe Browsing on standard protection, websites you visit are not sent to Google for this service. If you are worried about your IP, it is already being exposed through the component updater which is security critical, but you do you. Lastly under P&S, Site settings. Here is what I recommend: disable Background sync, disable Payment handlers, disable Automatic PiP if you want, disable Sound (this is just for me, because I hate it when websites just randomly play sounds), disable Protected content IDs, you can also just disable Protected content if you don't plan to watch it (if given the option), disable Auto-verify, and lastly if you have On-device site data setting then set it to delete site data on window close. The reason I don't modify other permissions, like camera and GPS, is because they are prompt to allow and only show up once if you reject them. If you are worried about misclicks, then disable all the permissions to your liking. Again, your browser, not mine. In 'Search engine', add your search engine of choice, plenty of "private" options. I hate all search engines personally, so I won't recommend anything specific. PrivacyGuides.org has some decent recommendations, check it out. I do have a pseudo search engine thing that just randomizes between a few defined SearXNG instances, read above on how to add that. 'On startup', open new tabs or about:blank. 'Languages', if you are an English speaker set your language to English (United States), makes you a little less unique since most people on the internet are of this language. 'Downloads', show downloads when they're done. That's it, nice and short right? If you want something done differently then just do it differently, again, this is what I do and it is not universal, no config is or can be.

### Q: What about extensions and adblock?
I do not intend to whitelist more extension at this time. The only extension I allow via whitelist is uBlock Origin Lite, the MV3 version of uBlock Origin, it works great for me. I also pair that with the default DNS which provides solid blocking ability on its own. If you REALLY NEED more extensions, manually whitelist them in the policy.

### Q: Custom Chromium builds for extra hardening?
[Secureblue's hardened chromium](https://github.com/secureblue/hardened-chromium), though these are not mine you should use them if you want that extra hardening. I do not intend to publish my own chromium builds. Many patches for that browser are from Vanadium or contain very similar changes to my own (but better since they are build integrated and don't rely on the feature and policy system). I am also a contributor there, I also recommend the main operating system [secureblue](https://github.com/secureblue/secureblue) itself.

### Q: What versions/variations of chromium are supported?
Just vanilla Chromium on Linux (mainly Fedora). I don't currently, or ever intend to, support any other platforms or other browsers like Brave, Edge, Vivaldi, Opera, Ungoogled-Chromium, etc. Not every distro is supported but many distros support some form of persistent flags features. [Fedora](https://fedoraproject.org/) I support directly because it is popular and what I personally use. Other distros that I know can persist flags are [Arch](https://archlinux.org/), [NixOS](https://nixos.org/), [Chimera Linux](https://chimera-linux.org/), [Debian](https://www.debian.org/), [Ubuntu](https://ubuntu.com/), [Gentoo](https://www.gentoo.org/), and likely many others.

### Q: Why did you make this?
Because Firefox security is sub-par compared to chromium, plus my own user.js was very big and very hard to maintain. Even using a basis of [arkenfox](https://github.com/arkenfox/user.js), because I like to make my own changes and don't agree with all the changes made, it was just very annoying. Maintaining this is way easier than a user.js with way more benefit. Another reason is because there wasn't anything similar to [arkenfox](https://github.com/arkenfox/user.js) for chromium, the closest things are a dead project similar to this one called [ChromiumHardening](https://github.com/melo936/ChromiumHardening) and [Ungoogled Chromium](https://github.com/ungoogled-software/ungoogled-chromium) (which has a lot of flaws).

### Q: I want to add something!
A: Great, submit a PR or an issue, I'll get to it... eventually... maybe. Or don't, up to you really.
