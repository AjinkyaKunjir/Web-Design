function lru(limit) {
    this.size = 0;
    (typeof limit == "number") ? this.limit = limit : this.limit = 5;
    this.map = {};
    this.head = null;
    this.tail = null;
}

lru.prototype.lrunode = function(key, value) {
    if (typeof key != "undefined" && key !== null) {
        this.key = key;
    }
    if (typeof value != "undefined" && value !== null) {
        this.value = value;
    }
    this.prev = null;
    this.next = null;
}

lru.prototype.setHead = function(node) {
    node.next = this.head;
    node.prev = null;
    if (this.head !== null) {
        this.head.prev = node;
    }
    this.head = node;
    if (this.tail === null) {
        this.tail = node;
    }
    this.size++;
    this.map[node.key] = node;
}

/* Change or add a new value in the cache
 * We overwrite the entry if it already exists
 */
lru.prototype.set = function(key, value) {
    var node = new lru.prototype.lrunode(key, value);
    if (this.map[key]) {
        this.map[key].value = node.value;
        this.remove(node.key);
    } else {
        if (this.size >= this.limit) {
            delete this.map[this.tail.key];
            this.size--;
            this.tail = this.tail.prev;
            this.tail.next = null;
        }
    }
    this.setHead(node);
};

/* Retrieve a single entry from the cache */
lru.prototype.get = function(key) {
    if (this.map[key]) {
        var value = this.map[key].value;
        var node = new lru.prototype.lrunode(key, value);
        this.remove(key);
        this.setHead(node);
        return value;
    } else {
        console.log("Key " + key + " does not exist in the cache.")
    }
};

/* Remove a single entry from the cache */
lru.prototype.remove = function(key) {
    var node = this.map[key];
    if (node.prev !== null) {
        node.prev.next = node.next;
    } else {
        this.head = node.next;
    }
    if (node.next !== null) {
        node.next.prev = node.prev;
    } else {
        this.tail = node.prev;
    }
    delete this.map[key];
    this.size--;
};

/* Resets the entire cache - Argument limit is optional to be reset */
lru.prototype.removeAll = function(limit) {
    this.size = 0;
    this.map = {};
    this.head = null;
    this.tail = null;
    if (typeof limit == "number") {
        this.limit = limit;
    }
};


/* Returns a String representation of the cache */
lru.prototype.toString = function() {
    var s = '';
    var node = this.head;
    while (node) {
        s += String(node.key)+':'+node.value;
        node = node.next;
        if (node) {
            s += '\n';
        }
    }
    return s;
}

//testing the implementation
var c = new lru(3);
c.set(1,"first");
c.set(2,"second");
c.set(3,"third");
c.set(4,"fourth");
c.set(1,"first");
c.set(2,"second");
c.get(1);
//c.remove(1);

// Output
//1:first
//2:second
//4:fourth

console.log(c.toString());