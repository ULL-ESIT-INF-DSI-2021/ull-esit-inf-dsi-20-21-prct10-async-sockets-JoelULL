import 'mocha';
import {expect} from 'chai';

import {Note} from "../src/note";

let testnote = new Note("a", "a", "a", "yellow");
testnote.setUser("user1");
testnote.setTitle("test");
testnote.setBody("this is a test");
testnote.setColor("red");

describe('Tests for Note class', () => {
    it('testnote.getUser() returns user1', () => {
        expect(testnote.getUser()).to.be.equal("user1");
    });
    it('testnote.getTitle() returns test', () => {
      expect(testnote.getTitle()).to.be.equal("test");
    });
    it('testnote.getBody() returns this is a test', () => {
        expect(testnote.getBody()).to.be.equal("this is a test");
    });
    it('testnote.getColor() returns red', () => {
        expect(testnote.getColor()).to.be.equal("red");
    });
});
