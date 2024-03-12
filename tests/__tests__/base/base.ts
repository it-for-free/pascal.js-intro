
import { runFile, insp } from '../../helpers/testsHelper';

let pjs = runFile(import.meta.url, 'base.code');

test('result = 18', () => {
    expect(pjs.engine.results[0]).toBe(18);
  });