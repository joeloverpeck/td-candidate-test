/*jshint node: true, browser: false */
module.exports = function (grunt) {

	'use strict';

	// Load all installed Grunt plugins using matchdep
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	// Configuration options
	var options = {
		port: grunt.option('port') || 4000,
		ignorePatterns: ['!node_modules/**/*', '!dist/**/*', '!src/libraries/**/*']
	};

	// Configuration
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		options: options,
		connect: {
			server: {
				options: {
					port: options.port,
					livereload: true
				}
			}
		},
		open: {
			src: { path: 'http://localhost:' + options.port + '/src' },
			dist: { path: 'http://localhost:' + options.port + '/dist' }
		},
		jshint: {
			options: {
				jshintrc: true
			},
			all: {
				src: ['**/*.js'].concat(options.ignorePatterns)
			}
		},
		jscs: {
			src: ['**/*.js'].concat(options.ignorePatterns),
			options: {
				config: '.jscsrc'
			}
		},
		jsonlint: {
			all: {
				src: ['**/*.json', '.jscsrc', '.jshintrc', '.bowerrc'].concat(options.ignorePatterns)
			}
		},
		lintspaces: {
			all: {
				src: ['**/*.{less,html,js}'].concat(options.ignorePatterns),
				options: {
					newline: true,
					trailingspaces: true,
					indentation: 'tabs',
					ignores: ['js-comments']
				}
			}
		},
		autoprefixer: {
			options: {
				browsers: ['last 2 versions', 'ie 9']
			},
			single_file: {
			      src: 'src/.tmp/all.css',
				  dest: 'src/.tmp/prefixed.css'
			},
		},
		watch: {
			less: {
				files: ['src/**/*.less'].concat(options.ignorePatterns),
				tasks: ['less', 'autoprefixer'],
				options: {
					livereload: true
				}
			},
			css: {
				files: '.tmp/all.css',
				tasks: [],
				options: {
					livereload: true
				}
			},
			html: {
				files: 'src/index.html',
				tasks: [],
				options: {
					livereload: true
				}
			}
		},
		less: {
			options: {
				paths: ['src']
			},
			all: {
				files: {
					'src/.tmp/all.css': 'src/styles.less'
				}
			}
		},
		clean: {
			dist: 'dist/**',
			tmp: 'tmp/**'
		},
		copy: {
			index: {
				expand: true,
				cwd: 'src',
				src: 'index.html',
				dest: 'dist'
			},
			images: {
				expand: true,
				cwd: 'src/images',
				src: '**/**',
				dest: 'dist/images'
			},
			libraries: {
				expand: true,
				cwd: 'src/libraries',
				src: '**/**',
				dest: 'dist/libraries'
			}
		},
		uglify: {
			options: {
				mangle: false,
				banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
					'<%= grunt.template.today("yyyy-mm-dd") %>\n' +
					'* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>; */\n',
				sourceMap: false,
				sourceMapIncludeSources: true,
				sourceMapIn: function (dest) {
					return dest.replace('.js', '.js.map');
				}
			}
		},
		useminPrepare: {
			html: 'src/index.html'
		},
		usemin: {
			html: 'dist/index.html'
		},
		concat: {
			options: {
				sourceMap: false
			}
		},
		cssmin: {
			options: {
				ext: '.min.css'
			}
		}
	});


	/**
	 * Tasks
	 */

	// General
	grunt.registerTask('default', ['serve']);
	grunt.registerTask('serve', ['less', 'autoprefixer', 'connect', 'open:src', 'watch']);
	grunt.registerTask('compile', ['clean:dist', 'copy', 'useminPrepare', 'less', 'autoprefixer', 'concat', 'cssmin', 'uglify', 'usemin']);
	grunt.registerTask('build', ['test', 'compile']);

	// Testing
	grunt.registerTask('lint', ['jshint:all', 'jscs', 'lintspaces', 'jsonlint:all']);
	grunt.registerTask('test', ['lint', 'less']);

};
