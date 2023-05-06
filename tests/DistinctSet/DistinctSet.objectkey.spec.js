"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DistinctSet_1 = require("@/DistinctSet");
function createTestDistinctObjectSet() {
    const testSet = new DistinctSet_1.DistinctSet((num) => num.index);
    testSet.add({ index: 1, data: "hello" });
    testSet.add({ index: 2, data: "world" });
    testSet.add({ index: 3, data: "local" });
    testSet.add({ index: 3, data: "host" });
    return testSet;
}
describe("DistinctSet<primary key>test", () => {
    describe("DistinctSet<object> test", () => {
        it("TEST size/length", () => {
            const testSet = createTestDistinctObjectSet();
            expect(testSet.size).toBe(3);
        });
        it("TEST has", () => {
            const testSet = createTestDistinctObjectSet();
            expect(testSet.has(1)).toBeTruthy();
            expect(testSet.has(2)).toBeTruthy();
            expect(testSet.has(3)).toBeTruthy();
            expect(testSet.has(4)).toBeFalsy();
        });
        it("TEST update", () => {
            const testSet = createTestDistinctObjectSet();
            const updateData = { index: 3, data: "james" };
            testSet.update(updateData);
            expect(testSet.size).toBe(3);
            expect(testSet.has(3)).toBeTruthy();
            expect(testSet.get(3).isPresent).toBeTruthy();
            expect(testSet.get(3).get()).toBe(updateData);
        });
        it("TEST delete", () => {
            const testSet = createTestDistinctObjectSet();
            testSet.delete(3);
            expect(testSet.size).toBe(2);
            expect(testSet.has(1)).toBeTruthy();
            expect(testSet.has(2)).toBeTruthy();
            expect(testSet.has(3)).toBeFalsy();
        });
        it("TEST clear", () => {
            const targetSet = new DistinctSet_1.DistinctSet((num) => num.index);
            targetSet.add({ index: 1, data: "hello" });
            targetSet.add({ index: 2, data: "world" });
            targetSet.add({ index: 3, data: "local" });
            targetSet.add({ index: 3, data: "host" });
            targetSet.clear();
            expect(targetSet.size).toBe(0);
        });
    });
});
