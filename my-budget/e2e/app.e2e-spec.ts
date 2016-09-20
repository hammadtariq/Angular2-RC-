import { BudgetYourselfPage } from './app.po';

describe('budget-yourself App', function() {
  let page: BudgetYourselfPage;

  beforeEach(() => {
    page = new BudgetYourselfPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
