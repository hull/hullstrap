module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-s3');

  function readOptionalJSON(file) {
    return (grunt.file.exists(file)) ? grunt.file.readJSON(file) : {};
  }

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    clean: ['dist/**'],

    compass: {
      dist: {
        options: {
          sassDir: 'assets/sass/',
          cssDir: 'assets/css/',
          imagesDir: 'assets/images/',
          relativeAssets: false
        }
      },
      develop: {
        sassDir: 'assets/sass/',
        cssDir: 'assets/css/',
        imagesDir: 'assets/images/',
        relativeAssets: false,
        outputStyle: 'expanded',
        debugInfo: true,
        force: true
      }
    },

    cssmin: {
      dist: {
        files: {
          'dist/<%= version %>/hullstrap.css': ['assets/css/*.css']
        }
      }
    },

    uglify: {
      dist: {
        files: {
          'dist/<%= version %>/hullstrap.js': ['assets/js/*.js']
        }
      }
    },

    imagemin: {
      dist: {
        expand: true,
        cwd: 'assets/images/',
        src: ['*.{png,jpg,jpeg}'],
        dest: 'dist/<%= version %>/images/'
      }
    },

    watch: {
      compass: {
        files: ['assets/sass/**/*.{scss,sass}'],
        tasks: 'compass'
      }
    },

    connect: {
      server: {
        options: {
          port: 3001
        }
      }
    },

    aws: readOptionalJSON('aws.json'),

    s3: {
      options: {
        key: '<%= aws.key %>',
        secret: '<%= aws.secret %>',
        bucket: '<%= aws.bucket %>',
        access: 'public-read',
        headers: {
          'Cache-Control': 'public, max-age=<%= cache %>'
        }
      },
      dist: {
        upload: [
          {
            src: 'dist/<%= version %>/**',
            dest: '<%= target %>',
            rel: 'dist/<%= version %>'
          },
          {
            gzip: true,
            src: 'dist/<%= version %>/**',
            dest: '<%= target %>',
            rel: 'dist/<%= version %>'
          }
        ]
      }
    }
  });

  grunt.registerTask('prepare', function() {
    var done = this.async();
    grunt.util.spawn({
      cmd: 'git',
      args: ['rev-parse', '--abbrev-ref', 'HEAD']
    }, function(error, result) {
      var branch = String(result).split('/').pop();
      var isMaster = (branch === 'master');
      var version = grunt.option('name') || (isMaster ? grunt.config.get('pkg.version') : branch);

      grunt.config.set('version', version);
      grunt.config.set('cache', (isMaster ? '29030400' : '0'));
      grunt.config.set('target', grunt.option('target') || version);

      done();
    });
  });

  grunt.registerTask('develop', ['compass:develop', 'connect', 'watch']);
  grunt.registerTask('dist', ['prepare', 'clean', 'compass:dist', 'cssmin' , 'uglify', 'imagemin']);
  grunt.registerTask('deploy', ['dist', 's3']);

  grunt.registerTask('default', 'develop');
};
