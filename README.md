# hullstrap

Hull theme using compass, sass, and twitter bootstrap.

Live example: [http://neuestrap.s3.amazonaws.com/index.html](http://neuestrap.s3.amazonaws.com/index.html)

## How to use the theme:

* Checkout: ``git@github.com:hull/hullstrap.git``

* First, install the dependencies:

  ```
  gem update --system
  bundle install
  ```

* Start middleman: ``middleman``
* Open in your browser: ``open http://localhost:4567``


### Icon Fonts :

http://fontcustom.com

    fontcustom watch ./source/images/icons -c ./config/fontcustom.yml

### Building

    middleman build

Builds the theme in `tmp/`.

### Deploying

    middleman build; middleman s3_sync

Assuming you have the `config/environment.yml` file set up with your AWS info,
will push to AWS

### `config/environment.yml`

    AWS_KEY: YOUR_AMAZON_KEY
    AWS_SECRET: YOUR_AMAZON_SECRET
    AWS_REGION: REGION (us-east-1,...)

### Amazon S3 urls

Example: 

* http://neuestrap.s3.amazonaws.com/hullstrap.js
* http://neuestrap.s3.amazonaws.com/hullstrap.css
