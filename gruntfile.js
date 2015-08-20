module.exports = function(grunt) {
	require('load-grunt-tasks')(grunt);

	grunt.initConfig({
		fave_algo: 'sand',
		pkg: grunt.file.readJSON('package.json'),
		jshint: {
			options : {
				jshintrc : '.jshintrc'
			},
			all: [ 'src/memstore.js' ]
		},
		uglify: {
			options:{
				banner : '/*! [<%= pkg.name %> <%= pkg.version %>](<%= pkg.homepage %>) <%= pkg.copyright %> <%= pkg.license %> */',
				mangle: {
					except: ['MemoryStorage', 'u','m','d']
				},
				sourceMap: true
			},
			admin: {
				files: {
					'dist/memstore.min.js': [ 'src/memstore.js']
				}
			}
		},
		jsdoc : {
			dist : {
				src: ['src/*.js', 'test/*.js'],
				options: {
					destination: 'doc',
					template : "node_modules/grunt-jsdoc/node_modules/ink-docstrap/template",
					configure: "node_modules/grunt-jsdoc/node_modules/ink-docstrap/template/jsdoc.conf.json"
				}
			}
		},
	});
	
	grunt.registerTask('default', [
		'jshint', 
		'uglify', 
		'jsdoc', 
	]);
}
