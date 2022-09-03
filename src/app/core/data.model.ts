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
    colDefs: string[];
    rowDefs: string[];
    cellData: string[][];
    colHeaderCodes: string[];
    dataSource: [][];
}