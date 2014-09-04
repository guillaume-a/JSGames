Math.setSeed = function (seed) {
    if (seed === parseInt(seed)) {
        Math.seed = seed;
    } else {
        Math.seed = Math.round(Math.random() * 64000);
    }

    return Math.seed;
};

Math.srandomRange = function(min, max) {
    max = max || 1;
    min = min || 0;

    Math.seed = (Math.seed * 9301 + 49297) % 233280;
    var rnd = Math.seed / 233280;

    return min + rnd * (max - min);
};

Math.srandomIntRange = function(min, max) {
    return Math.floor(Math.srandomRange(min, max));
};

Math.randomRange = function(min, max) {
    return Math.random() * (max - min) + min;
};

Math.randomIntRange = function(min, max) {
    return Math.floor(Math.randomRange(min, max));
};

Math.setSeed();