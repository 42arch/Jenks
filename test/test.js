'use strict';
const expect = require('chai').expect;
const Jenks = require('../lib/index').Jenks;

describe('lib function test', () => {
  it('should return an array', () => {
    let data = [1, 2, 5, 15, 45, 89.3, 112, 31 ,120, 0.5]
    let n_classes = 3
    let result = new Jenks(data, n_classes).naturalBreak()
    expect(result).to.be.instanceof(Array)
  });
});

describe('lib function test', () => {
  it('should return an array within 1~4', () => {
    let data = [1, 2, 5, 15, 45, 89.3, 112, 31 ,120, 0.5]
    let n_classes = 3
    let result = new Jenks(data, n_classes).naturalBreak()
    expect(result).to.have.length.within(2,4)
  });
});



describe('lib function test', () => {
  it('should return [ 0.5, 15, 45, 120 ]', () => {
    let data = [1, 2, 5, 15, 45, 89.3, 112, 31 ,120, 0.5]
    let n_classes = 3
    let result = new Jenks(data, n_classes).naturalBreak()

    expect(result).to.include.members([0.5, 15, 45, 120]);
  });
});
