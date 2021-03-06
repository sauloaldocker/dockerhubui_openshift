var path                  = require( 'path'            );

var IP                    = process.env.IP              || process.env.OPENSHIFT_NODEJS_IP   || "0.0.0.0";
var PORT                  = process.env.PORT            || process.env.OPENSHIFT_NODEJS_PORT || 8080;
var DATA_DIR              = process.env.DATA_DIR        || process.env.OPENSHIFT_DATA_DIR    || __dirname;
var APP_TITLE             = process.env.APP_TITLE       || 'Biodocker DockerHub Dashboard';
var DOCKERHUB_URL         = process.env.DOCKERHUB_URL   || 'https://hub.docker.com/';
var GIT_URL               = process.env.GIT_URL         || 'https://github.com/';
var REQUESTED_REPOS       = process.env.REQUESTED_REPOS || "biodckr,biodckrdev";
var ALLOWED_REPOS         = process.env.ALLOWED_REPOS   || "biodckr,biodckrdev,sauloal";
var FORBIDDEN_REPOS       = process.env.FORBIDDEN_REPOS || "";
var DEBUG                 = process.env.DEBUG           || false;
//var DEBUG                 = process.env.DEBUG         || true;


function init(app) {
    app.conf                  = {};
    app.conf.PORT             = PORT;
    app.conf.IP               = IP;
    app.conf.DOCKERHUB_URL    = DOCKERHUB_URL;
    app.conf.APP_TITLE        = APP_TITLE;
    app.conf.GIT_URL          = GIT_URL;
    app.conf.DEBUG            = DEBUG;
    app.conf.REQUESTED_REPOS  = REQUESTED_REPOS;
    app.conf.ALLOWED_REPOS    = ALLOWED_REPOS;
    app.conf.FORBIDDEN_REPOS  = FORBIDDEN_REPOS;
    app.conf.HAS_FILTER       = ( ALLOWED_REPOS.length > 0 || FORBIDDEN_REPOS.length > 0 );
    app.conf.DATA_DIR         = DATA_DIR;
    app.conf.APPLICATION_ROOT = __dirname;
    app.conf.swig             = {
        template_folder: path.join( app.conf.APPLICATION_ROOT, 'templates' ),
        view_cache     : true,
        cache          : "memory" // false
    };
    app.conf.session_counter  = {
        default       : {
            dir           : path.join( app.conf.DATA_DIR, 'sessions' ),
            ttl           : false, 
            loggin        : false,
        },
        secret        : 'ILuvCookies',
        session_name  : 'status-biodocker.rhcloud.com',
        trust_proxy   : 1
    };
    app.conf.cache            = {
        dir   : path.join( app.conf.DATA_DIR, 'storage' ),
        ttl   : 24 * 60 * 60 * 1000, // 1 day 
        loggin: true
    };
}

module.exports = init;
