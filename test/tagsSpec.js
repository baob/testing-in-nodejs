var expect = require("chai").expect;
var tags = require("../lib/tags.js");

describe("Tags", function () {

    describe("#parse()", function () {

        it("should parse long formed tags", function () {
            var args = ["--depth=4", "--hello=world"],
                results = tags.parse(args);

            expect(results).to.have.a.property("hello", "world");
        });

        it("should parse long formed tags and parse integers", function () {
            var args = ["--depth=4", "--hello=world"],
                results = tags.parse(args);

            expect(results).to.have.a.property("depth", 4);
        });

        it("should fallback to defaults", function () {
            var args = ["--depth=4", "--hello=world"],
                defaults = { depth: 2, foo: "bar" },
                results = tags.parse(args, defaults),
                expected = {
                    depth: 4,
                    foo: "bar",
                    hello: "world"
                };

            expect(results).to.deep.equal(expected);
        });


        it("should accept tags without values as a bool", function () {
            var args = ["--searchContents"],
                results = tags.parse(args);

            expect(results).to.have.a.property("searchContents", true);
        });

        describe("short formed tags", function () {

            specify("are accepted when replacements specified", function () {
                var args = ["-sd=4", "-h"],
                    replacements = {
                        s: "searchContents",
                        d: "depth",
                        h: "hello"
                    },
                    results = tags.parse(args, {}, replacements),
                    expected = {
                        searchContents: true,
                        depth: 4,
                        hello: true
                    };

                expect(results).to.deep.equal(expected);
            });

            specify("are ignored when no corresponding replacement", function () {
                var args = ["-sd=4"],
                    replacements = {
                        d: "depth",
                    },
                    results = tags.parse(args, {}, replacements),
                    expected = {
                        depth: 4,
                    };

                expect(results).to.deep.equal(expected);
            });
        });
    });
});
