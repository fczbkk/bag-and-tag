# Bag And Tag

NodeJS task for publishing a project. Intended to be used in NPM script.

The workflow is set for my personal projects. I plan to add the support for per-project configuration. In the meantime, use at your own risk.

# Install

```shell
npm install bag-and-tag
```

## How to use it

Add task to your `package.json`:

```json
{
  "scripts": {
    "release": "./node_modules/.bin/bag-and-tag"
  }
}
```

Then, when you want to release a new version of the project:

```shell
npm run release
```

## Bug reports, feature requests and contact

If you found any bugs, if you have feature requests or any questions, please, either [file an issue at GitHub](https://github.com/fczbkk/bag-and-tag/issues) or send me an e-mail at [riki@fczbkk.com](mailto:riki@fczbkk.com).

## License

This library is published under the [MIT license](https://github.com/fczbkk/bag-and-tag/blob/master/LICENSE).
