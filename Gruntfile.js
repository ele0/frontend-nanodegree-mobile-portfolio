module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Reduce size of image
    responsive_images: {
      dev: {
        options: {
          engine: 'im',
          sizes: [
          {
            width: 100,
            quality: 60,
          },
          {
            width: 800,
            quality: 60
          },
          {
            width: 500,
            quality: 60
          }]
        },

        /*
        only for gif and jpg currently
        */
        files: [{
          expand: true,
          src: ['*.{gif,jpg}'],
          cwd: 'src/views/images/',
          dest: 'dist/views/images/'
        }]
      }
    },

    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: 'src/css',
          src: ['*.css', '!*.min.css'],
          dest: 'dist/css',
          ext: '.min.css'
        }]
      }
    },

    /* Clear out the images directory if it exists */
    clean: {
      dev: {
        src: ['dist/*', 'src/views/images/precompressed/*'],
      },
      // delete temporary min file
      dist: {
        src: ['dist*//*.min.*'],
      },
    },

    /* Generate the images directory if it is missing */
    mkdir: {
      dev: {
        options: {
          create: ['dist/views/images', 'dist/img']
        },
      },
    },

    /* Copy everything into dist except images from view */
    copy: {
      dev: {
        files: [
        // copy files
          {
            expand: true,
            cwd: 'src',
            src: ['**/*', '!**/*.html'],
            dest: 'dist/',
            noProcess: ''
          }]
      },
      main: {
        files:[
        {/* Copy the precompressed images that don't go through processing into the images/directory and everything into dist*/
            expand: true,
            src: 'src/views/images/*.{gif,jpg,png,svg}',
            dest: 'src/views/images/precompressed/',
            flatten: true,
          }]
      }
    },

    imagemin: {
      png: {
        options: {
          optimizationLevel: 7
        },
        files: [
          {
            // Set to true to enable the following options…
            expand: true,
            // cwd is 'current working directory'
            cwd: 'dist/views/images/',
            src: ['**/*.png'],
            // Could also match cwd line above.
            dest: 'dist/views/images/',
            ext: '.png'
          },
          {
            // Set to true to enable the following options…
            expand: true,
            // cwd is 'current working directory'
            cwd: 'dist/img/',
            src: ['**/*.png'],
            // Could also match cwd line above.
            dest: 'dist/img/',
            ext: '.png'
          }
        ]
      },
      jpg: {
        options: {
          progressive: true
        },
        files: [
          {
            // Set to true to enable the following options…
            expand: true,
            // cwd is 'current working directory'
            cwd: 'dist/views/images/',
            src: ['**/*.jpg'],
            // Could also match cwd.
            dest: 'dist/views/images/',
            ext: '.jpg'
          },
          {
            // Set to true to enable the following options…
            expand: true,
            // cwd is 'current working directory'
            cwd: 'dist/img/',
            src: ['**/*.jpg'],
            // Could also match cwd.
            dest: 'dist/img/',
            ext: '.jpg'
          }
        ]
      }
    },

    processhtml: {
       dist: {
         options: {

         },
         files: {
           'dist/index.min.html': ['src/index.html']
         }
       }
     },

    htmlmin: {                                     // Task
      dist: {                                      // Target
        options: {                                 // Target options
          //removeComments: true,
          collapseWhitespace: true
        },
        files: [{
         expand: true,
         cwd: 'src',
         src: '**/*.html',
         dest: 'dist/'
        }]
      },
      dev: {                                       // Another target
        options: {
           //removeComments: true,
           collapseWhitespace: true
         },
         files: {
           'dist/index.html': 'dist/index.min.html'
         }
      }
    },

    uglify: {
      build: {
        files: [{
          expand: true,
          cwd: 'src/',
          src: ['**/*.js', '!*.min.js'],
          dest: 'dist/',
          ext: '.min.js'
        }]
      }
    },



  });

  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-responsive-images');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-mkdir');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-processhtml');

  // default tasks
  grunt.registerTask('default', ['clean:dev', 'copy:dev','responsive_images', 'imagemin', 'cssmin', 'uglify', 'htmlmin:dist', 'processhtml', 'htmlmin:dev', 'clean:dist']);


};

