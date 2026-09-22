import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBar } from '../nav-bar/nav-bar';
import { Header } from '../header/header';
interface Ticket {
  id: string;
  title: string;
  requester: string;
  department: string;
  status: 'Aberto' | 'Em Andamento' | 'Resolvido';
  date: string;
}

@Component({
  imports: [CommonModule,NavBar,Header],
  selector: 'app-dashboard',
  styleUrl: './dashboard.css',
  templateUrl: './dashboard.html',
})
export class Dashboard {
  sidebarOpen: boolean = false;
  stats = {
    total: 124,
    open: 12,
    inProgress: 5,
    resolved: 107
  };

  // Dados simulados para a tabela de chamados recentes
  recentTickets: Ticket[] = [
    {
      id: 'CHM-1042',
      title: 'Reset de Senha - Active Directory',
      requester: 'João Silva',
      department: 'Administrativo',
      status: 'Aberto',
      date: '22 Set 2026'
    },
    {
      id: 'CHM-1041',
      title: 'Aplicação de política de restrição (GPO)',
      requester: 'Maria Costa',
      department: 'Alunos_Cedup',
      status: 'Em Andamento',
      date: '22 Set 2026'
    },
    {
      id: 'CHM-1040',
      title: 'Atualização da imagem WIM base',
      requester: 'Carlos Mendes',
      department: 'TI',
      status: 'Resolvido',
      date: '21 Set 2026'
    },
    {
      id: 'CHM-1039',
      title: 'Falha no script de join no domínio (OOBE)',
      requester: 'Ana Oliveira',
      department: 'Infraestrutura',
      status: 'Aberto',
      date: '21 Set 2026'
    }
  ];

  // Função auxiliar para retornar a classe de cor do badge de status
  getStatusClass(status: string): string {
    switch (status) {
      case 'Aberto':
        return 'bg-red-100 text-red-800';
      case 'Em Andamento':
        return 'bg-yellow-100 text-yellow-800';
      case 'Resolvido':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }
  toggleMenu() {
    this.sidebarOpen = !this.sidebarOpen;
  }
}
