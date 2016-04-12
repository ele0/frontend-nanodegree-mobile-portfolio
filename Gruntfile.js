module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    responsive_images: {
      dev: {
        options: {
          engine: 'im',
          sizes: [{
            width: 1200,
            quality: 70
          },
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
          }]
        },

        /*
        You don't need to change this part if you don't change
        the directory structure.
        */
        files: [{
          expand: true,
          src: ['*.{gif,jpg,png}'],
          cwd: 'views/img_src/',
          dest: 'views/images/'
        }]
      }
    },

    /* Clear out the images directory if it exists */
    clean: {
      dev: {
        src: ['views/images'],
      },
    },

    /* Generate the images directory if it is missing */
    mkdir: {
      dev: {
        options: {
          create: ['views/images']
        },
      },
    },

    /* Copy the "fixed" images that don't go through processing into the images/directory */
    copy: {
      dev: {
        files: [{
          expand: true,
          src: 'views/img_src/fixed/*.{gif,jpg,png,svg}',
          dest: 'views/images/',
          flatten: true,
        }]
      },
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

  grunt.loadNpmTasks('grunt-responsive-images');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-mkdir');
    // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // default tasks
  grunt.registerTask('default', ['clean', 'mkdir', 'copy', 'responsive_images']);


};

