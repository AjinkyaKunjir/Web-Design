class Node {
  constructor(name, childNodes) {   
    this.name = name;
    this.childNodes = childNodes;
    this.visited = false;
  }
}

// Nodes.
let A = new Node('A');
let B = new Node('B');
let C = new Node('C');
let D = new Node('D');
let E = new Node('E');
let F = new Node('F');
let G = new Node('G');
let H = new Node('H');
let I = new Node('I');
let J = new Node('J');
let K = new Node('K');
let L = new Node('L');

let allNodes = [A, B, C, D, E, F, G, H, I, J, K, L];

function resetNodes() {
  allNodes.forEach(node =>
  {
    node.visited = false;
  });
}

resetNodes();

// Graph showing the connected nodes
A.childNodes = [B, C, D];
B.childNodes = [E, F,A];
C.childNodes = [A];
D.childNodes = [A, G, H];
E.childNodes = [B, I, J];
F.childNodes = [B];
G.childNodes = [D, K, L];
H.childNodes = [D];
I.childNodes = [E];
J.childNodes = [E];
K.childNodes = [G];
L.childNodes = [G];

// Stack to maintain list of working nodes

let stack = [];

// Starting the search with 1st element i.e 'A'
stack.push(A);


let output = [];
 // Top of the stack
function DFS() {
  stackLoop: while (stack.length) {
   
    let node = stack[stack.length - 1];

    // Visit the unvisited nodes
    if (!node.visited) {
      node.visited = true;
      output.push(node);
    }

    // Retrieve the next node which we will be visiting
    for (let n of node.childNodes) {
      if (!n.visited) {
        stack.push(n);
        continue stackLoop;
      }
    }
    // Function to pop the node from the stack.
    stack.pop();
  }
}

DFS();

// DFS: [ 'A', 'B', 'E', 'I', 'J', 'F', 'C', 'D', 'G'. 'K', 'L', 'H' ]
console.log('DFS:', output.map(n => n.name));
