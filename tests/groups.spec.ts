import { test, expect, Page } from '@playwright/test';



test.describe('Group1', async () => {
    test('test1', async ({ page }) => {
        console.log(" this is Test1 ......")
    });

    test('test2', async ({ page }) => {
        console.log(" this is Test2 ......")
    });

})



test.describe('Group2', async () => {
    test('test3', async ({ page }) => {
        console.log(" this is Test3 ......")
    });


    test('test4', async ({ page }) => {
        console.log(" this is Test4 ......")
    });



})
