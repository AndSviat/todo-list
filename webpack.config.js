const devConfig = require('./config/webpack.dev');
const testConfig = require('./config/webpack.test');
const prodConfig = require('./config/webpack.prod');
const env = process.env.NODE_ENV;
console.log('env', env, process.env.NODE_ENV);

if (env === 'development') {
    module.exports = devConfig;
}

if (env === 'testing') {
    module.exports = testConfig;
}

if (env === 'production') {
    module.exports = prodConfig;
}
