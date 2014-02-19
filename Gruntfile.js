'use strict';

module.exports = function(grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Project configuration
  grunt.initConfig({

    watch: {
      js: {
        files: ['app/assets/js/{,*/}*.js'],
        tasks: ['jshint'],
        options: {
          livereload: true
        }
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      sass: {
        files: ['app/assets/css/{,*/}*.scss'],
        tasks: ['sass', 'autoprefixer']
      },
      livereload: {
        options: {
          livereload: 35729
        },
        files: [
          'app/{,*/}*.html',
          '.tmp/assets/css/{,*/}*.css',
        ]
      }
    },

    connect: {
      options: {
        port: 9000,
        livereload: 35729,
        hostname: '0.0.0.0'
      },
      livereload: {
        options: {
          open: true,
          base: ['.tmp', 'app']
        }
      },
      dist: {
        options: {
          open: true,
          base: 'dist',
          livereload: false
        }
      }
    },

    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: ['app/assets/js/{,*/}*.js']
    },

    clean: {
      dist: {
        files: [{
          dot: true,
          src: ['.tmp', 'dist/*']
        }]
      },
      server: '.tmp'
    },

    useminPrepare: {
      options: {
        dest: 'dist'
      },
      html: 'app/index.html'
    },

    sass: {
      dist: {
        options: {
          outputStyle: 'expanded'
        },
        files: {
          '.tmp/assets/css/main.css': 'app/assets/css/main.scss'
        }
      }
    },

    autoprefixer: {
      options: {
        browsers: ['last 1 version']
      },
      dist: {
        src: '.tmp/assets/css/main.css',
        dest: '<%= autoprefixer.dist.src %>'
      }
    },

    cssmin: {
      dist: {
        src: '<%= autoprefixer.dist.dest %>',
        dest: 'dist/assets/css/main.css'
      }
    },

    copy: {
      bower: {
        expand: true,
        dot: true,
        cwd: 'app/bower_components',
        src: '**/*',
        dest: '.tmp/bower_components'
      },
      dist: {
        expand: true,
        dot: true,
        cwd: 'app',
        dest: 'dist',
        src: [
          '{,*/}*.html'
        ]
      }
    },

    rev: {
      dist: {
        files: {
          src: [
            'dist/assets/js/{,*/}*.js',
            'dist/assets/css/{,*/}*.css'
          ]
        }
      }
    },

    usemin: {
      options: {
        assetsDirs: ['dist']
      },
      html: ['dist/{,*/}*.html'],
      css: ['dist/assets/css/{,*/}*.css']
    }
  });

  // These plugins provide necessary tasks
  require('load-grunt-tasks')(grunt);

  grunt.registerTask('serve', function (target) {
    if (target === 'dist')
      return grunt.task.run(['build', 'connect:dist:keepalive']);

    grunt.task.run([
      'clean:server',
      'sass',
      'autoprefixer',
      'connect:livereload',
      'watch'
    ]);
  });

  // Default task(s)
  grunt.registerTask('default', [
    'jshint',
    'clean:dist',
    'copy:bower',
    'useminPrepare',
    'sass',
    'autoprefixer',
    'concat',
    'cssmin',
    'uglify',
    'copy:dist',
    'rev',
    'usemin'
  ]);

};