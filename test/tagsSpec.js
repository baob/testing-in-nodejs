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
    });

});
