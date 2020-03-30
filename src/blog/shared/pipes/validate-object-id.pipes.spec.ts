import { ValidateObjectId } from './validate-object-id.pipes';

describe('ValidateObjectIdPipe', () => {
  it('should be defined', () => {
    expect(new ValidateObjectId()).toBeDefined();
  });
});
