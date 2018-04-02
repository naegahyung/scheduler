const chai = require('chai');

const { 
  parseCSVFile, 
  organizeData, 
  modifyTimeFormat,
  convertNumberToTime,
  checkForTimeValidity
} = require('./parser');
const expect = chai.expect;

describe('Parsing script', () => {
  it('parseCSVFile function should return columns of values in a list', async () => {
    let data = await parseCSVFile("/Users/jin/SchedulerWeb/src/assets/masterlist.csv");
    expect(data).to.deep.include({ 
      CRN: '30574',
      Crs: 'ARTD',
      Num: '2360',
      grad: 'F',
      Sec: '1',
      'Title Short': 'Photo Basics',
      'Cred Hr': '4',
      'Enrl Max': '11',
      'Waitlist Y': 'Y',
      Instructor: 'Tony Luong',
      Room: 'Ryder 301',
      'Done (Y/N)': 'Yes',
      'Seq:': 'WB',
      Day: 'F',
      Time: '1335-1705',
      startTime: '1335',
      endTime: '1705',
      duration: 210,
      'Differences/Notes': '',
      noted: '' 
    });
    expect(data.length).to.be.equal(174);
  });

  it('organizeData function will convert raw data to friendly format', () => {
    let data = [
      { field1: 'CRN', field2: 'Crs', field3: 'Num' },
      { field1: '35507', field2: 'ARTG', field3: '3460' },
      { field1: '33296', field2: 'ARTF', field3: '1123' }
    ];
    let prettyData = [ 
      { CRN: '35507', Crs: 'ARTG', Num: '3460' },
      { CRN: '33296', Crs: 'ARTF', Num: '1123' } 
    ]
    data = organizeData(data);
    expect(data).to.deep.equal(prettyData)
  }); 

  it('organizeData function will do nothing to an empty data', () => {
    let data = [];
    data = organizeData(data);
    expect(data).to.deep.equal([]);
  });

  it('modifyTimeFormat function will modify the "time" field to three fields', () => {
    let data = [
      { CRN: '35507', Crs: 'ARTG', Time: "0800-1130" },
      { CRN: '30576', Crs: 'ARTF', Time: "1335-1705" },
      { CRN: '30481', Crs: 'ARTG', Time: "0800-1730" }
    ];
    let prettyData = [
      { CRN: '35507', Crs: 'ARTG', Time: "0800-1130", startTime: '0800', endTime: '1130', duration: 210 },
      { CRN: '30576', Crs: 'ARTF', Time: "1335-1705", startTime: '1335', endTime: '1705', duration: 210 },
      { CRN: '30481', Crs: 'ARTG', Time: "0800-1730", startTime: '0800', endTime: '1730', duration: 570 }
    ];
    data = modifyTimeFormat(data);
    expect(data).to.deep.equal(prettyData);
  });

  it('convertNumberToTime convert "XXXX-XXXX" formmatted time to a time object { start, end, duration }', () => {
    let time1 = "0200-1020";
    let time2 = "0300-0100";
    let time3 = "0000-0000";
    let time4 = "xcfl-ekfa";
    let time5 = "3113-3431";

    

  });

  it('checkForTimeValidity will check if given list of timeframes is out of range', () => {
    let time1 = [ "0200", "0403" ];
    let time2 = [ "0000",  "2400" ];
    let time3 = [ "0001", "2401" ];
    let time4 = [ "2501", "5930" ];
    let time5 = [ "3021", "0000" ];

    let errorMsg = "Error: Time frame is incorrect. Check the input.";
    expect(checkForTimeValidity(time1)).to.equal(true);
    expect(checkForTimeValidity(time2)).to.equal(true);
    expect(checkForTimeValidity(time3)).to.equal(false);
    expect(checkForTimeValidity(time4)).to.equal(false);
    expect(checkForTimeValidity(time5)).to.equal(false);
  });
});