import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-dashboard',
  standalone: true, // Indica que o componente é independente
  imports: [CommonModule], // <--- O CommonModule TEM de estar aqui, como apontaste!
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent implements OnInit {
  @ViewChild('video', { static: true }) videoElement!: ElementRef<HTMLVideoElement>;
  
  statusAcesso = 'aguardando';
  statusTexto = 'Catraca Pronta';
  usuarioDetectado = '-';
  horarioAcesso = '-';

  ngOnInit() {
    this.iniciarWebcam();
  }

  iniciarWebcam() {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        this.videoElement.nativeElement.srcObject = stream;
      })
      .catch((err) => {
        console.error("Erro ao acessar a webcam: ", err);
      });
  }

  simularEventoBorda(autorizado: boolean) {
    this.statusAcesso = 'processando';
    this.statusTexto = 'Processando IA (Python)...';

    setTimeout(() => {
      this.horarioAcesso = new Date().toLocaleTimeString();

      if (autorizado) {
        this.statusAcesso = 'autorizado';
        this.statusTexto = 'ACESSO LIBERADO';
        this.usuarioDetectado = 'João Silva (MAT001)';
      } else {
        this.statusAcesso = 'negado';
        this.statusTexto = 'ALERTA DE VIOLAÇÃO';
        this.usuarioDetectado = 'Desconhecido / Sem Permissão';
      }
    }, 1200);
  }
}