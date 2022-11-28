/**
 * Created by WebStorm.
 * User: darmawanefendi
 * Date: 2019-06-18
 * Time: 15:30
 */
// code,
// 	status,
// 	messages: msg,
// 	data,

const errorFormat = (internalCode: any, message: string, data: any) => ({
    code: internalCode.code,
    status: internalCode.status,
    message,
    data,
});

export default errorFormat;
