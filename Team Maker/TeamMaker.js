function addSelectedPlayers() {
    var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    var playersSheet = spreadsheet.getSheetByName("Players"); // Change "Players" to the name of your players tab
    var mainSheet = spreadsheet.getActiveSheet(); // Change this to the name of your main sheet if different
  
    // Read the selected players and ratings from the "Players" tab
    var playersRange = playersSheet.getRange("A2:C");
    var playersData = playersRange.getValues();
  
    // Filter out only the selected players
    var selectedPlayersData = playersData.filter(function(row) {
      return row[0] === true;
    }).map(function(row) {
      return [row[1], row[2]];
    });
  
    // Check if any players are selected
    if (selectedPlayersData.length === 0) {
      SpreadsheetApp.getUi().alert("Please select at least one player from the list.");
      return;
    }
  
    // Transfer the selected players to the main sheet
    mainSheet.getRange("A2:B").clearContent(); // Clear existing players in the main sheet
  
    var selectedPlayersRange = mainSheet.getRange(2, 1, selectedPlayersData.length, selectedPlayersData[0].length);
    selectedPlayersRange.setValues(selectedPlayersData);
  }
  
  function makeTeams() {
    var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    var mainSheet = spreadsheet.getActiveSheet(); // Change this to the name of your main sheet if different
  
    // Read all the players and ratings from the main sheet
    var players = mainSheet.getRange("A2:B").getValues().filter(function(row) {
      return row[0] !== "" && row[1] !== "";
    });
    var numPlayers = players.length;
  
    if (numPlayers > 200) {
      SpreadsheetApp.getUi().alert("The number of players must be under 200.");
      return;
    }
  
    // How many teams?
    var numTeams = mainSheet.getRange("D2").getValue();
    if (numTeams > 10 || numTeams < 2 || Math.floor(numTeams) !== numTeams) {
      SpreadsheetApp.getUi().alert("The number of teams must be an integer from 2-10.");
      return;
    }
  
    // Figure out the team sizes
    var teamSize = [];
    for (var r = 1; r <= numTeams; r++) {
      teamSize.push(Math.floor(numPlayers / numTeams) + (r <= (numPlayers % numTeams) ? 1 : 0));
    }
  
    // Make random teams
    var trials = 0;
    while (trials < 10000) {
      shuffle(players);
  
      // Figure out the team ratings
      var teamRating = new Array(numTeams).fill(0);
      var maxRating = -1;
      var minRating = 21; // Adjusted to the highest possible rating
      var t = 0;
      var tc = 1;
      for (var i = 0; i < numPlayers; i++) {
        teamRating[t] += players[i][1];
        tc++;
        if (tc > teamSize[t]) {
          teamRating[t] /= teamSize[t];
          if (teamRating[t] > maxRating) maxRating = teamRating[t];
          if (teamRating[t] < minRating) minRating = teamRating[t];
          t++;
          tc = 1;
        }
      }
  
      // Max team rating - min team rating within the limit?
      var ratingLimit = mainSheet.getRange("F2").getValue();
      if (maxRating - minRating <= ratingLimit) {
        printTeams(mainSheet, numTeams, teamSize, players, teamRating);
        return;
      }
  
      // Nope, try again
      trials++;
    }
  
    var message = "סידור קבוצות באופן שווה לא צלח\n\n";
    message += "נסה שוב או שנה את אחוז הדיוק";
    SpreadsheetApp.getUi().alert(message);
  }
  
  // This function will randomly shuffle the players
  function shuffle(array) {
    var currentIndex = array.length, randomIndex;
  
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
  }
  
  // This function will print the teams on the sheet
  function printTeams(sheet, numTeams, teamSize, players, teamRating) {
    sheet.getRange("J1:AP100").clearContent();
    var ctr = 0;
  
    for (var i = 0; i < numTeams; i++) {
      var col = (i + 1) * 3 + 6;
      sheet.getRange(1, col).setValue("Team " + String.fromCharCode(65 + i));
  
      for (var j = 0; j < teamSize[i]; j++) {
        sheet.getRange(j + 2, col).setValue(players[ctr][0]);
        sheet.getRange(j + 2, col + 1).setValue(players[ctr][1]);
        ctr++;
      }
  
      sheet.getRange(teamSize[0] + 3, col + 0).setValue("Team rating:                        " + teamRating[i])
           .setFontWeight("bold");
  ;
    }
  }
  function printFinalList() {
    var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    var mainSheet = spreadsheet.getSheetByName("Team Maker");
    var finalListSheet = spreadsheet.getSheetByName("Final List");
  
    // Clear existing content in the Final List sheet
    finalListSheet.clearContents();
  
    // Read the teams and team sizes from the main sheet
    var numTeams = mainSheet.getRange("D2").getValue();
  
    // Print the teams to the Final List sheet
    var currentRow = 1;
  
    for (var i = 0; i < numTeams; i++) {
      finalListSheet.getRange(currentRow, 1).setValue("Team " + String.fromCharCode(65 + i));
      currentRow++;
  
      for (var j = 0; j < 5; j++) {
        var playerName = mainSheet.getRange(2 + j, (i * 3) + 9).getValue();
        finalListSheet.getRange(currentRow, 1).setValue(playerName);
        currentRow++;
      }
  
      currentRow++; // Add a space row after the last player of each team
    }
  
  }
  
  
  
  