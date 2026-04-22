export type Paging = {
    size: number;
    total_page: number;
    current_page: number;
}

export type Pageable<T> = {
    data: Array<T>;
    paging: Paging
}

// Maksud dari script ini adalah membuat sebuah generic type Pageable<T> yang berisi data dalam bentuk array dan paging dalam bentuk object Paging.
// Paging sendiri terdiri dari size (jumlah data per halaman), total_page (jumlah halaman secara keseluruhan), dan current_page (halaman yang sedang di akses).
// Type ini digunakan untuk mengembalikan response yang memiliki paging.