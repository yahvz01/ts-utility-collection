import { DistinctSet } from "@/DistinctSet"

export {}

function createTestDistinctNumberSet() {
    const numSet = new DistinctSet( ( num : number ) => num )
    numSet.add(1)
    numSet.add(2)
    numSet.add(3)
    numSet.add(3)
    return numSet
}

describe("DistinctSet<primary key>test", () => {

    describe("DistinctSet<number> test", () => {

        it("TEST DistinctSet<number> size / length", () => {
            const numSet = createTestDistinctNumberSet();
            expect(numSet.size).toBe(3);
            expect(numSet.size).toBe(3);
        })

        it("TEST has", () => {
            const numSet = createTestDistinctNumberSet();
            expect(numSet.has(1)).toBeTruthy()
            expect(numSet.has(2)).toBeTruthy()
            expect(numSet.has(3)).toBeTruthy()
            expect(numSet.has(4)).toBeFalsy()
        })

        it("TEST add", () => {
            const numSet = createTestDistinctNumberSet();
            numSet.update(2)
            expect(numSet.size).toBe(3)
            expect(numSet.has(1)).toBeTruthy()
            expect(numSet.has(2)).toBeTruthy()
            expect(numSet.has(3)).toBeTruthy()
        })

        it("TEST delete", () => {
            const numSet = createTestDistinctNumberSet();
            numSet.add(5)
            numSet.add(3)
            numSet.add(1)

            numSet.delete(3)
            expect(numSet.size).toBe(3)
            expect(numSet.has(5)).toBeTruthy()
            expect(numSet.has(1)).toBeTruthy()
            expect(numSet.has(3)).toBeFalsy()
        })

        it("TEST clear", () => {
            const set = new DistinctSet( (item : number) => item );
            set.add(5)
            set.add(3)
            set.add(1)

            set.clear()
            expect(set.size).toBe(0)
        })
    })
})