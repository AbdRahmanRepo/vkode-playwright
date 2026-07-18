import { test, expect } from '@playwright/test';

// test.describe.configure({
//     mode: 'parallel'
// })

test.describe('Group1', async () => {

    test('Test1', async () => { // execution triple - 30s default waiting for timeout
        // test.slow();
        console.log(" this is Test1 ......")
    });

    test('Test2', async () => { // same as skip
        console.log(" this is Test2 ......")
        //
    });

    test('Test3', async () => {
        console.log(" this is Test3 ......")
    });

    test('Test4', async () => {
        console.log(" this is Test4 ......")
    });

    test('Test5', async () => {
        console.log(" this is Test5 ......")
    });
})