import { TitleCasePipe } from './title-case.pipe';

describe('TitleCasePipe', () => {
  const pipe = new TitleCasePipe();

  it('transforms "angular course" to "Angular Course"', () => {
    expect(pipe.transform('angular course')).toBe('Angular Course');
  });

  it('returns empty string for empty input', () => {
    expect(pipe.transform('')).toBe('');
  });
});
