import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ColDef, GridApi, ColumnApi, GridReadyEvent } from 'ag-grid-community';

export interface GridAttribute {
    column: ColDef[];
    dataSource: any;
}

@Component({
    selector: 'app-grid',
    templateUrl: './grid.component.html',
    styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {

    @Input('GridAttributes') GridAttributes!: GridAttribute;

    @Input('FrameworkComponents') FrameworkComponents: any;

    @Input('AutoSizeColumn') AutoSizeColumn: boolean = false;

    defaultColDef: ColDef = {
        sortable: true,
        filter: true,
        resizable: true
    };

    gridApi!: GridApi;

    @Output('onSelectionChange') onSelectionChange = new EventEmitter<any>();

    private gridColumnApi!: ColumnApi;

    constructor() { }

    ngOnInit(): void {
    }

    onGridReady(args: GridReadyEvent): void {
        this.gridApi = args.api;
        this.gridColumnApi = args.columnApi;

        if (args.columnApi.getAllColumns()!.length < 7) {
            this.gridApi.sizeColumnsToFit();

            window.addEventListener('resize', () => {
                setTimeout(() => {
                    this.gridApi.sizeColumnsToFit();
                });
            })
        } else {
            const allColumnsId: string[] = [];

            this.gridColumnApi.getAllColumns()?.forEach((column) => {
                allColumnsId.push(column.getId());
            });

            this.gridColumnApi.autoSizeColumns(allColumnsId, false);
        }
    }

    onSelectionChanged(args: any): void {
        this.onSelectionChange.emit(this.gridApi.getSelectedRows()[0]);
    }

    onAddData(data: any): void {
        this.gridApi.applyTransaction({ add: [data] })!;
    }
}
