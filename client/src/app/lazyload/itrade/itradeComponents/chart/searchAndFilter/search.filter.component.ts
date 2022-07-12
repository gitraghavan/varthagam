import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { debounceTime } from 'rxjs';

@Component ({
    selector: 'menu-and-options',
    templateUrl: './search.filter.component.html',
    styles: [`
        .va-ic-search-and-filter {
            padding: 8px 24px;
            display: grid;
            grid-template-rows: repeat (1fr);
            gap: 16px;
        }
        .va-ic-search-and-filter_form_search_inp {
            width: 100%;
            max-width: 300px;
        }
    `]
})
export class SearchAndFilter implements OnInit {
    searchScrip: FormControl = new FormControl ('');
    
    ngOnInit (): void {
        this.searchScrip.valueChanges
            .pipe (
                debounceTime (1000)
            )
            .subscribe ((v: any) => {
                console.log (v);
            });
    }
}
