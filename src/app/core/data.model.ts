export interface CubeResults {
    title?: string;
    notes?: string;
    ranSuccesfully?: boolean;
    systemName?: string;
    systemLoadedDate?: string | Date;
    userName?: string;
    runDate?: string | Date;
    queryDescription?: string;
    dimensionResults: DimensionResults[];
    measureResults: MeasureResults[];
    cube?: string;
    counts: CubeResultsCount[];
}

export interface DimensionResults {
    id: string;
    headerCodes: string;
    headerDescriptions: string;
}

export interface MeasureResults {
    id: string;
    rows:  string[];
    cells: string[];
}

export interface CubeResultsCount {
    tableName: string;
    countValue: number;
}

export interface TableData {
    dataSource: any[]; // holds the model for the material table
    displayColumns: string[]; // holds the column structure for the material table
    displayDefs: string[] // holds the id per column
}