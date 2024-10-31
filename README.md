# Team Maker Script for Google Sheets

This Google Apps Script automates the selection, team-making, and listing of players in a Google Sheets document. Designed to assist in organizing teams based on player ratings, this script operates across three sheets in a Google Sheets document: Players, Team Maker, and Final List.

## Features
- Select Players: Choose players and their ratings from the Players sheet.
- Team Creation: Automatically create balanced teams based on ratings and desired team count.
- List Final Teams: Output finalized team rosters to the Final List sheet for easy viewing.
- Control Panel: Use increment and decrement controls to adjust team balance precision.

## Setup Instructions

### Prerequisites
- A Google account with access to Google Sheets.
- A Google Sheets document containing three specific sheets:
  1. Players: Where player selection and ratings are managed.
  2. Team Maker: Main sheet for team creation and control parameters.
  3. Final List: Displays the final list of created teams.

### Installation

1. Create or Open Google Sheets Document
   - Go to Google Sheets (https://sheets.google.com) and create a new spreadsheet, or open an existing one.

2. Add Three Sheets
   - Ensure that your Google Sheets document has three sheets named as follows:
     - Players
     - Team Maker
     - Final List
   - You may rename these sheets, but if you do, you’ll need to update the script’s references accordingly.

3. Add the Script
   - In the Google Sheets document, go to Extensions > Apps Script.
   - Delete any existing code, then copy and paste the code from this repository into the editor.

4. Save and Name the Script Project
   - Name the script project (e.g., "Team Maker Script").
   - Click File > Save.

5. Authorization
   - Run each function in the script to prompt the authorization dialog.
   - Click Authorize and follow the steps to allow the script to access your Google Sheets data.


### Adding Buttons and Triggers

To enhance usability, add buttons to each sheet to run specific functions:

#### In the Team Maker Sheet
- **Update List** Button
  - Go to Insert > Drawing and create a button labeled "Update List."
  - Place it in the Team Maker sheet.
  - Assign the `addSelectedPlayers` function to this button by clicking the three dots in the top-right of the button, selecting Assign script, and entering `addSelectedPlayers`.

- **Make Teams** Button
  - Create a button labeled "Make Teams" using Insert > Drawing.
  - Assign the `makeTeams` function to this button, following the same steps as above.

#### In the Players Sheet
- **Checkboxes**
  - Add checkboxes in column **A** beside each player name to indicate selected players.

#### In the Final List Sheet
- **Print Teams** Button
  - Create a button labeled "Print Teams" using Insert > Drawing.
  - Assign the `printFinalList` function to this button.

### Using the Script

1. **Select Players**:
   - Mark players in the Players sheet using the checkboxes in column A.
   - The script reads names and ratings in columns B and C of the Players sheet.

2. **Generate Teams**:
   - Enter the desired number of teams in cell D2 on the Team Maker sheet.
   - Specify the maximum allowable rating difference between teams in cell F2.
   - Click the **Make Teams** button to create teams with balanced ratings.

3. **View Final Teams**:
   - Once teams are generated, they’ll appear in the Team Maker sheet.
   - To copy final team lists to the Final List sheet, click the **Print Teams** button.

4. **Additional Controls** (see the third bulletpoint in level 3 of installation):
    #the code of the next functions is in "Additional.js" file.
  - **Reset List** Button
  - Create a button labeled "Reset List" using Insert > Drawing.
  - Assign the `resetCheckboxes` function to this button.
  - Click the **Reset List** button in the Players sheet to clear all selections.

  - **Adjust Rating Precision**
  - Create a button shaped as a plus using Insert > Drawing.
  - Assign the `increment` function to this button.
  - Create a button shaped as a minus using Insert > Drawing.
  - Assign the `decrement` function to this button.
  - Use increment and decrement functions to adjust the rating precision in cell F2 of the Team Maker sheet.


## Troubleshooting

- If teams aren’t displaying as expected, check that the required cells (e.g., D2 for team count, F2 for rating precision) are correctly populated on the Team Maker sheet.
- Ensure each player has a name and rating in the Players sheet and that team-related fields in the Team Maker sheet have valid data.

### Example (copy it to the "Players" sheet):

| Include in List | Player Name  | Full Rating | Rating |
|-----------------|--------------|-------------|--------|
| TRUE            | Adam Green   | 20          | 5.00   |
| TRUE            | Alex Brown   | 19          | 4.75   |
| TRUE            | Chris White  | 18          | 4.50   |
| TRUE            | David Black  | 17          | 4.25   |
| TRUE            | Ethan Blue   | 20          | 5.00   |
| TRUE            | Frank Silver | 16          | 4.00   |
| TRUE            | George Red   | 15          | 3.75   |
| TRUE            | Henry Gold   | 19          | 4.75   |
| TRUE            | Ivan Gray    | 18          | 4.50   |
| TRUE            | Jack Orange  | 17          | 4.25   |
| TRUE            | Kevin Yellow | 14          | 3.50   |
| TRUE            | Liam Purple  | 16          | 4.00   |
| TRUE            | Mike Cyan    | 13          | 3.25   |
| TRUE            | Nick Violet  | 12          | 3.00   |
| TRUE            | Oscar Pink   | 15          | 3.75   |
| TRUE            | Peter Brown  | 18          | 4.50   |
| TRUE            | Quinn White  | 19          | 4.75   |
| TRUE            | Ron Silver   | 17          | 4.25   |
| TRUE            | Sam Black    | 16          | 4.00   |
| TRUE            | Tom Red      | 14          | 3.50   |
| FALSE           | Dan Brown    | 12          | 3.00   |
