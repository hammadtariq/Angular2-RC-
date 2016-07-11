import { bootstrap }    from '@angular/platform-browser-dynamic';
import { provideForms } from '@angular/forms';

import { AppComponent } from './app.component';

bootstrap(AppComponent,[
    provideForms()
    ])
    .catch((err:any) => console.error("error from bootstrap: ",err));
