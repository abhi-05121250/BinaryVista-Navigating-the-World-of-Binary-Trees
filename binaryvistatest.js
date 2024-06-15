const { expect } = require('chai');
const { BinaryVista, BinaryTreeNode } = require('../code/binary_vista');  // Adjust the path accordingly

describe('BinaryVistaTest', () => {
    function insertExpected(root, value) {
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

    function getInOrderTraversal(root, result) {
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

    function getPreOrderTraversal(root, result) {
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

    function getPostOrderTraversal(root, result) {
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

    function deleteNode(root, value) {
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
            const deepestNode = getDeepestNode(root);
            const deepestNodeValue = deepestNode.data;

            root = deleteDeepest(root, deepestNode);
            nodeToDelete.data = deepestNodeValue;

            console.log("Deleted node in the expected binary tree with value", value);
        } else {
            console.log("Node with value", value, "not found for deletion in the expected binary tree.");
        }

        return root;
    }

    function getDeepestNode(root) {
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

    function deleteDeepest(root, deepestNode) {
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

    function search(root, value) {
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

    function calculateHeight(root) {
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


    it('test1', () => {
        let success = false;
        let message = '';
        const expectedInOrder = [];
        const actualInOrder = [];

        let expectedRoot = null;
        let root = null;

        try {
            // Check if the data of nodes in in-order traversal are equal
            expectedRoot = insertExpected(expectedRoot, 33);
            expectedRoot = insertExpected(expectedRoot, 44);
            expectedRoot = insertExpected(expectedRoot, 55);
            expectedRoot = insertExpected(expectedRoot, 63);
            getInOrderTraversal(expectedRoot, expectedInOrder);

            root = BinaryVista.insert(root, 33);
            root = BinaryVista.insert(root, 44);
            root = BinaryVista.insert(root, 55);
            root = BinaryVista.insert(root, 63);

            BinaryVista.inOrderTraversal(root, actualInOrder);

            if (
                expectedRoot &&
                root &&
                expectedRoot.data !== null &&
                root.data !== null &&
                expectedRoot.data === root.data &&
                expectedInOrder.toString() === actualInOrder.toString()
            ) {
                success = true;
            } else {
                success = false;
                message = 'The Insertion and InOrder traversal function Failed ';
            }
        } catch (e) {
            success = false;
            message = String(e);
        }

        if (success) {
            console.log('------------- Test Case <b>Passed</b> -------------');
            console.log('The Insertion and InOrder traversal function Passed');
        } else {
            console.log('------------- Test Case <b>Failed</b> -------------');
            console.log(message);
        }

        console.log('Your Output root of binary tree: ' + (root ? root.data : 'null'));
        console.log('Your Output in-order traversal: ' + JSON.stringify(actualInOrder));
        console.log('Expected Output root of binary tree: ' + (expectedRoot ? expectedRoot.data : 'null'));
        console.log('Expected Output in-order traversal: ' + JSON.stringify(expectedInOrder));
        console.log();
    });

    it('test2', () => {
        let success = false;
        let message = '';
        const expectedInOrder = [];
        const actualInOrder = [];

        let expectedRoot = null;
        let root = null;

        try {
            // Check if the data of nodes in in-order traversal are equal
            expectedRoot = insertExpected(expectedRoot, 33);
            expectedRoot = insertExpected(expectedRoot, 44);
            expectedRoot = insertExpected(expectedRoot, 55);
            expectedRoot = insertExpected(expectedRoot, 63);
            getPreOrderTraversal(expectedRoot, expectedInOrder);

            root = BinaryVista.insert(root, 33);
            root = BinaryVista.insert(root, 44);
            root = BinaryVista.insert(root, 55);
            root = BinaryVista.insert(root, 63);

            BinaryVista.preOrderTraversal(root, actualInOrder);

            if (
                expectedRoot &&
                root &&
                expectedRoot.data !== null &&
                root.data !== null &&
                expectedRoot.data === root.data &&
                expectedInOrder.toString() === actualInOrder.toString()
            ) {
                success = true;
            } else {
                success = false;
                message = 'The Insertion and PreOrder traversal function Failed ';
            }
        } catch (e) {
            success = false;
            message = String(e);
        }

        if (success) {
            console.log('------------- Test Case <b>Passed</b> -------------');
            console.log('The Insertion and PreOrder traversal function Passed');
        } else {
            console.log('------------- Test Case <b>Failed</b> -------------');
            console.log(message);
        }

        console.log('Your Output root of binary tree: ' + (root ? root.data : 'null'));
        console.log('Your Output pre-order traversal: ' + JSON.stringify(actualInOrder));
        console.log('Expected Output root of binary tree: ' + (expectedRoot ? expectedRoot.data : 'null'));
        console.log('Expected Output pre-order traversal: ' + JSON.stringify(expectedInOrder));
        console.log();
    });

    it('test3', () => {
        let success = false;
        let message = '';
        const expectedInOrder = [];
        const actualInOrder = [];

        let expectedRoot = null;
        let root = null;

        try {
            // Check if the data of nodes in in-order traversal are equal
            expectedRoot = insertExpected(expectedRoot, 33);
            expectedRoot = insertExpected(expectedRoot, 44);
            expectedRoot = insertExpected(expectedRoot, 55);
            expectedRoot = insertExpected(expectedRoot, 63);
            getPostOrderTraversal(expectedRoot, expectedInOrder);

            root = BinaryVista.insert(root, 33);
            root = BinaryVista.insert(root, 44);
            root = BinaryVista.insert(root, 55);
            root = BinaryVista.insert(root, 63);

            BinaryVista.postOrderTraversal(root, actualInOrder);

            if (
                expectedRoot &&
                root &&
                expectedRoot.data !== null &&
                root.data !== null &&
                expectedRoot.data === root.data &&
                expectedInOrder.toString() === actualInOrder.toString()
            ) {
                success = true;
            } else {
                success = false;
                message = 'The Insertion and PostOrder traversal function Failed ';
            }
        } catch (e) {
            success = false;
            message = String(e);
        }

        if (success) {
            console.log('------------- Test Case <b>Passed</b> -------------');
            console.log('The Insertion and PostOrder traversal function Passed');
        } else {
            console.log('------------- Test Case <b>Failed</b> -------------');
            console.log(message);
        }

        console.log('Your Output root of binary tree: ' + (root ? root.data : 'null'));
        console.log('Your Output post-order traversal: ' + JSON.stringify(actualInOrder));
        console.log('Expected Output root of binary tree: ' + (expectedRoot ? expectedRoot.data : 'null'));
        console.log('Expected Output post-order traversal: ' + JSON.stringify(expectedInOrder));
        console.log();
    });

    
    // Test Case 4
it('test4', () => {
    let success = false;
    let message = '';
    const expectedInOrder = [];
    const actualInOrder = [];

    let expectedRoot = null;
    let root = null;

    try {
        // Check if the data of nodes in in-order traversal are equal
        expectedRoot = insertExpected(expectedRoot, 33);
        expectedRoot = insertExpected(expectedRoot, 44);
        expectedRoot = insertExpected(expectedRoot, 55);
        expectedRoot = insertExpected(expectedRoot, 63);
        
        root = BinaryVista.insert(root, 33);
        root = BinaryVista.insert(root, 44);
        root = BinaryVista.insert(root, 55);
        root = BinaryVista.insert(root, 63);

        // Delete a value that does not exist in the tree
        const valueToDeleteNotExists = 88;
        expectedRoot = deleteNode(expectedRoot, valueToDeleteNotExists);
        getInOrderTraversal(expectedRoot, expectedInOrder);

        root = BinaryVista.deleteNode(root, valueToDeleteNotExists);

        BinaryVista.inOrderTraversal(root, actualInOrder);

        // Check if the deletion function behaves correctly for the value that does not exist
        if (expectedRoot === null && root === null && expectedInOrder.toString() === actualInOrder.toString()) {
            success = true;
        } else if (expectedRoot !== null && root !== null && expectedRoot.data === root.data && expectedInOrder.toString() === actualInOrder.toString()) {
            success = true;
        } else {
            success = false;
            message = 'The deletion function failed for the non-existing value.';
        }

        expectedInOrder.length = 0;
        actualInOrder.length = 0;

        const valueToDelete = 55;
        expectedRoot = deleteNode(expectedRoot, valueToDelete);
        getInOrderTraversal(expectedRoot, expectedInOrder);
       
        root = BinaryVista.deleteNode(root, valueToDelete);
        
        BinaryVista.inOrderTraversal(root, actualInOrder);

        if (expectedRoot === null && root === null && expectedInOrder.toString() === actualInOrder.toString()) {
            success = success && true;
        } else if (expectedRoot !== null && root !== null && expectedRoot.data === root.data && expectedInOrder.toString() === actualInOrder.toString()) {
            success = success && true;
        } else {
            success = false;
            message = message + 'The deletion function failed for the existing value.';
        }
    } catch (e) {
        success = false;
        message = String(e);
    }

    if (success) {
        console.log('------------- Test Case <b>Passed</b> -------------');
        console.log('The deletion function Passed for both existing and non-existing values.');
    } else {
        console.log('------------- Test Case <b>Failed</b> -------------');
        console.log(message);
    }

    console.log('Your Output root of binary tree: ' + (root ? root.data : 'null'));
    console.log('Your Output in-order traversal: ' + JSON.stringify(actualInOrder));
    console.log('Expected Output root of binary tree: ' + (expectedRoot ? expectedRoot.data : 'null'));
    console.log('Expected Output in-order traversal: ' + JSON.stringify(expectedInOrder));

    console.log();
});

// Test Case 5
it('test5', () => {
    let success = false;
    let message = '';
    const valueToSearchExists = 44;
    const valueToSearchNotExists = 88;
    let isFoundExists = false;
    let isFoundNotExists = false;
    let expectedSearchResultExists = false;
    let expectedSearchResultNotExists = false;

    let expectedRoot = null;
    let root = null;

    try {
        // Check if the data of nodes in in-order traversal are equal
        expectedRoot = insertExpected(expectedRoot, 33);
        expectedRoot = insertExpected(expectedRoot, 44);
        expectedRoot = insertExpected(expectedRoot, 55);
        expectedRoot = insertExpected(expectedRoot, 63);

        root = BinaryVista.insert(root, 33);
        root = BinaryVista.insert(root, 44);
        root = BinaryVista.insert(root, 55);
        root = BinaryVista.insert(root, 63);

        // Search for a value that exists in the tree
        expectedSearchResultExists = search(expectedRoot, valueToSearchExists);
        isFoundExists = BinaryVista.search(root, valueToSearchExists);

        // Search for a value that does not exist in the tree
        expectedSearchResultNotExists = search(expectedRoot, valueToSearchNotExists);
        isFoundNotExists = BinaryVista.search(root, valueToSearchNotExists);

        // Check if the search function behaves correctly for the value that exists
        if (isFoundExists === expectedSearchResultExists) {
            success = true;
        } else {
            success = false;
            message = message + 'The search function failed for the existing value.';
        }

        // Check if the search function behaves correctly for the value that does not exist
        if (!isFoundNotExists && !expectedSearchResultNotExists) {
            success = success && true;
        } else {
            success = false;
            message = message + ' The search function failed for the non-existing value.';
        }
    } catch (e) {
        success = false;
        message = message + String(e);
    }

    if (success) {
        console.log('------------- Test Case <b>Passed</b> -------------');
        console.log('The search function Passed for both existing and non-existing values.');
    } else {
        console.log('------------- Test Case <b>Failed</b> -------------');
        console.log(message);
    }

    console.log('Your Output root of binary tree: ' + (root ? root.data : 'null'));
    console.log('Your tree contains Value ' + valueToSearchExists + ': ' + isFoundExists);
    console.log('Your tree contains Value ' + valueToSearchNotExists + ': ' + isFoundNotExists);
    console.log('Expected Output root of binary tree: ' + (expectedRoot ? expectedRoot.data : 'null'));
    console.log('Expected tree contains Value ' + valueToSearchExists + ': ' + expectedSearchResultExists);
    console.log('Expected tree contains Value ' + valueToSearchNotExists + ': ' + expectedSearchResultNotExists);

    console.log();
});

// Test Case 6
it('test6', () => {
    let success = false;
    let message = '';
    let actualHeight = 0;
    let expectedHeight = 0;

    let expectedRoot = null;
    let root = null;

    try {
        // Check if the data of nodes in in-order traversal are equal
        expectedRoot = insertExpected(expectedRoot, 33);
        expectedRoot = insertExpected(expectedRoot, 44);
        expectedRoot = insertExpected(expectedRoot, 55);
        expectedRoot = insertExpected(expectedRoot, 63);
        
        root = BinaryVista.insert(root, 33);
        root = BinaryVista.insert(root, 44);
        root = BinaryVista.insert(root, 55);
        root = BinaryVista.insert(root, 63);
        
        expectedHeight = calculateHeight(expectedRoot);
        actualHeight = BinaryVista.calculateHeight(root);

        if (actualHeight === expectedHeight) {
            success = true;
        } else {
            success = false;
            message = message + 'The calculating height function failed.';
        }
    } catch (e) {
        success = false;
        message = message + String(e);
    }

    if (success) {
        console.log('------------- Test Case <b>Passed</b> -------------');
        console.log('The calculating height function Passed.');
    } else {
        console.log('------------- Test Case <b>Failed</b> -------------');
        console.log(message);
    }

    console.log('Your Output root of binary tree: ' + (root ? root.data : 'null'));
    console.log('Your Output Height of the Binary Tree: '  + actualHeight);
    console.log('Expected Output root of binary tree: ' + (expectedRoot ? expectedRoot.data : 'null'));
    console.log('Expected Output Height of the Binary Tree: '  + expectedHeight);

    console.log();
});

    // Add other test cases as needed
});
