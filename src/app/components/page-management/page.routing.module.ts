import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PageManagementComponent } from './page-management.component';
import { EditPageComponent } from './edit-page/edit-page.component';
import { CreatePageComponent } from './create-page/create-page.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'pagemanagement',
                component: PageManagementComponent
            },
            {
                path: 'pagemanagment/editpage/:pageId',
                component: EditPageComponent
            },
            {
                path: 'pagemanagement/createpage',
                component: CreatePageComponent
            }
        ])
    ],
    declarations: [],
    exports: [ RouterModule ]
})

export class PageRoutingModule {  }
