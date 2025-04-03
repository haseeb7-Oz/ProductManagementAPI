export const YearsEnum = Object.freeze({
    YEAR_2022: { value: 1, label: "2022" },
    YEAR_2023: { value: 2, label: "2023" },
    YEAR_2024: { value: 3, label: "2024" },
  });
  
  // Convert Enum to Array for Dropdown Usage
  export const YearsArray = Object.values(YearsEnum);
  
  export const MonthsEnum = Object.freeze({
    JANUARY: { value: 1, label: "January" },
    FEBRUARY: { value: 2, label: "February" },
    MARCH: { value: 3, label: "March" },
    APRIL: { value: 4, label: "April" },
    MAY: { value: 5, label: "May" },
    JUNE: { value: 6, label: "June" },
    JULY: { value: 7, label: "July" },
    AUGUST: { value: 8, label: "August" },
    SEPTEMBER: { value: 9, label: "September" },
    OCTOBER: { value: 10, label: "October" },
    NOVEMBER: { value: 11, label: "November" },
    DECEMBER: { value: 12, label: "December" },
  });
  
  export const MonthsArray = Object.values(MonthsEnum);
  
  export const StatusEnum = Object.freeze({
    EXECUTION: { value: 1, label: "Execution" },
    INITIATION: { value: 2, label: "Initiation" },
    PLANNING: { value: 3, label: "Planning" },
  });
  
  export const StatusArray = Object.values(StatusEnum);
  
  export const PropertyEnum = Object.freeze({
    HRCIN: { value: 1, label: "HRCIN" },
    HRNYC: { value: 2, label: "HRNYC" },
  });
  
  export const PropertyArray = Object.values(PropertyEnum);
  