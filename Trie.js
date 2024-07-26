class TrieNode {
  constructor() {
    this.childNode = Array(128).fill(null); // 128 ASCII characters
    this.wordEnd = false;
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(key) {
    let currentNode = this.root;
    for (let i = 0; i < key.length; i++) {
      const charCode = key.charCodeAt(i);
      if (currentNode.childNode[charCode] === null) {
        currentNode.childNode[charCode] = new TrieNode();
      }
      currentNode = currentNode.childNode[charCode];
    }
    currentNode.wordEnd = true;
  }

  search(key) {
    let currentNode = this.root;
    for (let i = 0; i < key.length; i++) {
      const charCode = key.charCodeAt(i);
      if (currentNode.childNode[charCode] === null) {
        return false;
      }
      currentNode = currentNode.childNode[charCode];
    }
    return true;
  }

  autocomplete(prefix) {
    let currentNode = this.root;
    for (let i = 0; i < prefix.length; i++) {
      const charCode = prefix.charCodeAt(i);
      if (currentNode.childNode[charCode] === null) {
        return [];
      }
      currentNode = currentNode.childNode[charCode];
    }

    const matches = [];
    this._collectMatches(currentNode, prefix, matches);
    return matches;
  }

  _collectMatches(node, prefix, matches) {
    if (node.wordEnd) {
      matches.push(prefix);
    }

    for (let i = 0; i < node.childNode.length; i++) {
      if (node.childNode[i] !== null) {
        const nextPrefix = prefix + String.fromCharCode(i);
        this._collectMatches(node.childNode[i], nextPrefix, matches);
      }
    }
  }

  delete(key) {
    this._delete(this.root, key, 0);
  }
  _delete(node, key, index) {
    if (index === key.length) {
      if (node.wordEnd) {
        node.wordEnd = false;
        return false;
      }
      return false;
    }

    const charCode = key.charCodeAt(index);
    const shouldDeleteChildNode = this._delete(
      node.childNode[charCode],
      key,
      index + 1
    );

    if (shouldDeleteChildNode) {
      node.childNode[charCode] = null;
      return (
        // these ie convert a object to an array then check every child is null or not
        Object.values(node.childNode).every((child) => child === null) &&
        !node.wordEnd
      );
    }

    return false;
  }
}

const trie = new Trie();
