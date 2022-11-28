export const invalidBody = (key: string) => `${key} tidak valid`;
export const incompleteKey = (key: string, placement: string) => `Missing required key in ${placement}: ${key}`;
export const incompleteValue = (key: string, placement: string) => `Missing required value in ${placement}: ${key}`;
export const invalidEmailOrPassword = () => 'Username atau kata sandi salah';
export const invalidType = (key: string) => `Value is invalid data type: ${key}`;
export const notFoundResource = (key: string) => `Tidak ditemukan: ${key}`;
export const errorFindResource = (key?: string) => `Failed find resource: ${key}`;
export const errorCreateResource = (key: string) => `Failed create resource: ${key}`;
export const errorUpdateResource = (key: string) => `Failed update resource: ${key}`;
export const errorDeleteResource = (key: string) => `Failed delete resource: ${key}`;
export const invalidFormat = (key: string) => `Format tidak valid: ${key}`;
export const alreadyUsed = (key: string) => `${key} telah digunakan`;
export const duplicate = (key: string) => `${key}`;
export const invalidOption = (key: string) => `Isian diluar opsi: ${key}`;
export const unauthorized = () => 'Failed to authorized';
export const expired = (key: string) => `${key} telah kadaluarsa`;
export const invalidMaxLength = (key: string, value: number) => `Length of ${key} shall not be more than ${value}`;
export const invalidMinLength = (key: string, value: number) => `Length of ${key} shall not be less than ${value}`;
export const invalidMaxValue = (key: string, value: number) => `Value of ${key} shall not be more than ${value}`;
export const invalidMinValue = (key: string, value: number) => `Value of ${key} shall not be less than ${value}`;
export const forbidden = () => 'Forbiden access';
export const generalRequestErrors = (key: string) => `${key}`;
export const underQty = (key: string) => `${key} dibawah kuantitas`;
export const invalidProcess = (message: string) => `Proses tidak valid: ${message}`;
export const somethingWentWrong = 'Terjadi kesalahan, silakan hubungi layanan aduan pelanggan kami';
export const invalidPasswordRequirement = () => 'Password paling tidak mengandung 1 uppercase, 1 lowercase, 1 number, tanpa special karakter, dan menimal 8 karakter';
