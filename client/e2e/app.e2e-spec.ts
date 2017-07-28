import { RickyLoremIpsumPage } from './app.po';

describe('ricky-lorem-ipsum App', () => {
  let page: RickyLoremIpsumPage;

  beforeEach(() => {
    page = new RickyLoremIpsumPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
