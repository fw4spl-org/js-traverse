module.exports = Hash;
var Traverse = require('traverse');

function Hash (hash, extra) {
    var self = {
        map : function (f) {
            var acc = { __proto__ : hash.__proto__ };
            Object.keys(hash).forEach(function (key) {
                acc[key] = f.call(hash, hash[key], key);
            });
            return Hash(acc);
        },
        forEach : function (f) {
            Object.keys(hash).forEach(function (key) {
                f.call(hash, hash[key], key);
            });
            return self;
        },
        filter : function (f) {
            var acc = { __proto__ : hash.__proto__ };
            Object.keys(hash).forEach(function (key) {
                if (f.call(hash, hash[key], key)) {
                    acc[key] = hash[key];
                }
            });
            return Hash(acc);
        },
        reduce : function (f, acc) {
            var keys = Object.keys(hash);
            if (acc === undefined) acc = keys.shift();
            keys.forEach(function (key) {
                acc = f.call(hash, acc, hash[key], key);
            });
            return acc;
        },
        update : function (h) {
            Object.keys(h).forEach(function (key) {
                hash[key] = h[key];
            });
            return self;
        },
        merge : function (h) {
            var acc = {};
            Object.keys(hash).forEach(function (key) {
                acc[key] = hash[key];
            });
            Object.keys(h).forEach(function (key) {
                acc[key] = h[key];
            });
            hash = acc;
            return self;
        },
        tap : function (f) { f.call(self, hash) },
        end : hash,
        items : hash
    };
    
    Object.defineProperty(self, 'keys', { get : function () {
        return Object.keys(hash);
    } });
    
    Object.defineProperty(self, 'values', { get : function () {
        return Object.keys(hash)
            .map(function (key) { return hash[key] })
    } });
    
    Object.defineProperty(self, 'clone', { get : function () {
        return Hash(Hash.clone(hash));
    } });
    
    Object.defineProperty(self, 'copy', { get : function () {
        return Hash(Hash.copy(hash));
    } });
    
    Object.defineProperty(self, 'length', { get : function () {
        return Object.keys(hash).length;
    } });
    
    return self;
};

// deep copy
Hash.clone = function (ref) {
    return Traverse.clone(ref);
};

// shallow copy
Hash.copy = function (ref) {
    var hash = { __proto__ : ref.__proto__ };
    Object.keys(ref).forEach(function (key) {
        hash[key] = ref[key];
    });
    return hash;
};

Hash.map = function (ref, f) {
    return Hash(ref).map(f).items;
};

Hash.filter = function (ref, f) {
    return Hash(ref).filter(f).items;
};

Hash.reduce = function (ref, f, acc) {
    return Hash(ref).reduce(f, acc);
};

Hash.concat = function (xs) {
    var hash = Hash({});
    xs.forEach(function (x) { hash.update(x) });
    return hash;
};
