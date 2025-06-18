import { Component, inject, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Event } from '../../../models/event.model';
import { EventService } from '../../../services/event.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-editar-event',
  imports: [FormsModule],
  templateUrl: './editar-event.html',
  styleUrl: './editar-event.css'
})
export class EditarEvent {

  submitCadastroTentado = false;

  eventService = inject(EventService);
  toastr = inject(ToastrService);


  eventEditObj: Event = {
      titulo: '',
      status: ''
    }

  @Input() propsDadosEvent!: Event;

  ngOnInit() {
    this.eventEditObj = { ...this.propsDadosEvent };
  }

  editarEvent(event: Event){

    this.submitCadastroTentado = true;

    if(!this.formularioValido()){
      this.toastr.error("Formulário inválido. Verifique os campos.")
      return;
    }

    this.eventService.updateEvento(event).subscribe({
      next: () => {
        this.toastr.success('Evento atualizado com sucesso!');
        this.fecharModalEditDireto();
        // window.location.reload();
      },
      error: err => {
        this.toastr.error('Falha ao atualizar evento.');
        console.error('Erro ao atualizar evento:', err);
      }
    });
  }

  private formularioValido(): boolean {
    const { titulo, status } = this.eventEditObj;

    return (
      titulo.trim() !== '' &&
      status.trim() !== ''
    );
  }

  fecharModalEditDireto() {
    document.getElementById("modalEditOverlay")!.classList.remove("show");
  }
}
