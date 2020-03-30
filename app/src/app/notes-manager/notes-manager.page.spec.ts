import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NotesManagerPage } from './notes-manager.page';

describe('NotesManagerPage', () => {
  let component: NotesManagerPage;
  let fixture: ComponentFixture<NotesManagerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotesManagerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NotesManagerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
