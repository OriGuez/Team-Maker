function resetCheckboxes() {
    var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    var playersSheet = spreadsheet.getSheetByName("Players"); // Change "Players" to the name of your players tab
    
    // Clear all checkboxes in the "Players" tab
    var playersRange = playersSheet.getRange("A2:A");
    playersRange.uncheck();
  }
  
  function increment() {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var cell = sheet.getRange('F2'); 
    var value = cell.getValue();
    cell.setValue(value + 0.1);
  }
  
  function decrement() {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var cell = sheet.getRange('F2'); 
    var value = cell.getValue();
    cell.setValue(value - 0.1);
  }