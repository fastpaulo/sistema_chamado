import { Component , Input, Output, EventEmitter} from '@angular/core';

@Component({
  imports: [],
  selector: 'app-header',
  styleUrl: './header.css',
  templateUrl: './header.html',
})
export class Header {
  @Input() title: string = 'Visão Geral';
  @Input() userName: string = 'Usuário';
  @Input() userInitials: string = 'US';
  // Criamos um emissor de eventos
  @Output() toggleSidebar = new EventEmitter<void>();

  // Função chamada ao clicar no botão
  onToggleClick() {
    this.toggleSidebar.emit();
  }
}
