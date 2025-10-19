### Questions

- Q: Discuss your strategy and decisions implementing thea pplication.Please, consider time
 complexity, effort cost, technologies used and any other variable that you understand
 important on your development process.
- A: Explained on the readme file already

- Q: How would you change your solution to account for future columns that might be
requested, such as “Bill Voted OnDate” or “Co-Sponsors”?
- A: I'll need to add a new proprert to Vote class (VotedOnDate) and a new propert to the BillsStasticDTO (LastVotedDate).
- A: For Co-Sponsors, will need to create a new class BillCoSponsor, add a new list inside the BillsStasticDTO 

    Add new entities to Domain layer  
    Update DTOs in Application layer  
    Extend repository and service methods  
    Update controllers if needed  
    Add UI components for new data  

- Q: How would you change your solution if instead of receiving CSVs of data,you were given a
 list of legislators or bills that you should generate a CSV for?
- A: Will need to create a new Controller/API to handle the export file calls  
A new service to handle the business logic of generating a csv file  
    Add new controller endpoints for export  
    Add download buttons in frontend  
    Handle file download in browser  

- Q: How long did you spend working on the assignment?
- A: 6 hours in two separate days