import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  api = 'http://localhost:3000';

  pegawai: any[] = [];

  form: any = {
    kduser: '',
    username: '',
    password: '',
    nama: '',
    hakakses: '',
    kdklinik: '',
    kdcabang: '',
  };

  isEdit = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getPegawai();
  }

  getPegawai() {
    this.http
      .get<any[]>(`${this.api}/pegawai`)
      .subscribe((res) => (this.pegawai = res));
  }

  save() {
    if (this.isEdit) {
      this.http
        .put(`${this.api}/users/${this.form.kduser}`, this.form)
        .subscribe(() => {
          alert('Berhasil update');
          this.resetForm();
          this.getPegawai();
        });
    } else {
      this.http.post(`${this.api}/users`, this.form).subscribe(() => {
        alert('Berhasil simpan');
        this.resetForm();
        this.getPegawai();
      });
    }
  }

  edit(data: any) {
    this.form = { ...data };
    this.isEdit = true;
  }

  hapus(kduser: string) {
    if (confirm('Yakin hapus data?')) {
      this.http.delete(`${this.api}/users/${kduser}`).subscribe(() => {
        alert('Berhasil hapus');
        this.getPegawai();
      });
    }
  }

  resetForm() {
    this.form = {
      kduser: '',
      username: '',
      password: '',
      nama: '',
      hakakses: '',
      kdklinik: '',
      kdcabang: '',
    };
    this.isEdit = false;
  }
}
