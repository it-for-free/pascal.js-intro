
import { runFile, insp } from '../../helpers/testsHelper';

let pjs = runFile(import.meta.url, 'base.code');

test('result = 1', () => {
    expect(pjs.engine.results[0]).toBe(1);
  });

test('result = 3', () => {
    expect(pjs.engine.results[1]).toBe(3);
  });

test('result = -4', () => {
    expect(pjs.engine.results[2]).toBe(-4);
  });

test('result = -4', () => {
    expect(pjs.engine.results[3]).toBe(-4);
  });
