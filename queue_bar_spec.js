describe("queueBar Specs", () => {

    describe("markAt() - The Queue's Marking mechanism", () => {
        it("offsets the position of the marker greater than the actual position from the queue bar's position ", () => {
            expect(queueBar.markAt(105, 7055)).toBeCloseTo('28.48');
            expect(queueBar.markAt(20, 7055)).toBeCloseTo('20');
        });

        it("moves the queue bar toward the right of the queue bar", () => {
            let container = SpecDOM('#bar_marker');

            SpecDOM().html('<div id="bar_marker" style="left: 18px"/>');
            container.css("position", "absolute");

            queueBar.markAt(105, 7055);

            expect(container.css("left")).toBeGreaterThan('20px');
            expect(container.css("left")).toBeLessThan('29px');
        });
    });
});
