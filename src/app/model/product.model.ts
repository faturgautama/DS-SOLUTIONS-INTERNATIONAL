export interface IProduct {
    id_kategori: number;
    kategori: string;
    id_jenis: string;
    jenis: string;
    id_product: string;
    product: string;
    keterangan: string;
    harga: number;
    is_active: number;
    path_foto: string;
    time_created: Date;
    user_created: string;
}