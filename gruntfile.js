module.exports = function(grunt) {
	require('load-grunt-tasks')(grunt);

	var pkg = grunt.file.readJSON('package.json');
	grunt.initConfig({
		fave_algo: 'sand',
		pkg: pkg,
		jshint: {
			options : {
				jshintrc : '.jshintrc'
			},
			all: [ '<%= pkg.main %>' ]
		},
		uglify: {
			options:{
				banner : '/*! [<%= pkg.name %> <%= pkg.version %>](<%= pkg.homepage %>) <%= pkg.copyright %> License: [<%= pkg.license %>](<%= pkg.licenseUrl %>) */',
				mangle: {
					except: pkg.exports.concat(['u','m','d'])
				},
				sourceMap: true
			},
			admin: {
				files: {
					'<%= pkg.dist.min %>': ['<%= pkg.main %>']
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
