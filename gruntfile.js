module.exports = function(grunt) {
	require('load-grunt-tasks')(grunt);

	var pkg = grunt.file.readJSON('package.json');
	grunt.initConfig({
		pkg: pkg,
		umd: {
			all: {
				options: {
					src: '<%= pkg.src %>',
					dest: '<%= pkg.dist.umd %>',
					template: 'umd-lite.hbs',
					objectToExport: '<%= pkg.exports[0] %>',
					amdModuleId: '<%= pkg.name %>'
				}
			}
		},
		uglify: {
			options:{
				banner : '/*! <%= pkg.name %> <%= pkg.version %> <%= pkg.copyright %> License: <%= pkg.license %> */',
				mangle: {
					except: pkg.exports.concat(['u','m','d'])
				},
				sourceMap: true
			},
			admin: {
				files: {
					'<%= pkg.dist.min %>': ['<%= pkg.dist.umd %>']
				}
			}
		},
	});

	grunt.registerTask('default', [
		'umd',
		'uglify',
	]);
}
