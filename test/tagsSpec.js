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
    });

});
