/*global module:false*/
module.exports = function(grunt) {
  'use strict';

  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');

  var SASSDIR = 'assets/sass',
    CSSDIR = 'assets/css',
    JSDIR = 'assets/js/',
    IMAGESDIR = 'assets/images/',
    DIRSOURCE = 'src/',
    DIRLIBS = 'libs/',
    DIRPLUGINS = 'plugins/',
    DIRMODULES = 'modules/',
    port = 3001;

  var gruntConfig = {
    watch: {
      compass: {
        files: [
          SASSDIR+'/**/*.{scss,sass}'
        ],
        tasks: 'compass:dev'
      }
    },
    connect: {
      server: {
        options: {
          port: port
        }
      }
    },
    compass: {
      dev: {
        options: {
          sassDir: SASSDIR,
          cssDir: CSSDIR,
          outputStyle: 'expanded',
          noLineComments: false,
          force: true,
          debugInfo: true,
          imagesDir: IMAGESDIR,
          relativeAssets: true
        }
      },
      prod: {
        options: {
          sassDir: SASSDIR,
                    cssDir: CSSDIR,
          outputStyle: 'compressed',
          noLineComments: true,
          force: true,
          debugInfo: false,
          imagesDir: IMAGESDIR,
          relativeAssets: false
        }
      }
    }
  };
  grunt.initConfig(gruntConfig);

  // default build task
  grunt.registerTask('default', ['compass:dev', 'connect','watch']);
  grunt.registerTask('build', ['compass:prod']);

};
