import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Necessário para o ngModel
import { NavBar } from '../nav-bar/nav-bar';
import { Header } from '../header/header';
interface Ticket {
  id: string;
  title: string;
  description: string;
  department: string;
  status: 'Aberto' | 'Em Andamento' | 'Resolvido';
  priority: 'Alta' | 'Média' | 'Baixa';
  date: string;
}

@Component({
  imports: [CommonModule,FormsModule,NavBar,Header],
  selector: 'app-my-ticket',
  styleUrl: './my-ticket.css',
  templateUrl: './my-ticket.html',
})
export class MyTicket {
  sidebarOpen: boolean = false;
  searchTerm: string = '';
  currentFilter: string = 'Todos';
  
  // Abas de filtro
  filters: string[] = ['Todos', 'Aberto', 'Em Andamento', 'Resolvido'];

  // Dados simulados com cenários de infraestrutura
  tickets: Ticket[] = [
    {
      id: 'CHM-1048',
      title: 'Adequação de GPO para bloqueio de ícones',
      description: 'Aplicar restrições de desktop e menu iniciar para o perfil dos laboratórios.',
      department: 'Alunos_Cedup',
      status: 'Em Andamento',
      priority: 'Alta',
      date: '22 Set 2026'
    },
    {
      id: 'CHM-1047',
      title: 'Erro na captura de imagem WIM com DISM',
      description: 'O processo de sysprep e captura está falhando na etapa de generalização da imagem base.',
      department: 'Infraestrutura',
      status: 'Aberto',
      priority: 'Alta',
      date: '21 Set 2026'
    },
    {
      id: 'CHM-1046',
      title: 'Ajuste no script de join automático (OOBE)',
      description: 'Revisar a automação no autounattend.xml para ingressar as máquinas no domínio sc.gov.br silenciosamente.',
      department: 'Automação',
      status: 'Resolvido',
      priority: 'Média',
      date: '18 Set 2026'
    },
    {
      id: 'CHM-1045',
      title: 'Deploy de softwares via PowerShell',
      description: 'Criar script para instalação silenciosa do pacote de utilitários nas máquinas novas.',
      department: 'Suporte N2',
      status: 'Resolvido',
      priority: 'Baixa',
      date: '15 Set 2026'
    }
  ];

  // Getter que retorna a lista filtrada para o HTML
  get filteredTickets(): Ticket[] {
    return this.tickets.filter(ticket => {
      const matchesSearch = ticket.title.toLowerCase().includes(this.searchTerm.toLowerCase()) || 
                            ticket.id.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      const matchesFilter = this.currentFilter === 'Todos' || ticket.status === this.currentFilter;
      
      return matchesSearch && matchesFilter;
    });
  }

  // Atualiza o filtro atual
  setFilter(filter: string): void {
    this.currentFilter = filter;
  }

  // Cores dinâmicas para o status
  getStatusClass(status: string): string {
    switch (status) {
      case 'Aberto': return 'bg-red-100 text-red-800';
      case 'Em Andamento': return 'bg-yellow-100 text-yellow-800';
      case 'Resolvido': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }

  // Cores dinâmicas para prioridade
  getPriorityClass(priority: string): string {
    switch (priority) {
      case 'Alta': return 'text-red-600';
      case 'Média': return 'text-yellow-600';
      case 'Baixa': return 'text-green-600';
      default: return 'text-gray-600';
    }
  }
   toggleMenu() {
    this.sidebarOpen = !this.sidebarOpen;
  }
}
