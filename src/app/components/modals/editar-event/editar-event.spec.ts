import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarEvent } from './editar-event';

describe('EditarEvent', () => {
  let component: EditarEvent;
  let fixture: ComponentFixture<EditarEvent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarEvent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarEvent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
