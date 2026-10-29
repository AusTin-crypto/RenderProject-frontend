import { Component, inject, ChangeDetectorRef } from '@angular/core'; // Added ChangeDetectorRef
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
  standalone: true
})
export class App {
  private http = inject(HttpClient);
  private cdr = inject(ChangeDetectorRef); // Inject change detection controller
  apiResponse: string = '';

  sayHello(userName: string) {
    // Replace with your actual live Render backend API URL
    const apiUrl = `https://render-middleware-project.onrender.com/api/hello?name=${userName}`;
    
    this.http.get<{ message: string }>(apiUrl).subscribe({
      next: (response) => {
        this.apiResponse = response.message;
        this.cdr.detectChanges(); // FORCE the browser to display the text immediately!
      },
      error: (err) => {
        this.apiResponse = 'Error connecting to the backend API!';
        this.cdr.detectChanges(); // Force update on error too
        console.error(err);
      }
    });
  }
}
