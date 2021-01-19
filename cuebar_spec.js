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

    describe("The Cue Bar", () => {
        beforeEach(() => {
            cues = [
                { metadata: 'http://www.facebook.com/milyoni',
                    time: 246},
                { metadata: '[1079164031001]',
                    time: 567},
                { metadata: 'are we in napa now?!',
                    time: 1563},
                { metadata: '~1234567~',
                    time: 270}
            ];
        });

        it("returns the right kind of cue object", () => {
            expect(CueBar.type(cues[0].metadata)).toEqual('like');
            expect(CueBar.type(cues[1].metadata)).toEqual('clip');
            expect(CueBar.type(cues[2].metadata)).toEqual('quote');
            expect(CueBar.type(cues[3].metadata)).toEqual('commentary');
        });

        it("has placed an icon on the Cue bar", () => {
            SpecDOM().html('<div id="icon_bar"/></div>');
            let container = SpecDOM('div#icon_bar');

            container.css('position', 'relative');
            container.css('width', '704');

            CueBar.build(cues, 305);

            expect($(container[0].children[0]).attr('onclick')).toMatch('milyoni.seek');
            expect($(container[0].children[0]).attr('src')).toMatch('_icon.png');
        });

        it("shows the right popup partial"),() => {
            let clip_commentary = { created_at:"2011-10-07T17:40:28Z",
                id: 76,
                is_commentary: true,
                movie_id: 44,
                name: "Steven Bauer: Scarface on Facebook",
                thumbnail_url: "http://brightcove.vo.ll....jpg?pubId=1111",
                updated_at: "2011-10-07T17:40:28Z",
                video_id: "1161803744001"
            };
            let quote = { created_at:"2011-08-08T20:59:44Z",
                id: 15,
                movie_id: 44,
                quoted_at: null,
                text: "are we in napa now?!",
                updated_at: "2011-08-08T20:59:44Z"
            };
            let clip_normal = { created_at:"2011-10-07T17:33:25Z",
                id:75,
                is_commentary:null,
                movie_id:44,
                name:"I'm the Dude (R)",
                thumbnail_url:"http://brightcove.vo.ll....jpg?pubId=1111",
                updated_at:"2011-10-07T17:33:25Z",
                video_id: "1079164021001"
            };
            let like = { created_at: "2011-10-05T18:13:27Z",
                id: 38, link: "http://www.facebook.com/BigLebowskiMovie",
                movie_id: 44,
                name: "Like",
                picture_url: "http://www.facebook.com/BigLebowskiMovie",
                updated_at: "2011-10-05T18:13:27Z"
            };
        }
    });
});
