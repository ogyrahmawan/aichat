const CODE = {
    SUCCESS: {
        OK: {
            code: 'SSR001',
            status: 'success',
            text: 'success',
        },
        CREATED: {
            code: 'SSR002',
            status: 'success',
            text: 'success created',
        },
    },
    CLIENT_ERROR: {
        BAD_REQUEST: {
            code: 'CLE002',
            status: 'error',
            text: '',
        },
        GENERAL_ERRORS: {
            code: 'CLE0014',
            status: 'error',
            text: '<key>',
        },
        BAD_REQUEST_KEY: {
            code: 'CLE001',
            status: 'error',
            text: 'Missing required key: <key>	Jika ada <key> mandatory yang tidak di kirim',
        },
        BAD_REQUEST_VALUE: {
            code: 'CLE002',
            status: 'error',
            text: 'Missing required value: <value>	Jika ada <value> mandatory yang kosong',
        },
        BAD_REQUEST_TYPE: {
            code: 'CLE003',
            status: 'error',
            text: 'Value is invalid data type: <key>	Jika value yang dikirm, data type tidak cocok(E.g: Integer di kasih String)',
        },
        BAD_REQUEST_FORMAT: {
            code: 'CLE004',
            status: 'error',
            text: 'Value is invalid format: <key>	Jika format value tidak sesuai (E.g: email atau phone)',
        },
        DUPLICATE_VALUE: {
            code: 'CLE005',
            status: 'error',
            text: 'Value is duplicate: <key>	Jika unique value yang di kirim kembali',
        },
        INVALID_AUTH: {
            code: 'CLE008',
            status: 'error',
            text: 'Value is invalid: <key>	Jika value email/password, letterman, signature atau token tidak sesuai',
        },
        EXPIRED_AUTH: {
            code: 'CLE009',
            status: 'error',
            text: 'Value is expired: <key>	Jika value yang sudah expired di gunakan (E.g: Token)',
        },
        FORBIDDEN: {
            code: 'CLE010',
            status: 'error',
            text: 'Forbidden Access: <key>	Jika mencoba akses Data yang tidak di perbolehkan',
        },
        NOT_FOUND: {
            code: 'CLE011',
            status: 'error',
            text: 'Resources not found: <key>	Jika tidak meneumkan data di DB',
        },
        FORBIDDEN_METHOD: {
            code: 'CLE012',
            status: 'error',
            text: 'Method is forbidden: <method>	Jika mencoba akses Method yang tidak di perbolehkan',
        },
        OUTSIDE_OPTION: {
            code: 'CLE013',
            status: 'error',
            text: 'Value is outside option: <key>	Jika value yang di kirim tidak cocok dengan Enum Value',
        },
        UNAUTHORIZED: {
            code: 'UNA001',
            status: 'error',
        }
    },

    SERVER_ERROR: {
        INTERNAL_SERVER_ERROR: {
            code: 'ISE001',
            status: 'error',
        },
        FAILED_FIND_RESOURCE: {
            code: 'ISE001',
            status: 'error',
            text: 'Failed find resources: <key>	Terjadi kesalahan di Server saat mencoba Get Data',
        },
        FAILED_CREATE_RESOURCE: {
            code: 'ISE002',
            status: 'error',
            text: 'Failed create resources: <key>	Terjadi kesalahan di Server saat mencoba Create Data',
        },
        FAILED_UPDATE_RESOURCE: {
            code: 'ISE003',
            status: 'error',
            text: 'Failed update resources: <key>	Terjadi kesalahan di Server saat mencoba Update Data',
        },
        FAILED_DELETE_RESOURCE: {
            code: 'ISE004',
            status: 'error',
            text: 'Failed delete resources: <key>	Terjadi kesalahan di Server saat mencoba Delete Data',
        },
        VALUE_MISSMATCH: {
            code: 'ISE005',
            status: 'error',
            text: 'value tidak sesuai',
        },
    },
};

export default CODE;
