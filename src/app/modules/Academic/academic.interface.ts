type Month = 
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December';


export type AcademicSemester = {
    name : "Autumn" | "Summer" | "fall";
    code : '01'| '02'|'03';
    year : string; 
    startMonth :Month;
    endMonth : Month;
}