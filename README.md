**⚠️ This project is under development and is not ready for public use.**

All `1.0.x` releases are considered `alpha` releases, are not stable, and may have breaking changes.

---

This is a [nbundle] project bootstrapped with [create-notion-app].

# Get started

```shell
yarn develop --target chrome
```

This will automatically open the target browser for you with the extension automatically installed.

Change `--target` to `firefox`, `edge`, or `desktop` to develop for different platforms.

You can start editing the app by modifying [`app/index.jsx`](app/index.jsx). The extension auto-updates as you edit the file.

# Ship your project

```shell
yarn ship
```

This will ask you to log into your [nbundle] Developer account if you haven't already, then build & publish your project to all platforms you've configured. Depending on the target platform, your project may be pending for review & approval.

# Learn more

To learn more about [nbundle], take a look at the following resources:

- [nbundle Documentation](https://developers.nbundle.com/guides) - learn about [nbundle] features and API.

- [nbundle API Reference](https://developers.nbundle.com/api) - a complete reference of the [nbundle] API.

<!-- Links -->

[nbundle]: https://www.nbundle.com
[create-notion-app]: https://www.github.com/nbundle/create-notion-app
