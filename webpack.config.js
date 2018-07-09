/**
 * Created by jitendra on 27/11/17.
 */

var path = require('path');
//bundle directory
var DIST_DIR = path.resolve(__dirname, "dist");
//app directory
var SRC_DIR = path.resolve(__dirname, "src");

var config = {
    entry: SRC_DIR + '/app/index.js',
    output: {
        path: DIST_DIR + '/app/',
        filename: "bundle.js",
        publicPath: "/app/"
    },
    module: {
        loaders: [
            {
                test: /\.js?/, //applying filter to scan .js files only
                include: SRC_DIR,
                loader: "babel-loader", //loading babel to converting ES6 to ES5
                query: {
                    presets: ["react", "es2015", "stage-2"]
                }
            }
        ]
    }
};
//exporting configuration across application
module.exports = config;