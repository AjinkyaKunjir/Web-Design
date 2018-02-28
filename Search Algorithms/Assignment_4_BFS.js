class Node {
 constructor(name, childNodes) {
   this.name = name;
   this.childNodes = childNodes;
   this.visited = false;
 }
}

// Initializing the nodes
let A = new Node('A');
let B = new Node('B');
let C = new Node('C');
let D = new Node('D');
let E = new Node('E');
let F = new Node('F');
let G = new Node('G');
let H = new Node('H');
let S = new Node('S');

let allNodes = [S, A, B, C, D, E, F, G, H];

// Function to reset the nodes
function resetNodes() {
 allNodes.forEach(node => {
   node.visited = false;
 });
}

resetNodes();

// Graph on which Breadth First Search will be implemented.
S.childNodes = [A, C, G]
A.childNodes = [B, S];
B.childNodes = [A];
C.childNodes = [D, E, F, S];
D.childNodes = [C];
E.childNodes = [C, H];
F.childNodes = [C, G];
G.childNodes = [F, H, S];
H.childNodes = [G, E];


// An array where the output of Breadth First Search will be stored
output = [];

// An array to maintain a queue of working nodes.
let queue = [];

// Enqueue the start node, A.
queue.unshift(S);

// Breadth First Search function
function BFS() {
 queueLoop: while (queue.length) {
   // Get the next node in the queue
   let node = queue.pop();

   // Visit the node if it's not visited yet
   if (!node.visited) {
     node.visited = true;
     output.push(node);
   }

   // Visit all direct child nodes and put them in queue
   for (let n of node.childNodes) {
     if (!n.visited) {
       n.visited = true;
       output.push(n);
       queue.unshift(n);
     }
   }
   // Loop repeats and goes to the next node
 }
}

BFS();

// BFS: [ 'S', 'A', 'C', 'G', 'B', 'D', 'E', 'F', 'H' ]
console.log('BFS:', output.map(n => n.name));