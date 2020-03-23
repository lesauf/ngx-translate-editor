import { createRoutingFactory, SpectatorRouting } from '@ngneat/spectator/jest';
import { MockComponent } from 'ng-mocks';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { EditorComponent } from './editor/editor.component';
import { MessagesComponent } from './messages/messages.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('AppComponent', () => {
  let appComponentSpectator: SpectatorRouting<AppComponent>;
  const createComponent = createRoutingFactory({
    component: AppComponent,
    // Needed modules
    imports: [AppRoutingModule, FormsModule, ReactiveFormsModule],
    // EditorComponent: because of the routing, injected
    // Just mock MessageComponent because a dependency component
    declarations: [EditorComponent, MockComponent(MessagesComponent)]
  });

  beforeEach(() => {
    appComponentSpectator = createComponent();
  });

  it('should create the app', () => {
    expect(appComponentSpectator.component).toBeTruthy();
  });

  // it(`should have as title 'Ngx Translate Editor'`, () => {
  //   expect(appComponentSpectator.query('.content h1').textContent).toContain(
  //     'Ngx Translate Editor'
  //   );
  // });
});
