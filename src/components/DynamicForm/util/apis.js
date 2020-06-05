import zTool from 'zerod/components/zTool';
// import httpAjax from '@/zTool/httpAjax';

export default {
    fetchFormFields(query) {
        return zTool.httpAjax(
            'post',
            '/form-service/webapi/v1.0/form/getFormDetailByCode',
            query,
        );
    },
    fetchDynamicUri(options) {
        return zTool.httpAjax(
            options.method || 'post',
            options.url,
            options.params,
        );
    },
    // 获取部门列表
    fetchDeptUserTree(query) {
        return zTool.httpAjax(
            'post',
            '/tibmas2-webapi/api/v1.0/dept/listUserDeptTreeByPid',
            query,
        );
    },
    // 获取部门路径
    fetchUpDeptTree(query) {
        return zTool.httpAjax(
            'post',
            '/tibmas2-webapi/api/v1.0/dept/listUpWardDeptTreeById',
            query,
        );
    },
    // 获取部门 和人员列表
    getDepartmentAndUserList(options) {
        return zTool.httpAjax(
            'post',
            '/tibmas2-webapi/api/v1.0/dept/listDeptUserById',
            options,
        );
    },
    // 搜索人员列表
    getUserListByKeyWords(options) {
        return zTool.httpAjax(
            'post',
            '/tibmas2-webapi/api/v1.0/user/listUserByKeyWords',
            options,
        );
    },
    // 依据文件id  获取文件 路径
    getListUploadInfoByIds(options) {
        return zTool.httpAjax(
            'post',
            '/tibmas2-webapi/webapi/v1.0/fileUpload/listUploadInfoByIds',
            options,
        );
    },

    /**
     * 常用语
     */
    // 获取列表
    getDetailByKeys(options) {
        return zTool.httpAjax(
            'post',
            '/form-service/webapi/v1.0/preSetText/getDetailByKeyAndUserId',
            options,
        );
    },

    // 新增
    addPreSetInfo(options) {
        return zTool.httpAjax(
            'post',
            '/form-service/webapi/v1.0/preSetText/addPreSetInfo',
            options,
        );
    },
    // 删除
    deletePreSetInfo(options) {
        return zTool.httpAjax(
            'post',
            '/form-service/webapi/v1.0/preSetText/deletePreSetInfo',
            options,
        );
    },

    // 文件下载
    downloadFile(options) {
        return zTool.httpAjax(
            'get',
            '/file-upload-service/webapi/v1.0/fileUpload/download',
            options,
        );
    },
};
