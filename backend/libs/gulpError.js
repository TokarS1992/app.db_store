var wrapPipe = function(taskFn) {
    return function(done) {
        var onSuccess = function() {
            done();
        };
        var onError = function(err) {
            done(err);
        };
        var outStream = taskFn(onSuccess, onError);
        if (outStream && typeof outStream.on === 'function') {
            outStream.on('end', onSuccess);
        }
    }
}

module.exports = wrapPipe;