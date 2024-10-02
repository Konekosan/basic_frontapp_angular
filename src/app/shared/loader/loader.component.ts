import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../_module/Material.module';
import { LoaderService } from '../../_service/loader/loader.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [MaterialModule, CommonModule],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.css'
})
export class LoaderComponent implements OnInit{
  isLoading = true;

  constructor(private loaderService: LoaderService){}

  ngOnInit() {
    this.loaderService.loading$.subscribe((loading) => {
      this.isLoading = loading;
    });
  }
}
