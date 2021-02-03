describe("Cue Bar Specs", () => {

    describe("The Cue Marker", () => {
        it("offsets the position of the marker greater than the actual position because of the Cue bar's position ", () => {
            expect(CueBar.mark(105, 7055)).toBeCloseTo('28.48');
            expect(CueBar.mark(20, 7055)).toBeCloseTo('20');
        });

        it("moves the Cue bar toward the right of the Cue bar", () => {
            let container = SpecDOM('#bar_marker');
            SpecDOM().html('<div id="bar_marker" style="left: 18px"/>');
            container.css("position", "absolute");
            CueBar.mark(105, 7055);
            expect(container.css("left")).toBeGreaterThan('20px');
            expect(container.css("left")).toBeLessThan('29px');
        });
    });
});
