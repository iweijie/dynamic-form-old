import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import zTool from 'zerod/components/zTool';
import { Toast, Modal } from 'antd-mobile';
import { getAutoImgSize } from '../../util/index';
import {
    zip,
    canZip,
    defaultZipSize,
    downFileByBlob,
    fileDownByBlob,
    funDownload,
    download,
} from './tool';
import { popUpImage } from './popup';
// import ViewPDF from './PDF/index';
import apis from '../../util/apis';

const alert = Modal.alert;
// 图片上传

/**
 * config
 * 	{
 * 	url: string //多文件上传的接口,
 * 	urlMethod: string //多文件上传请求方式,
 * 	urlParamName: string //上传接口的参数名,
 *  uploaderResponse: object //转发value接收的字段名
 * 	userIdName: string ,// 用户id参数名
 *  autoUpload ：boolean //是否自动上传（是否出现确认上传按钮）
 *  requestMode: string  //上传接口上传模式  single(单文件) | multiple(多文件)
 *  isSourceFile ： boolean // onChange事件导出的value是否带着文件流数据，true时以上属性都无效，即不会调用上传接口，不会出现确认上传按钮
 *  fileAccept: string //上传可选的文件类型
 *  maxUploadLength ： number  //最大上传数量
 *  fileListType ： stirng  //列表展示模式  picture | picture-card
 *  maxMegabytes : number // 允许选择最大文件大小（M） 默认 10M
 * 	}
 */

const fileAcceptList = [
    { type: 'video/*', name: '视频' },
    { type: 'all', name: '文件' },
    { type: 'image/*', name: '图片' },
];

function isImg(fileSuffix = '') {
    fileSuffix = fileSuffix.toLowerCase();
    return ['png', 'jpg', 'jpeg', 'gif'].includes(fileSuffix);
}

const imgLoaded = e => {
    const firstChild = document.querySelector('._custom_placeholder')
        .children[0];
    const cHeight = parseInt(zTool.getStyle(firstChild, 'height'), 10);
    const cWidth = parseInt(zTool.getStyle(firstChild, 'width'), 10);
    const img = e.target;
    if (!img) return;
    const { width, height } = getAutoImgSize({
        cHeight,
        cWidth,
        width: img.width,
        height: img.height,
        space: 4,
    });
    const top = (cHeight - height) / 2;
    const left = (cWidth - width) / 2;
    img.style.top = `${top}px`;
    img.style.left = `${left}px`;
    img.style.width = `${width}px`;
    img.style.height = `${height}px`;
};

const handleImgLoaded = e => {
    const uploadBtn = document.querySelector('#mobile-upload-btn');
    const cHeight = parseInt(zTool.getStyle(uploadBtn, 'height'), 10);
    const cWidth = parseInt(zTool.getStyle(uploadBtn, 'width'), 10);
    const img = e.target;
    if (!img) return;
    const { width, height } = getAutoImgSize({
        cHeight,
        cWidth,
        width: img.width,
        height: img.height,
        space: 4,
    });
    const top = (cHeight - height) / 2;
    const left = (cWidth - width) / 2;
    img.style.top = `${top}px`;
    img.style.left = `${left}px`;
    img.style.width = `${width}px`;
    img.style.height = `${height}px`;
};

const getImgUrl = (values, url, urlMethod = 'post') => {
    if (!Array.isArray(values)) return Promise.resolve([]);

    const list = [];
    const promiseList = [];
    values.forEach(value => {
        const { storage } = value;
        if (storage === 'PUBLIC') return list.push(value);
        if (storage === 'PRIVATE') return promiseList.push(value);
        return undefined;
    });
    let promise = Promise.resolve([]);
    if (promiseList.length) {
        promise = zTool
            .httpAjax(urlMethod, url, {
                fileIds: promiseList.map(value => value.id),
            })
            .then(data => {
                if (!data || data.code !== 0) return [];
                return data.data || [];
            });
    }

    return promise.then(data => [...list, ...data]);
};

const viewImg = value => {
    popUpImage(value.filePath, true);
};

const Upload = ({ options, handler, form, onChange }) => {
    const { field, expressionValue } = options;
    const { getFieldProps, getFieldValue, setFieldsValue } = form;
    const {
        fieldKey,
        initialValue,
        labelShowTag,
        _required,
        label,
        _disabled,
        _config = {},
    } = field;

    getFieldProps(fieldKey, {
        initialValue: expressionValue[fieldKey] || initialValue,
    });
    const values = getFieldValue(fieldKey) || [];
    // 用于存储 file 文件
    // const [formData, changeFormData] = useState(new FormData());
    useEffect(() => {
        // console.log('_config:', _config === a);
        // console.log('_config:', initialValue === b);
        // a = _config;
        // b = initialValue;
        const {
            // autoUpload,
            getPrivateUrl = {},
            storageType = 'PUBLIC',
        } = _config;
        // 暂时只有公读 和 私读
        if (storageType === 'PUBLIC' || !initialValue || !initialValue.length)
            return;
        const { url, urlMethod } = getPrivateUrl;
        const fileIds = initialValue.map(item => item.id);
        zTool
            .httpAjax(urlMethod, url, {
                fileIds,
            })
            .then(data => {
                if (data.code !== 0) return;
                setFieldsValue({
                    [fieldKey]: data.data || [],
                });
            });
    }, [_config, fieldKey, initialValue, setFieldsValue]);
    // 记录上传的数量
    const [uploadLen, changeMaxUploadLen] = useState(0);

    const handleImgDel = useCallback(
        delItem => {
            const { getFieldValue, setFieldsValue } = form;
            const values = getFieldValue(fieldKey) || [];
            const index = values.findIndex(item => item === delItem);

            alert('确认删除当前选中项?', delItem.originalFileName, [
                { text: '取消', style: 'default' },
                {
                    text: '确认',
                    onPress: () => {
                        values.splice(index, 1);
                        setFieldsValue({
                            [fieldKey]: [...values],
                        });
                    },
                },
            ]);
        },
        [form, fieldKey],
    );

    const upload = useCallback(
        event => {
            // 暂时只做选中直接上传
            const target = event.target;
            const files = Array.prototype.slice
                .call(event.target.files || [])
                .map(file => {
                    if (file.size) return file;
                    return undefined;
                })
                .filter(Boolean);
            const { getFieldValue, setFieldsValue } = form;
            const {
                url,
                urlMethod = 'post',
                urlParamName = 'files',
                requestMode = 'single',
                fileAccept = 'all',
                // autoUpload,
                maxMegabytes = 10,
                maxUploadLength = 0,
                userIdName = 'userId',
                storageType = 'PUBLIC',
                uploaderResponse = {},
            } = _config;
            const fileAcceptIndex = fileAcceptList.findIndex(
                item => item.type === fileAccept,
            );
            const text =
                fileAcceptIndex === -1
                    ? fileAcceptList[fileAcceptIndex].name
                    : '文件';
            const {
                filePath = 'filePath',
                fileSuffix = 'fileSuffix',
                originalFileName = 'originalFileName',
            } = uploaderResponse;
            if (!files || !files.length) return Toast.fail(`请选择${text}`, 2);
            const formData = new FormData();

            if (fileAccept === 'image/*') {
                let findNotImg;
                files.forEach(file => {
                    const { type } = file;
                    if (!findNotImg && !/^image\/.+$/.test(type)) {
                        findNotImg = file;
                    }
                });
                if (findNotImg) {
                    return Toast.fail(
                        `${findNotImg.name}为非图片，请重新选择`,
                        2,
                    );
                }
            }

            if (
                maxUploadLength > 0 &&
                files.length + uploadLen > maxUploadLength
            ) {
                return Toast.fail(`选择${text}数量超过${maxUploadLength}`, 2);
            }

            for (let i = 0; i < files.length; i++) {
                if (files[i].size > maxMegabytes * 1024 * 1024) {
                    return Toast.fail(
                        `${text}${files[i].name}超过${maxMegabytes}M`,
                        2,
                    );
                }
            }
            let promiseInstance;
            Toast.loading(`${text}正在上传中...`, 0);

            // 做异步的原因是因为loading状态显示不出来 ...
            setTimeout(() => {
                // 图片做压缩处理
                if (fileAccept === 'image/*' && canZip()) {
                    // Toast.loading('图片压缩中...');
                    const imgList = [];
                    Array.prototype.slice.call(files).forEach(file => {
                        if (file.size < defaultZipSize) {
                            imgList.push(Promise.resolve(file));
                        } else {
                            imgList.push(
                                new Promise((resolve, reject) => {
                                    const fReader = new FileReader();
                                    fReader.onload = function onload(e) {
                                        resolve(zip(this.result, file.name));
                                    };
                                    fReader.onerror = function onerror(err) {
                                        reject(err);
                                    };
                                    fReader.readAsDataURL(file);
                                }),
                            );
                        }
                    });
                    promiseInstance = Promise.all(imgList)
                        .then(data => {
                            // Toast.hide();
                            data.forEach(d => {
                                formData.append(urlParamName, d);
                            });
                            return formData;
                        })
                        .catch(err => {
                            Toast.fail('上传失败！');
                            throw err;
                        });
                } else {
                    Array.prototype.slice.call(files).forEach(file => {
                        formData.append(urlParamName, file);
                    });
                    promiseInstance = Promise.resolve(formData);
                }

                // eslint-disable-next-line prefer-const

                return promiseInstance.then(formData => {
                    zTool
                        .httpAjax(
                            urlMethod,
                            `${url}?${userIdName}=&storage=${storageType}`,
                            formData,
                        )
                        .then(re => {
                            if (re.code !== 0)
                                return Toast.fail(
                                    re.msg || re.message || '上传失败！',
                                    2,
                                );
                            Toast.success('上传成功！', 2);
                            const values = getFieldValue(fieldKey) || [];
                            const ulploadData =
                                requestMode === 'single' ? [re.data] : re.data;
                            let uploadValue = ulploadData.map(item => ({
                                ...item,
                                filePath: item[filePath],
                                fileSuffix: item[fileSuffix],
                                originalFileName: item[originalFileName],
                            }));

                            changeMaxUploadLen(uploadLen + ulploadData.length);
                            uploadValue = [...values, ...uploadValue];
                            setFieldsValue({
                                [fieldKey]: uploadValue,
                            });
                            onChange && onChange(uploadValue);
                            return uploadValue;
                        })
                        .catch(err => {
                            console.log('err:', err);
                            Toast.fail(
                                err.msg || err.message || '上传失败！',
                                2,
                            );
                        })
                        .finally(() => {
                            target.value = null;
                        });
                });
            }, 150);
            return undefined;
        },
        [_config, fieldKey, form, onChange, uploadLen],
    );

    const { fileAccept = 'image/*' } = _config;
    return (
        <div key={fieldKey} className="dynamic-form-upload-wrap">
            <div className="item-title">
                <div className="item-title-upload">
                    {_required ? <span style={{ color: 'red' }}>*</span> : null}
                    {labelShowTag ? (
                        <span
                            className={
                                labelShowTag === 2 ? 'important-title' : ''
                            }
                        >
                            {label}
                        </span>
                    ) : null}
                </div>
                <ul key={fieldKey} className={'item-upload-wrap'}>
                    {Array.isArray(values) &&
                        values.map(item =>
                            fileAccept === 'image/*' ? (
                                <li
                                    key={item.id}
                                    onClick={() => viewImg(item)}
                                    className={'upload-item'}
                                >
                                    <img
                                        onLoad={handleImgLoaded}
                                        src={item.filePath}
                                        alt=""
                                    />
                                    <div
                                        onClick={e => {
                                            e.stopPropagation();
                                            !_disabled && handleImgDel(item);
                                        }}
                                        className="upload-item-del"
                                    >
                                        <span></span>
                                    </div>
                                </li>
                            ) : (
                                <li
                                    key={item.id}
                                    onClick={() =>
                                        !_disabled ? handleImgDel(item) : null
                                    }
                                    className={'upload-item-file'}
                                >
                                    {item.originalFileName}
                                    <div className="upload-item-del">
                                        <span></span>
                                    </div>
                                </li>
                            ),
                        )}
                    <li
                        id="mobile-upload-btn"
                        className="upload-item upload-btn"
                    >
                        <input
                            onChange={event =>
                                _disabled ? null : upload(event, values)
                            }
                            multiple={_config.requestMode === 'multiple'}
                            type="file"
                            accept={`${fileAccept === 'all' ? '' : fileAccept}`}
                        />
                    </li>
                </ul>
            </div>
        </div>
    );
};

export const UploadView = ({ values, label, field, options }) => {
    const { labelShowTag } = options;
    const { fieldKey, _config } = field;
    const { fileAccept = 'image/*' } = _config;

    const [data, setData] = useState([]);
    const [visible, setVisible] = useState(false);
    const [id, setId] = useState(null);

    const toggleVisible = useCallback(() => {
        setVisible(!visible);
    }, [visible]);

    useEffect(() => {
        const {
            // autoUpload,
            getPrivateUrl = {},
        } = _config;

        const { url, urlMethod } = getPrivateUrl;
        getImgUrl(values, url, urlMethod).then(setData);
    }, [_config, fieldKey, values]);
    const view = useCallback(value => {
        const { fileSuffix, originalFileName, id } = value;
        console.log(value);

        if (isImg(fileSuffix)) {
            popUpImage(value.filePath, true);
        } else {
            Toast.loading('正在下载中...', 0);
            const url = `/file-upload-service/webapi/v1.0/fileUpload/download?id=${id}`;
            const fileName = originalFileName;

            fileDownByBlob({ url, fileName })
                .then(() => {
                    Toast.hide();
                })
                .catch(err => {
                    Toast.fail(err.error || err.message || err.msg || err, 2);
                });
        }
    }, []);

    return (
        <div key={fieldKey} className="dynamic-form-upload-wrap">
            <div className="item-title">
                <div className="item-title-upload">
                    {labelShowTag ? (
                        <span
                            className={
                                labelShowTag === 2 ? 'important-title' : ''
                            }
                        >
                            {label}
                        </span>
                    ) : null}
                </div>
                {data && data.length ? (
                    <ul
                        key={fieldKey}
                        className={'item-upload-wrap _custom_placeholder '}
                    >
                        {data.map(
                            item =>
                                fileAccept === 'image/*' ? (
                                    <li
                                        key={item.id}
                                        className={'upload-item'}
                                        onClick={() => view(item)}
                                    >
                                        <img
                                            onLoad={imgLoaded}
                                            src={item.filePath}
                                            alt=""
                                        />
                                    </li>
                                ) : (
                                    <li
                                        onClick={() => view(item)}
                                        key={item.id}
                                        className={'upload-item-file'}
                                    >
                                        {/* <a href={`/file-upload-service/webapi/v1.0/fileUpload/download?id=${item.id}`}>{item.originalFileName}</a> */}
                                        {item.originalFileName}
                                    </li>
                                ),
                            '',
                        )}
                    </ul>
                ) : null}
            </div>
            {/* <ViewPDF visible={visible} onCancel={toggleVisible} id={id} /> */}
        </div>
    );
};

Upload.propTypes = {
    options: PropTypes.object,
    handler: PropTypes.object,
    form: PropTypes.object,
    onChange: PropTypes.func,
};

UploadView.propTypes = {
    values: PropTypes.array,
    label: PropTypes.string,
    field: PropTypes.object,
    options: PropTypes.object,
};
// Upload.defaultProps = defaultProps;
export default Upload;
