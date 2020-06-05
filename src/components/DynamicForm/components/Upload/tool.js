export const defaultZipSize = 1024 * 300;

export const canZip = () => {
    if (
        window.File &&
        window.Blob &&
        window.atob &&
        ArrayBuffer &&
        Uint8Array &&
        FileReader
    )
        return true;
    return false;
};

/**
 * base64转ArrayBuffer对象
 * @param base64
 * @return buffer
 */
const base64ToArrayBuffer = base64 => {
    // eslint-disable-next-line no-useless-escape
    base64 = base64.replace(/^data\:([^\;]+)\;base64,/gim, '');
    const binary = window.atob(base64);
    const len = binary.length;
    const buffer = new ArrayBuffer(len);
    const view = new Uint8Array(buffer);
    for (let i = 0; i < len; i++) {
        view[i] = binary.charCodeAt(i);
    }
    return buffer;
};

/**
 * Unicode码转字符串  ArrayBuffer对象 Unicode码转字符串
 * @param
 * @return
 */
const getStringFromCharCode = (dataView, start, length) => {
    let str = '';
    let i;
    for (i = start, length += start; i < length; i++) {
        str += String.fromCharCode(dataView.getUint8(i));
    }
    return str;
};

/**
 * 获取jpg图片的exif的角度
 * @param
 * @return
 */
const getOrientation = arrayBuffer => {
    const dataView = new DataView(arrayBuffer);
    let length = dataView.byteLength;
    let orientation;
    let exifIDCode;
    let tiffOffset;
    let firstIFDOffset;
    let littleEndian;
    let endianness;
    let app1Start;
    let ifdStart;
    let offset;
    let i;

    // Only handle JPEG image (start by 0xFFD8)
    if (dataView.getUint8(0) === 0xff && dataView.getUint8(1) === 0xd8) {
        offset = 2;
        while (offset < length) {
            if (
                dataView.getUint8(offset) === 0xff &&
                dataView.getUint8(offset + 1) === 0xe1
            ) {
                app1Start = offset;
                break;
            }
            offset++;
        }
    }

    if (app1Start) {
        exifIDCode = app1Start + 4;
        tiffOffset = app1Start + 10;
        if (getStringFromCharCode(dataView, exifIDCode, 4) === 'Exif') {
            endianness = dataView.getUint16(tiffOffset);
            littleEndian = endianness === 0x4949;
            if (littleEndian || endianness === 0x4d4d /* bigEndian */) {
                if (
                    dataView.getUint16(tiffOffset + 2, littleEndian) === 0x002a
                ) {
                    firstIFDOffset = dataView.getUint32(
                        tiffOffset + 4,
                        littleEndian,
                    );
                    if (firstIFDOffset >= 0x00000008) {
                        ifdStart = tiffOffset + firstIFDOffset;
                    }
                }
            }
        }
    }
    if (ifdStart) {
        length = dataView.getUint16(ifdStart, littleEndian);
        for (i = 0; i < length; i++) {
            // eslint-disable-next-line no-mixed-operators
            offset = ifdStart + i * 12 + 2;
            if (
                dataView.getUint16(offset, littleEndian) ===
                0x0112 /* Orientation */
            ) {
                // 8 is the offset of the current tag's value
                offset += 8;
                // Get the original orientation value
                orientation = dataView.getUint16(offset, littleEndian);
                // Override the orientation with its default value for Safari (#120)

                dataView.setUint16(offset, 1, littleEndian);
                break;
            }
        }
    }
    return orientation;
};

/**
 *  转file
 */
// function blobToFile(theBlob, fileName = '1.jpeg') {
//     theBlob.lastModifiedDate = new Date();
//     theBlob.name = fileName;
//     return theBlob;
// }

function blobToFile(theBlob, fileName = '1.jpeg') {
    return new window.File([theBlob], fileName, { type: 'image/jpeg' });
}
/**
 * 转 Bold
 */

function base64ToBlob(base64String) {
    const bytes = window.atob(base64String.split(',')[1]);
    const ia = new Uint8Array(bytes.length); //创建视图
    for (let i = 0; i < bytes.length; i++) {
        // array.push(bytes.charCodeAt(i));
        ia[i] = bytes.charCodeAt(i);
    }
    return new Blob([ia], { type: 'image/jpeg' });
}

/**
 * 图片压缩
 * @param base64
 * @return
 */

export const zip = (base64, fileName = 'img.jpeg', compressionRatio = 0.5) => {
    const img = new Image();
    img.crossOrigin = '';
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    //获取用户拍摄图片的旋转角度
    const orientation = getOrientation(base64ToArrayBuffer(base64)); //1 0°  3 180°  6 90°  8 -90°
    return new Promise((reslove, reject) => {
        img.onload = function onload() {
            const width = img.width;
            const height = img.height;
            //图片旋转到 正向
            // eslint-disable-next-line eqeqeq
            if (orientation == 3) {
                canvas.width = width;
                canvas.height = height;
                ctx.rotate(Math.PI);
                ctx.drawImage(img, -width, -height, width, height);
                // eslint-disable-next-line eqeqeq
            } else if (orientation == 6) {
                canvas.width = height;
                canvas.height = width;
                ctx.rotate(Math.PI / 2);
                ctx.drawImage(img, 0, -height, width, height);
                // eslint-disable-next-line eqeqeq
            } else if (orientation == 8) {
                canvas.width = height;
                canvas.height = width;
                ctx.rotate(-Math.PI / 2);
                ctx.drawImage(img, -width, 0, width, height);
            } else {
                //不旋转原图
                canvas.width = width;
                canvas.height = height;
                ctx.drawImage(img, 0, 0, width, height);
            }

            //第一次粗压缩
            let base64 = canvas.toDataURL('image/jpeg', compressionRatio); //0.1-表示将原图10M变成1M 10-表示将原图1M变成10M
            //100保证图片容量 0.05保证不失真
            //console.log('第一次粗压缩',base64.length/1024,'kb，压缩率',compressionRatio);
            //第二次细压缩
            while (base64.length > defaultZipSize && compressionRatio > 0.01) {
                compressionRatio -= 0.01;
                base64 = canvas.toDataURL('image/jpeg', compressionRatio); //0.1-表示将原图10M变成1M 10-表示将原图1M变成10M
                // console.log('第二次细压缩', base64.length / 1024, 'kb，压缩率', compressionRatio);
            }
            // this.setCropperDate();
            const blobData = base64ToBlob(
                canvas.toDataURL('image/jpeg', compressionRatio),
            );
            reslove(blobToFile(blobData, fileName));
        };
        img.onerror = function onerror(err) {
            reject(err);
        };
        img.src = base64;
    });
};

export function fileDownByBlob({ url, fileName }) {
    //xhr.setRequestHeader('xx', 'xxxxx') // 请求头中添加信息
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = 'arraybuffer';
        xhr.onload = function() {
            if (this.status === 200) {
                const type = xhr.getResponseHeader('Content-Type');

                const blob = new Blob([this.response], { type });
                if (typeof window.navigator.msSaveBlob !== 'undefined') {
                    /*
                     * IE workaround for "HTML7007: One or more blob URLs were revoked by closing
                     * the blob for which they were created. These URLs will no longer resolve as
                     * the data backing the URL has been freed."
                     */
                    window.navigator.msSaveBlob(blob, fileName);
                } else {
                    const URL = window.URL || window.webkitURL;
                    const objectUrl = URL.createObjectURL(blob);
                    console.log(objectUrl);
                    //"blob:http://localhost:10614/3e48b856-fca6-4e4c-b780-1c4a7066f42e"
                    if (fileName) {
                        const a = document.createElement('a');
                        // safari doesn't support this yet
                        if (typeof a.download === 'undefined') {
                            window.location = objectUrl;
                        } else {
                            a.href = objectUrl;
                            a.download = fileName;
                            document.body.appendChild(a);
                            a.click();
                            a.remove();
                        }
                    } else {
                        window.location = objectUrl;
                    }
                }
            }
            resolve();
        };
        xhr.onerror = reject;
        xhr.send();
    });
}
