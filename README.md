# hullstrap

Hull theme using compass, sass, and twitter bootstrap.

Live example: [http://hullstrap.s3.amazonaws.com/0.1/index.html](http://hullstrap.s3.amazonaws.com/0.1/index.html)

## How to use the theme:

* Checkout: ``git@github.com:hull/hullstrap.git``

* First, install the dependencies:

  ```
  gem update --system
  gem install compass
  gem install bootstrap-sass
  gem install sass-getunicode
  npm install
  ```

* Then switch to hullstrap dir: ``cd hullstrap``
* Start grunt: ``grunt``
* Open in your browser: ``open http://localhost:3001``

## Grunt tasks

### `grunt develop` or `grunt`

Starts a server on port `3001`, and watchs .sass files.

### `grunt dist`

Build the theme in `dist/<name>`.

If current branch is `master`, `<name>` will be `package.version`. If not `<name>` will be the branch name.

If `--name` option is passed, `<name>` will be `--name` value.

```
grunt dist --name=foo
```

Will build the theme in `dist/foo`.

### `grunt deploy`

To deploy, you need to create an `aws.json` file in the project directory.

```
{
  "key": "",
  "secret": "",
  "bucket": "hullstrap"
}
```

Build the theme and deploy it on S3. It uploads files from `dist/<name>` to `S3/<target>`. Be default `<target>` is set to `<name>`.

If `--target` option is passed, `<target>` will be `--target` value.

If current branch is `master`, deployed files will be served with a `Cache-Control` header set to `public, max-age=29030400`.

### Amazon S3 urls

Example: 
* http://hullstrap.s3.amazonaws.com/version/hullstrap.js
* http://hullstrap.s3.amazonaws.com/version/hullstrap.css
