module.exports = function foo(grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        watch: {
            scripts: {
                files: ["**/scripts/*.js", "**/scripts/**/*.js", "!node_modules/**/*.js"],
                tasks: ["eslint", "browserify", "notify_hooks"],
                options: {
                    spawn: false,
                },
            },
        },
        browserify: {
            dist: {
                files: {
                    "build/bundle.js": ["scripts/main.js"],
                },
            },
            options: {
                browserifyOptions: {
                    debug: true,
                },
            },
        },
        eslint: {
            src: [
                "**/scripts/*.js",
                "**/scripts/**/*.js",
                "!node_modules/**/*.js",
            ],
        },
        notify_hooks: {
            options: {
                enabled: true,
                max_jshint_notifications: 5, // maximum number of notifications from jshint output 
                title: "Project Name", // defaults to the name in package.json, or will use project directory's name 
                success: false, // whether successful grunt executions should be notified automatically 
                duration: 3 // the duration of notification in seconds, for `notify-send only 
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("gruntify-eslint");
    grunt.loadNpmTasks("grunt-browserify");
    grunt.loadNpmTasks("grunt-notify");

    // Default task(s).
    grunt.registerTask("default", ["eslint", "browserify", "watch", "notify_hooks"]);
};
