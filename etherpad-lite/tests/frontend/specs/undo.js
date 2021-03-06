describe('undo button', function () {
  beforeEach(function (cb) {
    helper.newPad(cb); // creates a new pad
    this.timeout(60000);
  });

  it('undo some typing by clicking undo button', function (done) {
    const inner$ = helper.padInner$;
    const chrome$ = helper.padChrome$;

    // get the first text element inside the editable space
    const $firstTextElement = inner$('div span').first();
    const originalValue = $firstTextElement.text(); // get the original value

    $firstTextElement.sendkeys('foo'); // send line 1 to the pad
    const modifiedValue = $firstTextElement.text(); // get the modified value
    expect(modifiedValue).not.to.be(originalValue); // expect the value to change

    // get clear authorship button as a variable
    const $undoButton = chrome$('.buttonicon-undo');
    // click the button
    $undoButton.click();

    helper.waitFor(() => inner$('div span').first().text() === originalValue).done(() => {
      const finalValue = inner$('div span').first().text();
      expect(finalValue).to.be(originalValue); // expect the value to change
      done();
    });
  });

  it('undo some typing using a keypress', function (done) {
    const inner$ = helper.padInner$;
    const chrome$ = helper.padChrome$;

    // get the first text element inside the editable space
    const $firstTextElement = inner$('div span').first();
    const originalValue = $firstTextElement.text(); // get the original value

    $firstTextElement.sendkeys('foo'); // send line 1 to the pad
    const modifiedValue = $firstTextElement.text(); // get the modified value
    expect(modifiedValue).not.to.be(originalValue); // expect the value to change

    const e = inner$.Event(helper.evtType);
    e.ctrlKey = true; // Control key
    e.which = 90; // z
    inner$('#innerdocbody').trigger(e);

    helper.waitFor(() => inner$('div span').first().text() === originalValue).done(() => {
      const finalValue = inner$('div span').first().text();
      expect(finalValue).to.be(originalValue); // expect the value to change
      done();
    });
  });
});
