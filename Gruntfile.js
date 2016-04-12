module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    responsive_images: {
      dev: {
        options: {
          engine: 'im',
          sizes: [
          {
            width: 1024,
            quality: 60
          },
          {
            width: 800,
            quality: 60
          },
          {
            width: 500,
            quality: 60
          },
          {
            width: 100,
            quality: 60,
          }]
        },

        /*
        only for gif and jpg currently
        */
        files: [{
          expand: true,
          src: ['*.{gif,jpg}'],
          cwd: 'src/views/images/',
          dest: 'src/views/images/precompressed/'
        }]
      }
    },

    /* Clear out the images directory if it exists */
    clean: {
      dev: {
        src: ['dist/*', 'src/views/images/precompressed/*'],
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
            src: ['**/*',  '!**/views/images/**', '!**/img/**'],
            dest: 'dist/',
            noProcess: ''
          }]
      },
      main: {
        files:[
        {/* Copy the "fixed" images that don't go through processing into the images/directory and everything into dist*/
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
            cwd: 'src/views/images/precompressed/',
            src: ['**/*.png'],
            // Could also match cwd line above.
            dest: 'dist/views/images/',
            ext: '.png'
          },
          {
            // Set to true to enable the following options…
            expand: true,
            // cwd is 'current working directory'
            cwd: 'src/img/',
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
            cwd: 'src/views/images/precompressed/',
            src: ['**/*.jpg'],
            // Could also match cwd.
            dest: 'dist/views/images/',
            ext: '.jpg'
          },
          {
            // Set to true to enable the following options…
            expand: true,
            // cwd is 'current working directory'
            cwd: 'src/img/',
            src: ['**/*.jpg'],
            // Could also match cwd.
            dest: 'dist/img/',
            ext: '.jpg'
          }
        ]
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
        files: {
          'dist/index.html': 'src/index.html'
        }
      }
    },

    /* Import info from package.json
    pkg: grunt.file.readJSON('package.json'),

    uglify: {
      options: {
       banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> *//*\n'
      },
      build: {
        src: 'src/<%= pkg.name %>.js',
        dest: 'build/<%= pkg.name %>.min.js'
      }
    }
    */


  });

  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-responsive-images');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-mkdir');
    // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // default tasks
  grunt.registerTask('default', ['clean', 'mkdir', 'copy:main','responsive_images', 'imagemin', 'copy:dev', 'htmlmin:dist']);


};

