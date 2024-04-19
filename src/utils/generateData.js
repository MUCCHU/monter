// Function to generate random integer within a range
const fs = require('fs');
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  // Function to generate random file names based on the provided patterns
  function generateRandomFileName() {
    const patterns = [
      'APP_URL_USAGE_(Exclude_Half_Days)_',
      'RUR_L1_',
      'RUR_L2_(Exclude_NonWorking_Days)_'
    ];
  
    const currentDate = new Date();
    const startDate = new Date(2023, 0, 1); 
    const endDate = currentDate;
  
    const randomPatternIndex = getRandomInt(0, patterns.length - 1);
    const randomPattern = patterns[randomPatternIndex];
  
    // Generate random dates within the range
    const randomStartDate = new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime()));
    const randomEndDate = new Date(randomStartDate.getTime() + Math.random() * (endDate.getTime() - randomStartDate.getTime()));
  
    // Format dates
    const startDateStr = `${randomStartDate.getDate()}_${randomStartDate.getMonth() + 1}_${randomStartDate.getFullYear()}`;
    const endDateStr = `${randomEndDate.getDate()}_${randomEndDate.getMonth() + 1}_${randomEndDate.getFullYear()}`;
  
    // Generate random file name
    return `${randomPattern}${startDateStr}_${endDateStr}.csv`;
  }
  function getRandomDateTime() {
    const startDate = new Date(); 
    const endDate = new Date();
    startDate.setMonth(startDate.getMonth() - 1);
    startDate.setHours(0, 0, 0, 0);
    const randomDate = new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime()));
  
    // Create and return a new Date object with the random components
    return randomDate;
  }

function generateData(length){
    const data = [];
    for(let i = 0; i < length; i++){
        data.push({
            date: getRandomDateTime(),
            name: generateRandomFileName(),
            download: "Download"
        })
    }
    // save data in json file
    const filePath = '../data.json';
    fs.writeFileSync(filePath, JSON.stringify(data));
    return data;
}

generateData(20);