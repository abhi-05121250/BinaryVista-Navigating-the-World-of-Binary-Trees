const readline = require('readline');
class BinaryTreeNode {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class BinaryVista {
    constructor() {
        this.scanner = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }

    async prompt(question) {
        return new Promise((resolve) => {
            this.scanner.question(question, (answer) => {
                resolve(answer);
            });
        });
    }

    static insert(root, value) {
        if (root === null) {
            return new BinaryTreeNode(value);
        }
    
        const queue = [root];
    
        while (queue.length > 0) {
            const current = queue.shift();
    
            if (current.left === null) {
                current.left = new BinaryTreeNode(value);
                break;
            } else {
                queue.push(current.left);
            }
    
            if (current.right === null) {
                current.right = new BinaryTreeNode(value);
                break;
            } else {
                queue.push(current.right);
            }
        }
    
        return root;
    }
    
   static inOrderTraversal(root, result) {
    if (root === null) {
        return;
    }

    const stack = [];
    let current = root;

    while (current !== null || stack.length > 0) {
        while (current !== null) {
            stack.push(current);
            current = current.left;
        }

        current = stack.pop();
        result.push(current.data);

        current = current.right;
    }
    }

    static preOrderTraversal(root, result) {
        if (root === null) {
            return;
        }

        const stack = [root];

        while (stack.length > 0) {
            const current = stack.pop();
            result.push(current.data);

            if (current.right !== null) {
                stack.push(current.right);
            }

            if (current.left !== null) {
                stack.push(current.left);
            }
        }
    }

    static postOrderTraversal(root, result) {
        if (root === null) {
            return;
        }

        const stack = [root];
        const resultStack = [];

        while (stack.length > 0) {
            const current = stack.pop();
            resultStack.push(current.data);

            if (current.left !== null) {
                stack.push(current.left);
            }

            if (current.right !== null) {
                stack.push(current.right);
            }
        }

        while (resultStack.length > 0) {
            result.push(resultStack.pop());
        }
    }

    static deleteNode(root, value) {
        if (root === null) {
            return null;
        }

        const queue = [];
        queue.push(root);

        let nodeToDelete = null;

        while (queue.length > 0) {
            const current = queue.shift();

            if (current.data === value) {
                nodeToDelete = current;
                break;
            }

            if (current.left !== null) {
                queue.push(current.left);
            }

            if (current.right !== null) {
                queue.push(current.right);
            }
        }

        if (nodeToDelete !== null) {
            const deepestNode = BinaryVista.getDeepestNode(root);
            const deepestNodeValue = deepestNode.data;

            root = BinaryVista.deleteDeepest(root, deepestNode);
            nodeToDelete.data = deepestNodeValue;

            console.log("Deleted node in the your binary tree with value", value);
        } else {
            console.log("Node with value", value, "not found for deletion in the your binary tree.");
        }

        return root;
    }

    static getDeepestNode(root) {
        let result = null;
        const queue = [];
        queue.push(root);

        while (queue.length > 0) {
            result = queue.shift();

            if (result.left !== null) {
                queue.push(result.left);
            }

            if (result.right !== null) {
                queue.push(result.right);
            }
        }

        return result;
    }

    static deleteDeepest(root, deepestNode) {
        const queue = [];
        queue.push(root);

        while (queue.length > 0) {
            const current = queue.shift();

            if (current.right !== null) {
                if (current.right === deepestNode) {
                    current.right = null;
                    return root;
                } else {
                    queue.push(current.right);
                }
            }

            if (current.left !== null) {
                if (current.left === deepestNode) {
                    current.left = null;
                    return root;
                } else {
                    queue.push(current.left);
                }
            }
        }

        return root;
    }

    static search(root, value) {
        if (root === null) {
            return false;
        }

        const queue = [];
        queue.push(root);

        while (queue.length > 0) {
            const current = queue.shift();

            if (current.data === value) {
                return true;
            }

            if (current.left !== null) {
                queue.push(current.left);
            }

            if (current.right !== null) {
                queue.push(current.right);
            }
        }

        return false;
    }

    static calculateHeight(root) {
        if (root === null) {
            return 0;
        }

        const queue = [];
        queue.push(root);
        let height = 0;

        while (queue.length > 0) {
            const levelSize = queue.length;

            for (let i = 0; i < levelSize; i++) {
                const current = queue.shift();

                if (current.left !== null) {
                    queue.push(current.left);
                }

                if (current.right !== null) {
                    queue.push(current.right);
                }
            }

            height += 1;
        }

        return height;
    }

    async main() {
        console.log("Binary Tree Project");
        const rootValue = await this.prompt("Enter the root value: ");
        const root = new BinaryTreeNode(parseInt(rootValue));

        // Example: Insertion
        for (let i = 0; i < 3; i++) {
            const insertNode = await this.prompt("Enter a node data to insert in Binary Tree: ");
            BinaryVista.insert(root, parseInt(insertNode));
        }

        // Example: Traversal
        // InOrder
        const actualInOrder = [];
        console.log("Binary Tree InOrder Traversal after Insertion:");
        BinaryVista.inOrderTraversal(root, actualInOrder);
        console.log(actualInOrder);
        console.log("\n");

        // Example: Iterative Pre-order Traversal
        const actualPreOrder = [];
        console.log("Iterative Pre-order Traversal of the Binary Tree:");
        BinaryVista.preOrderTraversal(root, actualPreOrder);
        console.log(actualPreOrder);
        console.log("\n");

        // Example: Iterative Post-order Traversal
        const actualPostOrder = [];
        console.log("Iterative Post-order Traversal of the Binary Tree:");
        BinaryVista.postOrderTraversal(root, actualPostOrder);
        console.log(actualPostOrder);
        console.log("\n");

        // Example: Deletion
        actualInOrder.length = 0;
        await BinaryVista.deleteNode(root, 33);
        console.log("Binary Tree InOrder Traversal after Deletion:");
        BinaryVista.inOrderTraversal(root, actualInOrder);
        console.log(actualInOrder);
        console.log("\n");

        // Example: Searching
        const isFound = BinaryVista.search(root, 42);
        console.log("Value 42 is present in the Binary Tree:", isFound);
        console.log("\n");

        // Example: Calculating Binary Tree Height
        const height = BinaryVista.calculateHeight(root);
        console.log("Height of the Binary Tree:", height);
    }
}

if (require.main === module) {
    const binaryVista = new BinaryVista();
    binaryVista.main().then(() => {
        binaryVista.scanner.close();
    });
}

module.exports = { BinaryVista, BinaryTreeNode };