import {Component} from '@angular/core';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-not-found',
  imports: [
    RouterLink
  ],
  template: `
    <main class="d-flex align-items-center min-vh-100 py-5">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-8 col-lg-6 text-center">
            <div class="display-1 fw-bold text-primary lh-1 mb-3">404</div>
            <h1 class="h3 mb-3">¡Vaya! Página no encontrada.</h1>
            <p class="text-secondary mb-4">
              No hemos podido encontrar la página que buscabas. Mientras tanto, puedes volver al panel de control o
              intentar buscar lo que necesitas.
            </p>
            <a routerLink="/"
               class="btn btn-outline-secondary">
              <i class="bi bi-arrow-left me-1"
                 aria-hidden="true"></i>
              Volver
            </a>
          </div>
        </div>
      </div>
    </main>
  `
})
export class NotFoundComponent {
}
